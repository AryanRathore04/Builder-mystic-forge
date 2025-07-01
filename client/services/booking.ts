import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Booking, Review } from "./vendor";

export interface BookingData {
  customerId: string;
  vendorId: string;
  serviceId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  bookingDate: Date;
  bookingTime: string;
  notes?: string;
}

class BookingService {
  // Create new booking
  async createBooking(bookingData: BookingData): Promise<string> {
    try {
      // Get service details
      const serviceDoc = await getDoc(
        doc(db, "services", bookingData.serviceId),
      );
      if (!serviceDoc.exists()) {
        throw new Error("Service not found");
      }

      const service = serviceDoc.data();

      // Create booking
      const booking: Omit<Booking, "id"> = {
        ...bookingData,
        serviceName: service.name,
        servicePrice: service.price,
        serviceDuration: service.duration,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "bookings"), booking);
      return docRef.id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Get customer bookings
  async getCustomerBookings(customerId: string): Promise<Booking[]> {
    try {
      const bookingsQuery = query(
        collection(db, "bookings"),
        where("customerId", "==", customerId),
        orderBy("bookingDate", "desc"),
      );

      const snapshot = await getDocs(bookingsQuery);
      return snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Booking,
      );
    } catch (error) {
      console.error("Error getting customer bookings:", error);
      return [];
    }
  }

  // Cancel booking
  async cancelBooking(bookingId: string): Promise<void> {
    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: "cancelled",
        updatedAt: new Date(),
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Add review
  async addReview(reviewData: {
    customerId: string;
    vendorId: string;
    bookingId: string;
    customerName: string;
    rating: number;
    comment: string;
  }): Promise<string> {
    try {
      const review: Omit<Review, "id"> = {
        ...reviewData,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "reviews"), review);

      // Update vendor's average rating
      await this.updateVendorRating(reviewData.vendorId);

      return docRef.id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Update vendor's average rating
  private async updateVendorRating(vendorId: string): Promise<void> {
    try {
      const reviewsQuery = query(
        collection(db, "reviews"),
        where("vendorId", "==", vendorId),
      );

      const snapshot = await getDocs(reviewsQuery);
      const reviews = snapshot.docs.map((doc) => doc.data());

      if (reviews.length > 0) {
        const averageRating =
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length;

        await updateDoc(doc(db, "vendors", vendorId), {
          rating: Math.round(averageRating * 10) / 10,
          totalReviews: reviews.length,
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error("Error updating vendor rating:", error);
    }
  }

  // Get available time slots
  async getAvailableTimeSlots(vendorId: string, date: Date): Promise<string[]> {
    try {
      // Get vendor's opening hours
      const vendorDoc = await getDoc(doc(db, "vendors", vendorId));
      if (!vendorDoc.exists()) {
        throw new Error("Vendor not found");
      }

      const vendor = vendorDoc.data();
      const dayOfWeek = date.toLocaleDateString("en-US", {
        weekday: "lowercase",
      });
      const openingHours = vendor.openingHours?.[dayOfWeek];

      if (!openingHours || openingHours.closed) {
        return [];
      }

      // Get existing bookings for the date
      const bookingsQuery = query(
        collection(db, "bookings"),
        where("vendorId", "==", vendorId),
        where("bookingDate", "==", Timestamp.fromDate(date)),
        where("status", "in", ["pending", "confirmed"]),
      );

      const snapshot = await getDocs(bookingsQuery);
      const bookedTimes = snapshot.docs.map((doc) => doc.data().bookingTime);

      // Generate available time slots
      const timeSlots = this.generateTimeSlots(
        openingHours.open,
        openingHours.close,
      );
      return timeSlots.filter((slot) => !bookedTimes.includes(slot));
    } catch (error) {
      console.error("Error getting available time slots:", error);
      return [];
    }
  }

  // Generate time slots
  private generateTimeSlots(openTime: string, closeTime: string): string[] {
    const slots: string[] = [];
    const start = new Date(`1970-01-01T${openTime}:00`);
    const end = new Date(`1970-01-01T${closeTime}:00`);

    const current = new Date(start);

    while (current < end) {
      slots.push(current.toTimeString().slice(0, 5));
      current.setMinutes(current.getMinutes() + 30); // 30-minute slots
    }

    return slots;
  }

  // Process payment (placeholder for payment integration)
  async processPayment(
    bookingId: string,
    paymentData: {
      amount: number;
      paymentMethod: string;
      cardDetails?: any;
    },
  ): Promise<{ success: boolean; transactionId?: string }> {
    try {
      // This is a placeholder for payment processing
      // You would integrate with Razorpay, Stripe, or other payment gateways

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update booking status to confirmed
      await updateDoc(doc(db, "bookings", bookingId), {
        status: "confirmed",
        paymentStatus: "paid",
        transactionId: `txn_${Date.now()}`,
        updatedAt: new Date(),
      });

      return {
        success: true,
        transactionId: `txn_${Date.now()}`,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const bookingService = new BookingService();
