import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAxEnt_z-R4-q2TYL8H9c5twSO9TBlLPYI",
  authDomain: "personal-3fa3f.firebaseapp.com",
  projectId: "personal-3fa3f",
  storageBucket: "personal-3fa3f.firebasestorage.app",
  messagingSenderId: "859384309058",
  appId: "1:859384309058:web:e1255120a34e291bea94db",
  measurementId: "G-5X94VE5GQ4"
};

// Initialize Firebase safely
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

// Optional Analytics initialization in browser environment
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics is optional and might fail in local or restricted environments
  });
}

export default app;

