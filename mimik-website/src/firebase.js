// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKcKsinKxSnE0wcJoDqpGG2U6OCZIEc-w",
  authDomain: "voice-cloning-890fc.firebaseapp.com",
  databaseURL: "https://voice-cloning-890fc-default-rtdb.firebaseio.com",
  projectId: "voice-cloning-890fc",
  storageBucket: "voice-cloning-890fc.appspot.com",
  messagingSenderId: "331864957414",
  appId: "1:331864957414:web:afdcab3b7b97f50d5db627",
  measurementId: "G-V60ZHHLM4H"
};

export const PasswordRecovery = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    throw error;
  }
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app; 
export { firebaseConfig };