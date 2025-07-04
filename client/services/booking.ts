import { AppwriteHelper, COLLECTIONS, Query } from "../lib/appwrite";
import {
  Booking,
  VendorService,
  AddOnService,
  Vendor,
} from "../types/platform";
import { CommissionService } from "./commission";
import { LoyaltyService } from "./loyalty";

export class BookingService {
  /**
   * Get real-time availability for a vendor on a specific date
   */
  static async getAvailability(
    vendorId: string,
    date: Date,
    serviceDuration: number,
  ): Promise<{
    availableSlots: string[];
    bookedSlots: string[];
    operatingHours: { start: string; end: string; isOpen: boolean };
  }> {
    try {
      // Get vendor operating hours
      const vendorDoc = await AppwriteHelper.getDocument(
        COLLECTIONS.VENDORS,
        vendorId,
      );

      if (!vendorDoc) {
        throw new Error("Vendor not found");
      }

      const vendor = {
        id: vendorDoc.$id,
        ...vendorDoc,
        createdAt: AppwriteHelper.parseDate(vendorDoc.createdAt),
        updatedAt: AppwriteHelper.parseDate(vendorDoc.updatedAt),
      } as Vendor;

      const dayOfWeek = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
      const daySchedule =
        vendor.operatingHours[dayOfWeek as keyof typeof vendor.operatingHours];

      if (!daySchedule.isOpen) {
        return {
          availableSlots: [],
          bookedSlots: [],
          operatingHours: { start: "", end: "", isOpen: false },
        };
      }

      // Get existing bookings for the date
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const bookingsResult = await AppwriteHelper.listDocuments(
        COLLECTIONS.BOOKINGS,
        [
          Query.equal("vendorId", vendorId),
          Query.greaterThanEqual("date", AppwriteHelper.formatDate(startOfDay)),
          Query.lessThanEqual("date", AppwriteHelper.formatDate(endOfDay)),
          Query.equal("status", ["pending", "confirmed", "in_progress"]),
        ],
      );

      const bookedSlots = bookingsResult.documents.map((doc) => doc.timeSlot);

      // Generate all possible slots based on operating hours
      const allSlots = this.generateTimeSlots(
        daySchedule.openTime,
        daySchedule.closeTime,
        serviceDuration,
        daySchedule.breakStart,
        daySchedule.breakEnd,
      );

      // Filter out booked slots
      const availableSlots = allSlots.filter(
        (slot) => !bookedSlots.includes(slot),
      );

      return {
        availableSlots,
        bookedSlots,
        operatingHours: {
          start: daySchedule.openTime,
          end: daySchedule.closeTime,
          isOpen: true,
        },
      };
    } catch (error) {
      console.error("Error getting availability:", error);
      throw error;
    }
  }

