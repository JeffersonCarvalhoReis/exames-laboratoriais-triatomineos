import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtgweeyJwsrIN_xTAE1z5-1vSeDY7SKyw",
  authDomain: "triatomineos-teste.firebaseapp.com",
  projectId: "triatomineos-teste",
  storageBucket: "triatomineos-teste.appspot.com",
  messagingSenderId: "461735364848",
  appId: "1:461735364848:web:ef4d03e5bc1ad54a2c5a35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
