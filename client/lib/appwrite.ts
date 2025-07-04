import { Client, Account, Databases, Storage, Query, ID } from "appwrite";

// Appwrite configuration
const client = new Client();

client
  .setEndpoint(
    import.meta.env.VITE_APPWRITE_URL || "https://cloud.appwrite.io/v1",
  )
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || "your-project-id");

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID =
  import.meta.env.VITE_APPWRITE_DATABASE_ID || "beautybook-db";

// Collection IDs
export const COLLECTIONS = {
  USERS: "users",
  VENDORS: "vendors",
  BOOKINGS: "bookings",
  TRANSACTIONS: "transactions",
  LOYALTY_TRANSACTIONS: "loyaltyTransactions",
  SUBSCRIPTIONS: "subscriptions",
  PREMIUM_LISTINGS: "premiumListings",
  PROMO_CODES: "promoCodes",
  REFERRALS: "referrals",
  FLASH_DEALS: "flashDeals",
  REVIEWS: "reviews",
  VENDOR_ONBOARDING: "vendorOnboarding",
  DISPUTES: "disputes",
  AUDIT_LOGS: "auditLogs",
  FRANCHISE_INQUIRIES: "franchiseInquiries",
  CITIES: "cities",
  PROMO_USAGE: "promoUsage",
  FLASH_DEAL_BOOKINGS: "flashDealBookings",
  ADMINS: "admins",
};

// Storage Bucket IDs
export const BUCKETS = {
  VENDORS: "vendor-images",
  USERS: "user-images",
  DOCUMENTS: "kyc-documents",
};

// Helper functions for Appwrite operations
export class AppwriteHelper {
  /**
   * Create a new document
   */
  static async createDocument(
    collectionId: string,
    data: any,
    documentId?: string,
  ): Promise<any> {
    try {
      const doc = await databases.createDocument(
        DATABASE_ID,
        collectionId,
        documentId || ID.unique(),
        {
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      );
      return doc;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  }

  /**
   * Get document by ID
   */
  static async getDocument(
    collectionId: string,
    documentId: string,
  ): Promise<any> {
    try {
      const doc = await databases.getDocument(
        DATABASE_ID,
        collectionId,
        documentId,
      );
      return doc;
    } catch (error) {
      console.error("Error getting document:", error);
      throw error;
    }
  }

  /**
   * Update document
   */
  static async updateDocument(
    collectionId: string,
    documentId: string,
    data: any,
  ): Promise<any> {
    try {
      const doc = await databases.updateDocument(
        DATABASE_ID,
        collectionId,
        documentId,
        {
          ...data,
          updatedAt: new Date().toISOString(),
        },
      );
      return doc;
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  }

  /**
   * Delete document
   */
  static async deleteDocument(
    collectionId: string,
    documentId: string,
  ): Promise<void> {
    try {
      await databases.deleteDocument(DATABASE_ID, collectionId, documentId);
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  }

  /**
   * List documents with queries
   */
  static async listDocuments(
    collectionId: string,
    queries: string[] = [],
  ): Promise<any> {
    try {
      const result = await databases.listDocuments(
        DATABASE_ID,
        collectionId,
        queries,
      );
      return result;
    } catch (error) {
      console.error("Error listing documents:", error);
      throw error;
    }
  }

  /**
   * Upload file to storage
   */
  static async uploadFile(
    bucketId: string,
    file: File,
    fileId?: string,
  ): Promise<any> {
    try {
      const uploadedFile = await storage.createFile(
        bucketId,
        fileId || ID.unique(),
        file,
      );
      return uploadedFile;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  /**
   * Get file URL
   */
  static getFileUrl(bucketId: string, fileId: string): string {
    return storage.getFileView(bucketId, fileId).toString();
  }

  /**
   * Delete file
   */
  static async deleteFile(bucketId: string, fileId: string): Promise<void> {
    try {
      await storage.deleteFile(bucketId, fileId);
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  /**
   * Convert Appwrite date to JS Date
   */
  static parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  /**
   * Convert JS Date to Appwrite date string
   */
  static formatDate(date: Date): string {
    return date.toISOString();
  }
}

// Export client for direct access if needed
export { client, Query, ID };
export default client;
