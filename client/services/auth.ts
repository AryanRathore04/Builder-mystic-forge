import { account, AppwriteHelper, COLLECTIONS } from "../lib/appwrite";
import { ID } from "appwrite";
import { User } from "../types/platform";

export interface AuthUser {
  $id: string;
  email: string;
  name: string;
  emailVerification: boolean;
  prefs: any;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: "customer" | "vendor";
  referralCode?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  /**
   * Sign up a new user
   */
  static async signup(userData: SignupData): Promise<AuthUser> {
    try {
      // Create Appwrite account
      const user = await account.create(
        ID.unique(),
        userData.email,
        userData.password,
        userData.name,
      );

      // Create user document in database
      const userDoc: Omit<User, "id"> = {
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        role: userData.role || "customer",
        profileImage: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        cityId: "",
        loyaltyPoints: 0,
        totalBookings: 0,
        isFirstTimeUser: true,
        referralCode: this.generateReferralCode(userData.name, user.$id),
        referredBy: "",
        membershipStatus: "none",
      };

      await AppwriteHelper.createDocument(COLLECTIONS.USERS, userDoc, user.$id);

      // Process referral if provided
      if (userData.referralCode) {
        await this.processReferralSignup(
          userData.referralCode,
          user.$id,
          userData.email,
        );
      }

      return user;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }

  /**
   * Sign in user
   */
  static async signin(loginData: LoginData): Promise<any> {
    try {
      const session = await account.createEmailSession(
        loginData.email,
        loginData.password,
      );
      return session;
    } catch (error) {
      console.error("Error during signin:", error);
      throw error;
    }
  }

  /**
   * Sign out user
   */
  static async signout(): Promise<void> {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Error during signout:", error);
      throw error;
    }
  }

