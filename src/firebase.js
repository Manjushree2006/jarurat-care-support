import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFrKOVUpknXGuV7aOEb6UXvs6wKKIltrs",
  authDomain: "jarurat-care-support.firebaseapp.com",
  projectId: "jarurat-care-support",
  storageBucket: "jarurat-care-support.firebasestorage.app",
  messagingSenderId: "527530187531",
  appId: "1:527530187531:web:77c71161cf4838c337a00e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);