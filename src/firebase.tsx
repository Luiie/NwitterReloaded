import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPrX9LRi38c9uoBmq6lkpmIbihLQ-ORw4",
  authDomain: "nwitter-reloaded-499f2.firebaseapp.com",
  projectId: "nwitter-reloaded-499f2",
  storageBucket: "nwitter-reloaded-499f2.appspot.com",
  messagingSenderId: "185138303506",
  appId: "1:185138303506:web:e4821e2a015b737c6bbecb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);
export const db = getFirestore(app);