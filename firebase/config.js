import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Only initialize Firebase in the browser — prevents auth/invalid-api-key
// errors during Next.js server-side prerender where env vars are unavailable.
const isClient = typeof window !== "undefined";
const app = isClient ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;

export const auth = isClient && app ? getAuth(app) : null;
export const googleProvider = isClient ? new GoogleAuthProvider() : null;
export const db = isClient && app ? getFirestore(app) : null;