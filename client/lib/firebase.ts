import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
// You'll need to replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "your-auth-domain",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket:
    process.env.VITE_FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
  messagingSenderId:
    process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id",
  appId: process.env.VITE_FIREBASE_APP_ID || "your-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
