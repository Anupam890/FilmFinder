import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtHXP_bC7IrQDNCqrEv0kv14J6N9IOBDE",
  authDomain: "filmfinder-3e677.firebaseapp.com",
  projectId: "filmfinder-3e677",
  storageBucket: "filmfinder-3e677.appspot.com",
  messagingSenderId: "585115953084",
  appId: "1:585115953084:web:e9d6e4a8c7128f26d76db9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
