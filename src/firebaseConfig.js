// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARoXOyT_lMgVPtmJHX-JwIBxKFfyKZcCs",
  authDomain: "triatomineos-69e8c.firebaseapp.com",
  projectId: "triatomineos-69e8c",
  storageBucket: "triatomineos-69e8c.appspot.com",
  messagingSenderId: "313793497472",
  appId: "1:313793497472:web:998a7289d9f38a2d6f1965",
  measurementId: "G-YLSTW3P1MQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
