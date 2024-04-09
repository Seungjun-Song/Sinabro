// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import getEnv from "./utils/getEnv";
// Your web app's Firebase configuration

const firebase_api_key = getEnv('FIREBASE_API_KEY')

const firebaseConfig = {
  apiKey: firebase_api_key,
  authDomain: "last-pjt.firebaseapp.com",
  databaseURL: 'https://last-pjt-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: "last-pjt",
  storageBucket: "last-pjt.appspot.com",
  messagingSenderId: "373628034319",
  appId: "1:373628034319:web:63c872f6e436ecae52f27a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const storage = getStorage(app)
export default app