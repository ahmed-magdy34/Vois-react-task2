// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU8-JGUgem5XFEqbGaD9u3-40oZMO7dc4",
  authDomain: "react-task2-10683.firebaseapp.com",
  projectId: "react-task2-10683",
  storageBucket: "react-task2-10683.firebasestorage.app",
  messagingSenderId: "306416716751",
  appId: "1:306416716751:web:070a3ee959e359f670a0ba",
  measurementId: "G-XYD7C8NWXL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const API_KEY = firebaseConfig.apiKey;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const BASE_URL = `https://firestore.googleapis.com/v1/projects/react-task2-10683/databases/(default)/documents/posts`;
