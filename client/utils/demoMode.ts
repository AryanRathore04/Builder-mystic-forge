/**
 * Utility functions for handling demo mode when backend services aren't configured
 */

export function isDemoMode(): boolean {
  return (
    !import.meta.env.VITE_APPWRITE_PROJECT_ID ||
    import.meta.env.VITE_APPWRITE_PROJECT_ID === "your-project-id" ||
    import.meta.env.VITE_APPWRITE_PROJECT_ID === "demo-project-id"
  );
}

export function handleDemoModeError(error: any): boolean {
  // Check if this is a "Failed to fetch" error from Appwrite
  if (
    error.message?.includes("Failed to fetch") ||
    error.message?.includes("Network request failed") ||
    error.name === "TypeError"
  ) {
    console.warn(
      "Backend service unavailable, running in demo mode:",
      error.message,
    );
    return true;
  }
  return false;
}

export function getDemoVendorProfile() {
  return {
    id: "demo-vendor",
    uid: "demo-user",
    businessName: "Demo Wellness Spa",
    businessType: "Spa & Wellness",
    businessAddress: "123 Demo Street, Demo City",
    city: "Mumbai",
    phone: "+91 9876543210",
    email: "demo@vendor.com",
    description: "A premium wellness spa offering relaxing treatments",
    images: ["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400"],
    amenities: ["WiFi", "Parking", "AC", "Sanitized"],
    rating: 4.8,
    totalReviews: 150,
    isVerified: true,
    joinedDate: new Date(),
    subscription: "premium",
  };
}

export function getDemoServices() {
  return [
    {
      id: "demo-service-1",
      vendorId: "demo-vendor",
      name: "Relaxing Full Body Massage",
      description: "60-minute full body massage with essential oils",
      category: "massage",
      duration: 60,
      price: 2500,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "demo-service-2",
      vendorId: "demo-vendor",
      name: "Deep Cleansing Facial",
      description: "90-minute facial treatment for glowing skin",
      category: "facial",
      duration: 90,
      price: 3500,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "demo-service-3",
      vendorId: "demo-vendor",
      name: "Aromatherapy Session",
      description: "45-minute aromatherapy relaxation session",
      category: "aromatherapy",
      duration: 45,
      price: 2000,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
}

export function getDemoBookings() {
  return [
    {
      id: "demo-booking-1",
      vendorId: "demo-vendor",
      serviceName: "Relaxing Full Body Massage",
      customerName: "Sarah Johnson",
      customerPhone: "+91 9876543210",
      customerEmail: "sarah@demo.com",
      bookingDate: new Date(),
      bookingTime: "10:00 AM",
      status: "confirmed",
      price: 2500,
      duration: 60,
    },
    {
      id: "demo-booking-2",
      vendorId: "demo-vendor",
      serviceName: "Deep Cleansing Facial",
      customerName: "Priya Singh",
      customerPhone: "+91 9876543211",
      customerEmail: "priya@demo.com",
      bookingDate: new Date(Date.now() + 86400000), // Tomorrow
      bookingTime: "2:00 PM",
      status: "pending",
      price: 3500,
      duration: 90,
    },
    {
      id: "demo-booking-3",
      vendorId: "demo-vendor",
      serviceName: "Aromatherapy Session",
      customerName: "Raj Patel",
      customerPhone: "+91 9876543212",
      customerEmail: "raj@demo.com",
      bookingDate: new Date(Date.now() - 86400000), // Yesterday
      bookingTime: "4:00 PM",
      status: "completed",
      price: 2000,
      duration: 45,
    },
  ];
}

export function getDemoAnalytics() {
  return {
    totalBookings: 145,
    pendingBookings: 8,
    completedBookings: 125,
    cancelledBookings: 12,
    totalRevenue: 325000,
    averageRating: 4.8,
    totalReviews: 150,
    monthlyRevenue: 45000,
    weeklyBookings: 15,
  };
}
