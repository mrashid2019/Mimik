// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDKcKsinKxSnE0wcJoDqpGG2U6OCZIEc-w",
  authDomain: "voice-cloning-890fc.firebaseapp.com",
  projectId: "voice-cloning-890fc",
  storageBucket: "voice-cloning-890fc.appspot.com",
  messagingSenderId: "331864957414",
  appId: "1:331864957414:web:afdcab3b7b97f50d5db627",
  measurementId: "G-V60ZHHLM4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export default app; 
export { firebaseConfig };