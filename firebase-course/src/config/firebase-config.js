// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD_HxcgTVRxeOG6bZAlhsUWxZ_qzU9a5Jk",
  authDomain: "fir-course-c1184.firebaseapp.com",
  projectId: "fir-course-c1184",
  storageBucket: "fir-course-c1184.appspot.com",
  messagingSenderId: "940203745950",
  appId: "1:940203745950:web:7d2feeab18251044c7918f",
  measurementId: "G-2YXJYHJL8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const googleProvider = new GoogleAuthProvider();
export const db =  getFirestore(app);
export const storage = getStorage(app);
 
