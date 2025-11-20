import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // <--- NEW IMPORT

// --- CONFIGURATION ---
const firebaseConfig = {
  apiKey: "AIzaSyCVLpVWVWs0EoPrHJp1rR7a7dJfYDRaf-0",
  authDomain: "swish-portal-76d68.firebaseapp.com",
  projectId: "swish-portal-76d68",
  storageBucket: "swish-portal-76d68.firebasestorage.app",
  messagingSenderId: "539454562334",
  appId: "1:539454562334:web:7cb2adfcedf364a78e0e0f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // <--- NEW EXPORT

export default app;