import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService, AuthUser, SignupData, LoginData } from "../services/auth";
import { User } from "../types/platform";

interface AuthContextType {
  user: AuthUser | null;
  userProfile: User | null;
  loading: boolean;
  signIn: (loginData: LoginData) => Promise<any>;
  signUp: (userData: SignupData) => Promise<AuthUser>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isAdmin: boolean;
  isVendor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Create a fake user to bypass authentication
  const fakeUser: AuthUser = {
    $id: "demo-user-123",
    email: "demo@vendor.com",
    name: "Demo User",
    emailVerification: true,
  };

  const fakeUserProfile: User = {
    uid: "demo-user-123",
    email: "demo@vendor.com",
    name: "Demo User",
    userType: "vendor", // Set as vendor to access vendor dashboard
    phone: "+91 9876543210",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [user, setUser] = useState<AuthUser | null>(fakeUser);
  const [userProfile, setUserProfile] = useState<User | null>(fakeUserProfile);
  const [loading, setLoading] = useState(false); // Set to false immediately
  const [isAdmin, setIsAdmin] = useState(true); // Allow admin access
  const [isVendor, setIsVendor] = useState(true); // Allow vendor access

  useEffect(() => {
    // Skip authentication checks completely
    console.log("Authentication bypassed - using demo user");
  }, []);

  const checkUser = async () => {
    // Skip all authentication logic
    setLoading(false);
  };

  const signIn = async (loginData: LoginData): Promise<any> => {
    try {
      const session = await AuthService.signin(loginData);
      await checkUser(); // Refresh user data
      return session;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (userData: SignupData): Promise<AuthUser> => {
    try {
      const newUser = await AuthService.signup(userData);
      await checkUser(); // Refresh user data
      return newUser;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await AuthService.signInWithGoogle();
      await checkUser(); // Refresh user data
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  const signInWithFacebook = async (): Promise<void> => {
    try {
      await AuthService.signInWithFacebook();
      await checkUser(); // Refresh user data
    } catch (error) {
      console.error("Facebook sign in error:", error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await AuthService.signout();
      setUser(null);
      setUserProfile(null);
      setIsAdmin(false);
      setIsVendor(false);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await AuthService.forgotPassword(email);
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    try {
      if (!user) throw new Error("No user logged in");

      await AuthService.updateUserData(user.$id, updates);
      setUserProfile((prev) => (prev ? { ...prev, ...updates } : null));
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    resetPassword,
    updateProfile,
    isAdmin,
    isVendor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
