// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9QsV3FqRD4ar98_lVXq0T1SoCqfuSsBQ",
  authDomain: "trumanchat-b54e8.firebaseapp.com",
  projectId: "trumanchat-b54e8",
  storageBucket: "trumanchat-b54e8.appspot.com",
  messagingSenderId: "364255661855",
  appId: "1:364255661855:web:3b3e0dc38cb121ee48ea2a",
  measurementId: "G-P4MLFGJFRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
const analytics = getAnalytics(app);