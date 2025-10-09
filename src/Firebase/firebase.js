import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJbtx2PIubjBrmY1Pw2YAbOCGupI24KJY",
  authDomain: "adminpanel-73969.firebaseapp.com",
  projectId: "adminpanel-73969",
  storageBucket: "adminpanel-73969.firebasestorage.app",
  messagingSenderId: "6876347319",
  appId: "1:6876347319:web:b8f9c2348f09b057a38632"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
