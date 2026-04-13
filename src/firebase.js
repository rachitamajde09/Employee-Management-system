import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore } from "firebase/firestore"; // Proper import

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

/** * Yahan hum Firestore ko 'experimentalForceLongPolling' ke saath initialize kar rahe hain.
 * Isse AdBlockers aur "Blocked by Client" wali errors 100% solve ho jayengi.
 */
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false
});