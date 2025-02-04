// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwvoeT8tQsRKibLTKmAEYsmW07DhI_B7o",
  authDomain: "diabeteweb-9a012.firebaseapp.com",
  projectId: "diabeteweb-9a012",
  storageBucket: "diabeteweb-9a012.appspot.com", // Fixed storageBucket format
  messagingSenderId: "629871986323",
  appId: "1:629871986323:web:457837dfb8bcb24fff2f66",
  measurementId: "G-EZ0NDCZC4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // Firebase Authentication
export const db = getFirestore(app); // Firestore Database

export { app, analytics };
