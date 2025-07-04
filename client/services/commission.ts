import { AppwriteHelper, COLLECTIONS, Query } from "../lib/appwrite";
import { Transaction, Booking, Vendor } from "../types/platform";

export class CommissionService {
  private static readonly COMMISSION_RATE = 0.22; // 22%

  /**
   * Calculate and process commission for a booking
   */
  static async processBookingCommission(
    bookingId: string,
    bookingData: Partial<Booking>,
  ): Promise<void> {
    try {
      const commissionAmount = bookingData.finalPrice! * this.COMMISSION_RATE;
      const vendorEarnings = bookingData.finalPrice! - commissionAmount;

      // Update booking with commission details
      await AppwriteHelper.updateDocument(COLLECTIONS.BOOKINGS, bookingId, {
        commissionAmount,
        vendorEarnings,
      });

      // Create commission transaction
      await this.createCommissionTransaction({
        bookingId,
        vendorId: bookingData.vendorId!,
        customerId: bookingData.customerId!,
        amount: bookingData.finalPrice!,
        commissionAmount,
        description: `Commission for booking #${bookingId}`,
      });

      // Update vendor earnings
      await this.updateVendorEarnings(
        bookingData.vendorId!,
        vendorEarnings,
        commissionAmount,
      );

      console.log(
        `Commission processed for booking ${bookingId}: ₹${commissionAmount}`,
      );
    } catch (error) {
      console.error("Error processing commission:", error);
      throw error;
    }
  }

  /**
   * Create a commission transaction record
   */
  private static async createCommissionTransaction(data: {
    bookingId: string;
    vendorId: string;
    customerId: string;
    amount: number;
    commissionAmount: number;
    description: string;
  }): Promise<string> {
    const transaction: Omit<Transaction, "id"> = {
      type: "commission",
      bookingId: data.bookingId,
      vendorId: data.vendorId,
      customerId: data.customerId,
      amount: data.amount,
      commissionAmount: data.commissionAmount,
      description: data.description,
      status: "completed",
      createdAt: new Date(),
      processedAt: new Date(),
    };

    const doc = await AppwriteHelper.createDocument(
      COLLECTIONS.TRANSACTIONS,
      transaction,
    );
    return doc.$id;
  }

  /**
   * Update vendor earnings and pending payouts
   */
  private static async updateVendorEarnings(
    vendorId: string,
    earnings: number,
    commission: number,
  ): Promise<void> {
    try {
      const vendorDoc = await AppwriteHelper.getDocument(
        COLLECTIONS.VENDORS,
        vendorId,
      );

      if (vendorDoc) {
        await AppwriteHelper.updateDocument(COLLECTIONS.VENDORS, vendorId, {
          totalEarnings: (vendorDoc.totalEarnings || 0) + earnings,
          pendingPayouts: (vendorDoc.pendingPayouts || 0) + earnings,
        });
      }
    } catch (error) {
      console.error("Error updating vendor earnings:", error);
      throw error;
    }
  }

  /**
   * Process vendor payout
   */
  static async processVendorPayout(
    vendorId: string,
    amount: number,
    paymentMethod: string = "bank_transfer",
  ): Promise<string> {
    try {
      // Create payout transaction
      const transaction: Omit<Transaction, "id"> = {
        type: "payout",
        vendorId,
        amount: -amount, // Negative amount for payout
        description: `Payout to vendor ${vendorId}`,
        status: "pending",
        paymentMethod,
        createdAt: new Date(),
      };

      const doc = await AppwriteHelper.createDocument(
        COLLECTIONS.TRANSACTIONS,
        transaction,
      );

      // Update vendor pending payouts
      const vendorDoc = await AppwriteHelper.getDocument(
        COLLECTIONS.VENDORS,
        vendorId,
      );

      if (vendorDoc) {
        await AppwriteHelper.updateDocument(COLLECTIONS.VENDORS, vendorId, {
          pendingPayouts: Math.max(0, (vendorDoc.pendingPayouts || 0) - amount),
        });
      }

      return doc.$id;
    } catch (error) {
      console.error("Error processing payout:", error);
      throw error;
    }
  }

