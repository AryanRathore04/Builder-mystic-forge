# 🚀 BeautyBook - Appwrite Setup Guide

## 📋 **Complete Setup Instructions**

### **Step 1: Create Appwrite Project**

1. **Sign up** at [Appwrite Cloud](https://cloud.appwrite.io/) or use self-hosted
2. **Create a new project**: "BeautyBook Platform"
3. **Note your Project ID** from the settings

### **Step 2: Create Database & Collections**

#### **2.1 Create Database**

- Go to **Databases** → **Create Database**
- Database ID: `beautybook-db`
- Name: `BeautyBook Database`

#### **2.2 Create Collections**

Create the following collections with these **exact IDs**:

| Collection ID         | Name                 |
| --------------------- | -------------------- |
| `users`               | Users                |
| `vendors`             | Vendors              |
| `bookings`            | Bookings             |
| `transactions`        | Transactions         |
| `loyaltyTransactions` | Loyalty Transactions |
| `subscriptions`       | Subscriptions        |
| `premiumListings`     | Premium Listings     |
| `promoCodes`          | Promo Codes          |
| `referrals`           | Referrals            |
| `flashDeals`          | Flash Deals          |
| `reviews`             | Reviews              |
| `vendorOnboarding`    | Vendor Onboarding    |
| `disputes`            | Disputes             |
| `auditLogs`           | Audit Logs           |
| `franchiseInquiries`  | Franchise Inquiries  |
| `cities`              | Cities               |
| `promoUsage`          | Promo Usage          |
| `flashDealBookings`   | Flash Deal Bookings  |
| `admins`              | Admins               |

#### **2.3 Configure Collection Permissions**

For each collection, set these permissions:

**Read Access:** `users`, `guests` (for public data like vendors, cities)
**Write Access:** `users` (authenticated users can create/update their own data)

### **Step 3: Create Storage Buckets**

Create these storage buckets:

| Bucket ID       | Name          | Max File Size |
| --------------- | ------------- | ------------- |
| `vendor-images` | Vendor Images | 5MB           |
| `user-images`   | User Images   | 2MB           |
| `kyc-documents` | KYC Documents | 10MB          |

**Permissions for all buckets:**

- **Read**: `any` (public read for images)
- **Write**: `users` (authenticated users only)

### **Step 4: Enable Authentication**

1. Go to **Auth** → **Settings**
2. Enable these providers:

   - ✅ **Email/Password**
   - ✅ **Google** (optional)
   - ✅ **Facebook** (optional)

3. **Security Settings:**
   - Session Length: 30 days
   - Password History: 5
   - Password Dictionary: Enabled

### **Step 5: Configure Environment Variables**

Create `.env` file in `client/` directory:

```env
# Appwrite Configuration
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id-here
VITE_APPWRITE_DATABASE_ID=beautybook-db

# Optional: Payment Gateway
VITE_RAZORPAY_KEY_ID=your-razorpay-key
VITE_RAZORPAY_SECRET=your-razorpay-secret

# Optional: Email Service
VITE_SENDGRID_API_KEY=your-sendgrid-key
VITE_FROM_EMAIL=noreply@yourdomain.com
```

### **Step 6: Collection Attributes Setup**

For each collection, you need to create attributes. Here are the key ones:

#### **Users Collection:**

```json
{
  "email": "string",
  "name": "string",
  "phone": "string",
  "role": "string",
  "profileImage": "string",
  "isActive": "boolean",
  "cityId": "string",
  "loyaltyPoints": "integer",
  "totalBookings": "integer",
  "isFirstTimeUser": "boolean",
  "referralCode": "string",
  "referredBy": "string",
  "membershipStatus": "string",
  "membershipExpiry": "datetime",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### **Vendors Collection:**

```json
{
  "userId": "string",
  "businessName": "string",
  "description": "string",
  "address": "string",
  "cityId": "string",
  "phone": "string",
  "email": "string",
  "images": "string[]",
  "services": "string",
  "operatingHours": "string",
  "rating": "double",
  "reviewCount": "integer",
  "isVerified": "boolean",
  "isPremium": "boolean",
  "premiumExpiry": "datetime",
  "subscriptionStatus": "string",
  "subscriptionExpiry": "datetime",
  "onboardingStatus": "string",
  "kycStatus": "string",
  "commissionRate": "double",
  "totalEarnings": "double",
  "pendingPayouts": "double",
  "isFlagged": "boolean",
  "flagReason": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

#### **Bookings Collection:**

```json
{
  "customerId": "string",
  "vendorId": "string",
  "serviceId": "string",
  "addOnServices": "string[]",
  "date": "datetime",
  "timeSlot": "string",
  "duration": "integer",
  "basePrice": "double",
  "addOnPrice": "double",
  "totalPrice": "double",
  "discountAmount": "double",
  "finalPrice": "double",
  "commissionAmount": "double",
  "vendorEarnings": "double",
  "status": "string",
  "paymentStatus": "string",
  "paymentMethod": "string",
  "loyaltyPointsEarned": "integer",
  "loyaltyPointsUsed": "integer",
  "promoCode": "string",
  "promoDiscount": "double",
  "cancellationReason": "string",
  "cancellationTokens": "integer",
  "notes": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### **Step 7: Create Database Indexes**

For better query performance, create these indexes:

#### **Users Collection:**

- `email` (unique)
- `referralCode` (unique)
- `role`
- `createdAt`

#### **Vendors Collection:**

- `userId`
- `cityId`
- `isVerified`
- `isPremium`
- `rating`
- `createdAt`

#### **Bookings Collection:**

- `customerId`
- `vendorId`
- `date`
- `status`
- `createdAt`

#### **Transactions Collection:**

- `vendorId`
- `customerId`
- `type`
- `createdAt`

### **Step 8: Test the Setup**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test in browser console:
import { account } from './client/lib/appwrite.js';
console.log('Appwrite connected!', account);
```

### **Step 9: Initialize Sample Data**

Run this in browser console to create sample data:

```javascript
// Create sample city
await AppwriteHelper.createDocument(
  "cities",
  {
    name: "Mumbai",
    state: "Maharashtra",
    isActive: true,
    vendorCount: 0,
    customerCount: 0,
    totalBookings: 0,
    totalRevenue: 0,
  },
  "mumbai",
);

// Create sample promo code
await AppwriteHelper.createDocument("promoCodes", {
  code: "WELCOME200",
  type: "first_time",
  value: 200,
  minOrderValue: 500,
  usageLimit: 10000,
  usedCount: 0,
  userLimit: 1,
  isActive: true,
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  applicableServices: [],
  applicableVendors: [],
  createdBy: "system",
});
```

### **Step 10: Production Deployment**

1. **Update CORS Settings** in Appwrite Console

   - Add your production domain
   - Add localhost for development

2. **Security Rules** (automatically handled by permissions)

3. **Backup Strategy**
   - Enable automatic backups in Appwrite Console
   - Set up monitoring and alerts

### **🔧 Troubleshooting**

#### **Common Issues:**

1. **"Project not found" error:**

   - Check `VITE_APPWRITE_PROJECT_ID` in `.env`
   - Ensure project exists in Appwrite Console

2. **"Collection not found" error:**

   - Verify collection IDs match exactly
   - Check database ID is `beautybook-db`

3. **Permission denied errors:**

   - Review collection permissions
   - Ensure user is authenticated

4. **CORS errors:**
   - Add your domain to Appwrite Console
   - Check network configuration

#### **Testing Commands:**

```bash
# Test Appwrite connection
curl -X GET 'https://cloud.appwrite.io/v1/account' \
  -H 'X-Appwrite-Project: YOUR-PROJECT-ID'

# Check collections exist
curl -X GET 'https://cloud.appwrite.io/v1/databases/beautybook-db/collections' \
  -H 'X-Appwrite-Project: YOUR-PROJECT-ID'
```

### **🎯 Next Steps**

1. ✅ **Complete Setup** - Follow all steps above
2. ✅ **Test Authentication** - Create test user account
3. ✅ **Test Booking Flow** - Create vendor and test booking
4. ✅ **Configure Payment Gateway** - Add Razorpay integration
5. ✅ **Deploy to Production** - Update environment variables

---

## 🚀 **Migration Complete!**

Your BeautyBook platform is now fully migrated from Firebase to Appwrite with:

- ✅ **Complete Authentication System**
- ✅ **All Business Logic Services**
- ✅ **Real-time Database Operations**
- ✅ **File Storage for Images/Documents**
- ✅ **Commission & Subscription Management**
- ✅ **Loyalty & Referral Programs**
- ✅ **Admin Panel & Analytics**
- ✅ **Vendor Onboarding Workflow**

The platform is ready for production deployment!
