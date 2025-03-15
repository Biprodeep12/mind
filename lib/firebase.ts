import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSqhP4vY5REzA5PyH7t0qNp1MJyVES_bw",
  authDomain: "hackspeed-155d9.firebaseapp.com",
  projectId: "hackspeed-155d9",
  storageBucket: "hackspeed-155d9.firebasestorage.app",
  messagingSenderId: "697843526258",
  appId: "1:697843526258:web:895cdd20496387ff1d30eb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
