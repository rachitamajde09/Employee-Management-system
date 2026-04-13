import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Added Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDOLQrqJBPZAU2Ojwy-CoQrwfOVreJpUZE",
  authDomain: "employee-management-syatem.firebaseapp.com",
  projectId: "employee-management-syatem",
  storageBucket: "employee-management-syatem.firebasestorage.app",
  messagingSenderId: "444166436112",
  appId: "1:444166436112:web:c5e4d3d7f99d4d7c95a195",
  measurementId: "G-70M95L1KEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);