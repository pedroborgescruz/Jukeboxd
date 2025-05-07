import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "jukeboxd-92a65.firebaseapp.com",
  projectId: "jukeboxd-92a65",
  storageBucket: "jukeboxd-92a65.firebasestorage.app",
  messagingSenderId: "181012854979",
  appId: "1:181012854979:web:e1616d73fc6c6b5894ca76",
  measurementId: "G-HF1MLMF28V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);