  /**
   * Create a comprehensive booking with pricing and commission calculation
   */
  static async createBooking(bookingData: {
    customerId: string;
    vendorId: string;
    serviceId: string;
    addOnServiceIds?: string[];
    date: Date;
    timeSlot: string;
    promoCode?: string;
    loyaltyPointsToUse?: number;
    notes?: string;
  }): Promise<string> {
    try {
      // Get service details
      const vendorDoc = await AppwriteHelper.getDocument(
        COLLECTIONS.VENDORS,
        bookingData.vendorId,
      );

      if (!vendorDoc) {
        throw new Error("Vendor not found");
      }

      const vendor = vendorDoc as Vendor;
      const service = vendor.services.find(
        (s) => s.id === bookingData.serviceId,
      );
      if (!service) {
        throw new Error("Service not found");
      }

      // Calculate pricing
      let basePrice = service.price;
      let addOnPrice = 0;
      let totalDuration = service.duration;
      const selectedAddOns: string[] = [];

      if (bookingData.addOnServiceIds?.length) {
        bookingData.addOnServiceIds.forEach((addOnId) => {
          const addOn = service.addOns.find((ao) => ao.id === addOnId);
          if (addOn) {
            addOnPrice += addOn.price;
            totalDuration += addOn.duration;
            selectedAddOns.push(addOnId);
          }
        });
      }

      const subtotal = basePrice + addOnPrice;
      let discountAmount = 0;
      let finalPrice = subtotal;

      // Apply loyalty points if provided
      let loyaltyPointsUsed = 0;
      if (bookingData.loyaltyPointsToUse) {
        const availablePoints = await LoyaltyService.getAvailablePoints(
          bookingData.customerId,
        );
        loyaltyPointsUsed = Math.min(
          bookingData.loyaltyPointsToUse,
          availablePoints,
        );
        const loyaltyDiscount =
          LoyaltyService.calculateRedemptionValue(loyaltyPointsUsed);
        discountAmount += loyaltyDiscount;
      }

      finalPrice = Math.max(0, subtotal - discountAmount);

      // Calculate commission
      const commissionAmount = finalPrice * 0.22; // 22% commission
      const vendorEarnings = finalPrice - commissionAmount;

      // Create booking
      const booking: Omit<Booking, "id"> = {
        customerId: bookingData.customerId,
        vendorId: bookingData.vendorId,
        serviceId: bookingData.serviceId,
        addOnServices: selectedAddOns,
        date: bookingData.date,
        timeSlot: bookingData.timeSlot,
        duration: totalDuration,
        basePrice,
        addOnPrice,
        totalPrice: subtotal,
        discountAmount,
        finalPrice,
        commissionAmount,
        vendorEarnings,
        status: "pending",
        paymentStatus: "pending",
        paymentMethod: "pending" as any,
        loyaltyPointsEarned: 0,
        loyaltyPointsUsed,
        promoCode: bookingData.promoCode,
        promoDiscount: 0,
        notes: bookingData.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const doc = await AppwriteHelper.createDocument(
        COLLECTIONS.BOOKINGS,
        booking,
      );
      return doc.$id;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }

  /**
   * Process booking payment and complete booking flow
   */
  static async processBookingPayment(
    bookingId: string,
    paymentMethod: string,
    paymentId: string,
  ): Promise<void> {
    try {
      const bookingDoc = await AppwriteHelper.getDocument(
        COLLECTIONS.BOOKINGS,
        bookingId,
      );

      if (!bookingDoc) {
        throw new Error("Booking not found");
      }

      const booking = {
        id: bookingDoc.$id,
        ...bookingDoc,
        date: AppwriteHelper.parseDate(bookingDoc.date),
        createdAt: AppwriteHelper.parseDate(bookingDoc.createdAt),
        updatedAt: AppwriteHelper.parseDate(bookingDoc.updatedAt),
      } as Booking;

      // Update booking payment status
      await AppwriteHelper.updateDocument(COLLECTIONS.BOOKINGS, bookingId, {
        paymentStatus: "paid",
        paymentMethod,
        status: "confirmed",
      });

      // Process commission
      await CommissionService.processBookingCommission(bookingId, booking);

      // Redeem loyalty points if used
      if (booking.loyaltyPointsUsed > 0) {
        await LoyaltyService.redeemPoints(
          booking.customerId,
          bookingId,
          booking.loyaltyPointsUsed,
        );
      }

      // Award loyalty points for the booking
      const pointsEarned = await LoyaltyService.awardPoints(
        booking.customerId,
        bookingId,
        booking.finalPrice,
      );

      // Update booking with earned points
      await AppwriteHelper.updateDocument(COLLECTIONS.BOOKINGS, bookingId, {
        loyaltyPointsEarned: pointsEarned,
      });

      console.log(`Booking ${bookingId} payment processed successfully`);
    } catch (error) {
      console.error("Error processing booking payment:", error);
      throw error;
    }
  }

  /**
   * Cancel booking with token system
   */
  static async cancelBooking(
    bookingId: string,
    reason: string,
    cancelledBy: "customer" | "vendor" | "admin",
  ): Promise<void> {
    try {
      const bookingDoc = await AppwriteHelper.getDocument(
        COLLECTIONS.BOOKINGS,
        bookingId,
      );

      if (!bookingDoc) {
        throw new Error("Booking not found");
      }

      const booking = {
        id: bookingDoc.$id,
        ...bookingDoc,
        date: AppwriteHelper.parseDate(bookingDoc.date),
        createdAt: AppwriteHelper.parseDate(bookingDoc.createdAt),
        updatedAt: AppwriteHelper.parseDate(bookingDoc.updatedAt),
      } as Booking;

      const now = new Date();
      const bookingDateTime = new Date(booking.date);
      bookingDateTime.setHours(
        parseInt(booking.timeSlot.split(":")[0]),
        parseInt(booking.timeSlot.split(":")[1]),
      );

      const hoursUntilBooking =
        (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

      let cancellationTokens = 0;

      // Apply token deduction based on cancellation timing
      if (cancelledBy === "customer") {
        if (hoursUntilBooking < 2) {
          cancellationTokens = 2; // 2 tokens for last-minute cancellation
        } else if (hoursUntilBooking < 24) {
          cancellationTokens = 1; // 1 token for same-day cancellation
        }
      }

      // Update booking status
      await AppwriteHelper.updateDocument(COLLECTIONS.BOOKINGS, bookingId, {
        status: "cancelled",
        cancellationReason: reason,
        cancellationTokens,
      });

      // Process refund if payment was made
      if (booking.paymentStatus === "paid") {
        await CommissionService.processRefund(
          bookingId,
          booking.finalPrice,
          reason,
        );
      }

      console.log(
        `Booking ${bookingId} cancelled by ${cancelledBy}. Tokens deducted: ${cancellationTokens}`,
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw error;
    }
  }

  /**
   * Get customer bookings with filters
   */
  static async getCustomerBookings(
    customerId: string,
    status?: string,
    limitCount?: number,
  ) {
    try {
      const queries = [
        Query.equal("customerId", customerId),
        Query.orderDesc("createdAt"),
      ];

      if (status) {
        queries.push(Query.equal("status", status));
      }

      if (limitCount) {
        queries.push(Query.limit(limitCount));
      }

      const result = await AppwriteHelper.listDocuments(
        COLLECTIONS.BOOKINGS,
        queries,
      );

      return result.documents.map((doc) => ({
        id: doc.$id,
        ...doc,
        date: AppwriteHelper.parseDate(doc.date),
        createdAt: AppwriteHelper.parseDate(doc.createdAt),
        updatedAt: AppwriteHelper.parseDate(doc.updatedAt),
      })) as Booking[];
    } catch (error) {
      console.error("Error getting customer bookings:", error);
      throw error;
    }
  }

  /**
   * Get vendor bookings with filters
   */
  static async getVendorBookings(
    vendorId: string,
    status?: string,
    date?: Date,
  ) {
    try {
      const queries = [
        Query.equal("vendorId", vendorId),
        Query.orderDesc("date"),
      ];

      if (status) {
        queries.push(Query.equal("status", status));
      }

      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        queries.push(
          Query.greaterThanEqual("date", AppwriteHelper.formatDate(startOfDay)),
          Query.lessThanEqual("date", AppwriteHelper.formatDate(endOfDay)),
        );
      }

      const result = await AppwriteHelper.listDocuments(
        COLLECTIONS.BOOKINGS,
        queries,
      );

      return result.documents.map((doc) => ({
        id: doc.$id,
        ...doc,
        date: AppwriteHelper.parseDate(doc.date),
        createdAt: AppwriteHelper.parseDate(doc.createdAt),
        updatedAt: AppwriteHelper.parseDate(doc.updatedAt),
      })) as Booking[];
    } catch (error) {
      console.error("Error getting vendor bookings:", error);
      throw error;
    }
  }

  /**
   * Generate time slots based on operating hours
   */
  private static generateTimeSlots(
    openTime: string,
    closeTime: string,
    serviceDuration: number,
    breakStart?: string,
    breakEnd?: string,
  ): string[] {
    const slots: string[] = [];
    const slotDuration = 30; // 30-minute slots

    const parseTime = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const formatTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
    };

    const openMinutes = parseTime(openTime);
    const closeMinutes = parseTime(closeTime);
    const breakStartMinutes = breakStart ? parseTime(breakStart) : null;
    const breakEndMinutes = breakEnd ? parseTime(breakEnd) : null;

    for (
      let currentMinutes = openMinutes;
      currentMinutes + serviceDuration <= closeMinutes;
      currentMinutes += slotDuration
    ) {
      // Skip break time
      if (
        breakStartMinutes &&
        breakEndMinutes &&
        currentMinutes >= breakStartMinutes &&
        currentMinutes < breakEndMinutes
      ) {
        continue;
      }

      slots.push(formatTime(currentMinutes));
    }

    return slots;
  }

  /**
   * Mark booking as completed
   */
  static async completeBooking(bookingId: string): Promise<void> {
    try {
      await AppwriteHelper.updateDocument(COLLECTIONS.BOOKINGS, bookingId, {
        status: "completed",
      });

      console.log(`Booking ${bookingId} marked as completed`);
    } catch (error) {
      console.error("Error completing booking:", error);
      throw error;
    }
  }

  /**
   * Mark booking as no-show
   */
  static async markNoShow(bookingId: string): Promise<void> {
    try {
      const bookingDoc = await AppwriteHelper.getDocument(
        COLLECTIONS.BOOKINGS,
        bookingId,
      );

      if (!bookingDoc) {
        throw new Error("Booking not found");
      }

      const booking = {
        id: bookingDoc.$id,
        ...bookingDoc,
        date: AppwriteHelper.parseDate(bookingDoc.date),
        createdAt: AppwriteHelper.parseDate(bookingDoc.createdAt),
        updatedAt: AppwriteHelper.parseDate(bookingDoc.updatedAt),
      } as Booking;

      await AppwriteHelper.updateDocument(COLLECTIONS.BOOKINGS, bookingId, {
        status: "no_show",
        cancellationTokens: 3, // 3 tokens for no-show
      });

      // Process commission even for no-show (vendor policy)
      await CommissionService.processBookingCommission(bookingId, booking);

      console.log(`Booking ${bookingId} marked as no-show`);
    } catch (error) {
      console.error("Error marking no-show:", error);
      throw error;
    }
  }
}

// Legacy compatibility export
export const bookingService = {
  createBooking: BookingService.createBooking,
  getCustomerBookings: BookingService.getCustomerBookings,
  getVendorBookings: BookingService.getVendorBookings,
  cancelBooking: BookingService.cancelBooking,
  completeBooking: BookingService.completeBooking,
  getAvailability: BookingService.getAvailability,
};
