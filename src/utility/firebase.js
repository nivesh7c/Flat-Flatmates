// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT6Sih5ma2lB6ZSLoMohJ4zCwpbELF1v8",
  authDomain: "flatandflatmates-cfc60.firebaseapp.com",
  databaseURL: "https://flatandflatmates-cfc60-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flatandflatmates-cfc60",
  storageBucket: "flatandflatmates-cfc60.appspot.com",
  messagingSenderId: "241369188575",
  appId: "1:241369188575:web:ea7c6d38f9da3a5422416a",
  measurementId: "G-9C2KN421WG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStoreDb = getFirestore(app);

export { app, fireStoreDb };