  /**
   * Get current user
   */
  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get current user session
   */
  static async getCurrentSession(): Promise<any> {
    try {
      const session = await account.getSession("current");
      return session;
    } catch (error) {
      return null;
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(name: string): Promise<AuthUser> {
    try {
      return await account.updateName(name);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }

  /**
   * Update user email
   */
  static async updateEmail(email: string, password: string): Promise<AuthUser> {
    try {
      return await account.updateEmail(email, password);
    } catch (error) {
      console.error("Error updating email:", error);
      throw error;
    }
  }

  /**
   * Update user password
   */
  static async updatePassword(
    newPassword: string,
    oldPassword: string,
  ): Promise<AuthUser> {
    try {
      return await account.updatePassword(newPassword, oldPassword);
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  }

  /**
   * Send password recovery email
   */
  static async forgotPassword(email: string): Promise<void> {
    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`,
      );
    } catch (error) {
      console.error("Error sending recovery email:", error);
      throw error;
    }
  }

  /**
   * Complete password recovery
   */
  static async resetPassword(
    userId: string,
    secret: string,
    newPassword: string,
  ): Promise<void> {
    try {
      await account.updateRecovery(userId, secret, newPassword, newPassword);
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }

  /**
   * Send email verification
   */
  static async sendEmailVerification(): Promise<void> {
    try {
      await account.createVerification(
        `${window.location.origin}/verify-email`,
      );
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  }

  /**
   * Confirm email verification
   */
  static async verifyEmail(userId: string, secret: string): Promise<void> {
    try {
      await account.updateVerification(userId, secret);
    } catch (error) {
      console.error("Error verifying email:", error);
      throw error;
    }
  }

  /**
   * Create OAuth session (Google)
   */
  static async signInWithGoogle(): Promise<void> {
    try {
      account.createOAuth2Session(
        "google",
        `${window.location.origin}/auth/success`,
        `${window.location.origin}/auth/failure`,
      );
    } catch (error) {
      console.error("Error with Google sign-in:", error);
      throw error;
    }
  }

  /**
   * Create OAuth session (Facebook)
   */
  static async signInWithFacebook(): Promise<void> {
    try {
      account.createOAuth2Session(
        "facebook",
        `${window.location.origin}/auth/success`,
        `${window.location.origin}/auth/failure`,
      );
    } catch (error) {
      console.error("Error with Facebook sign-in:", error);
      throw error;
    }
  }

  /**
   * Get user document from database
   */
  static async getUserData(userId: string): Promise<User | null> {
    try {
      const userDoc = await AppwriteHelper.getDocument(
        COLLECTIONS.USERS,
        userId,
      );
      return {
        id: userDoc.$id,
        ...userDoc,
        createdAt: AppwriteHelper.parseDate(userDoc.createdAt),
        updatedAt: AppwriteHelper.parseDate(userDoc.updatedAt),
        membershipExpiry: userDoc.membershipExpiry
          ? AppwriteHelper.parseDate(userDoc.membershipExpiry)
          : undefined,
      } as User;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  }

  /**
   * Update user document in database
   */
  static async updateUserData(
    userId: string,
    userData: Partial<User>,
  ): Promise<void> {
    try {
      const updateData = {
        ...userData,
        updatedAt: AppwriteHelper.formatDate(new Date()),
      };

      // Remove undefined values and convert dates
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] === undefined) {
          delete updateData[key];
        } else if (updateData[key] instanceof Date) {
          updateData[key] = AppwriteHelper.formatDate(updateData[key]);
        }
      });

      await AppwriteHelper.updateDocument(
        COLLECTIONS.USERS,
        userId,
        updateData,
      );
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  }

  /**
   * Generate referral code
   */
  private static generateReferralCode(
    userName: string,
    userId: string,
  ): string {
    const cleanName = userName.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const namePrefix = cleanName.substring(0, 3) || "REF";
    const userSuffix = userId.substring(0, 4).toUpperCase();
    const randomSuffix = Math.random()
      .toString(36)
      .substring(2, 5)
      .toUpperCase();

    return `${namePrefix}${userSuffix}${randomSuffix}`;
  }

  /**
   * Process referral signup
   */
  private static async processReferralSignup(
    referralCode: string,
    newUserId: string,
    newUserEmail: string,
  ): Promise<void> {
    try {
      // Find referrer by referral code
      const referrerResult = await AppwriteHelper.listDocuments(
        COLLECTIONS.USERS,
        [`referralCode=${referralCode.toUpperCase()}`],
      );

      if (referrerResult.documents.length === 0) {
        console.log("Invalid referral code:", referralCode);
        return;
      }

      const referrer = referrerResult.documents[0];

      // Find existing referral record
      const referralResult = await AppwriteHelper.listDocuments(
        COLLECTIONS.REFERRALS,
        [
          `referrerId=${referrer.$id}`,
          `referredEmail=${newUserEmail.toLowerCase()}`,
          `status=invited`,
        ],
      );

      if (referralResult.documents.length === 0) {
        console.log("No referral record found for:", newUserEmail);
        return;
      }

      const referralDoc = referralResult.documents[0];

      // Update referral record
      await AppwriteHelper.updateDocument(
        COLLECTIONS.REFERRALS,
        referralDoc.$id,
        {
          referredUserId: newUserId,
          status: "signed_up",
          signedUpAt: AppwriteHelper.formatDate(new Date()),
        },
      );

      // Update referred user
      await AppwriteHelper.updateDocument(COLLECTIONS.USERS, newUserId, {
        referredBy: referrer.$id,
      });

      console.log(`Referral signup processed for ${newUserEmail}`);
    } catch (error) {
      console.error("Error processing referral signup:", error);
    }
  }

  /**
   * Check if user is admin
   */
  static async isAdmin(userId: string): Promise<boolean> {
    try {
      const adminResult = await AppwriteHelper.listDocuments(
        COLLECTIONS.ADMINS,
        [`userId=${userId}`, `isActive=true`],
      );
      return adminResult.documents.length > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if user is vendor
   */
  static async isVendor(userId: string): Promise<boolean> {
    try {
      const vendorResult = await AppwriteHelper.listDocuments(
        COLLECTIONS.VENDORS,
        [`userId=${userId}`, `isActive=true`],
      );
      return vendorResult.documents.length > 0;
    } catch (error) {
      return false;
    }
  }
}
