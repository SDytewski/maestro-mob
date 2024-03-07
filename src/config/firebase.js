import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDLyuQYkJiwwgtce_Qd2u180x1V9BjvaII",
  authDomain: "music-mob-5637e.firebaseapp.com",
  projectId: "music-mob-5637e",
  storageBucket: "music-mob-5637e.appspot.com",
  messagingSenderId: "381934294274",
  appId: "1:381934294274:web:8e53aa56ae1e3364e01e1b",
  measurementId: "G-7Q6L4ZE3RG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
