// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import {getStorage} from "firebase/storage"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKcKsinKxSnE0wcJoDqpGG2U6OCZIEc-w",
  authDomain: "voice-cloning-890fc.firebaseapp.com",
  databaseURL: "https://voice-cloning-890fc-default-rtdb.firebaseio.com",
  projectId: "voice-cloning-890fc",
  storageBucket: "voice-cloning-890fc.appspot.com",
  messagingSenderId: "331864957414",
  appId: "1:331864957414:web:afdcab3b7b97f50d5db627",
  measurementId: "G-V60ZHHLM4H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
export { firebaseConfig };