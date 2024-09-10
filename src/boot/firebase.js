// src/boot/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (substitua com os valores do seu Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyAiEvjGgfRKVHI2y3XzUGSeEgiCJzTIJ_8",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_ID_PROJETO",
  storageBucket: "SEU_BUCKET_ID",
  messagingSenderId: "SEU_MESSAGING_ID",
  appId: "1:313793497472:android:241b2cdc0e732faa6f1965",
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Exportar serviços
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
