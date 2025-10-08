// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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