  /**
   * Get vendor earnings summary
   */
  static async getVendorEarnings(vendorId: string) {
    try {
      const result = await AppwriteHelper.listDocuments(
        COLLECTIONS.TRANSACTIONS,
        [
          Query.equal("vendorId", vendorId),
          Query.equal("type", ["commission", "payout"]),
          Query.orderDesc("createdAt"),
        ],
      );

      const transactions = result.documents.map((doc) => ({
        id: doc.$id,
        ...doc,
        createdAt: AppwriteHelper.parseDate(doc.createdAt),
        processedAt: doc.processedAt
          ? AppwriteHelper.parseDate(doc.processedAt)
          : undefined,
      })) as Transaction[];

      const totalEarnings = transactions
        .filter((t) => t.type === "commission")
        .reduce((sum, t) => sum + (t.amount - t.commissionAmount!), 0);

      const totalPayouts = transactions
        .filter((t) => t.type === "payout")
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const pendingEarnings = totalEarnings - totalPayouts;

      return {
        totalEarnings,
        totalPayouts,
        pendingEarnings,
        transactions,
      };
    } catch (error) {
      console.error("Error getting vendor earnings:", error);
      throw error;
    }
  }

  /**
   * Get platform revenue summary
   */
  static async getPlatformRevenue(startDate?: Date, endDate?: Date) {
    try {
      const queries = [
        Query.equal("type", "commission"),
        Query.orderDesc("createdAt"),
      ];

      if (startDate) {
        queries.push(
          Query.greaterThanEqual(
            "createdAt",
            AppwriteHelper.formatDate(startDate),
          ),
        );
      }

      if (endDate) {
        queries.push(
          Query.lessThanEqual("createdAt", AppwriteHelper.formatDate(endDate)),
        );
      }

      const result = await AppwriteHelper.listDocuments(
        COLLECTIONS.TRANSACTIONS,
        queries,
      );

      const transactions = result.documents.map((doc) => ({
        id: doc.$id,
        ...doc,
        createdAt: AppwriteHelper.parseDate(doc.createdAt),
        processedAt: doc.processedAt
          ? AppwriteHelper.parseDate(doc.processedAt)
          : undefined,
      })) as Transaction[];

      const totalCommissions = transactions.reduce(
        (sum, t) => sum + (t.commissionAmount || 0),
        0,
      );

      const totalBookings = transactions.length;
      const avgCommissionPerBooking =
        totalBookings > 0 ? totalCommissions / totalBookings : 0;

      return {
        totalCommissions,
        totalBookings,
        avgCommissionPerBooking,
        transactions,
      };
    } catch (error) {
      console.error("Error getting platform revenue:", error);
      throw error;
    }
  }

  /**
   * Process refund and adjust commission
   */
  static async processRefund(
    bookingId: string,
    refundAmount: number,
    reason: string,
  ): Promise<string> {
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

      const commissionRefund = refundAmount * this.COMMISSION_RATE;
      const vendorRefund = refundAmount - commissionRefund;

      // Create refund transaction
      const transaction: Omit<Transaction, "id"> = {
        type: "refund",
        bookingId,
        vendorId: booking.vendorId,
        customerId: booking.customerId,
        amount: -refundAmount,
        commissionAmount: -commissionRefund,
        description: `Refund for booking #${bookingId}: ${reason}`,
        status: "completed",
        createdAt: new Date(),
        processedAt: new Date(),
      };

      const doc = await AppwriteHelper.createDocument(
        COLLECTIONS.TRANSACTIONS,
        transaction,
      );

      // Update vendor earnings
      if (vendorRefund > 0) {
        await this.updateVendorEarnings(
          booking.vendorId,
          -vendorRefund,
          commissionRefund,
        );
      }

      // Update booking status
      await AppwriteHelper.updateDocument(COLLECTIONS.BOOKINGS, bookingId, {
        status: "cancelled",
        paymentStatus: "refunded",
        cancellationReason: reason,
      });

      return doc.$id;
    } catch (error) {
      console.error("Error processing refund:", error);
      throw error;
    }
  }
}
