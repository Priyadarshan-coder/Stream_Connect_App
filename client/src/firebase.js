// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "clone-f8b4d.firebaseapp.com",
  projectId: "clone-f8b4d",
  storageBucket: "clone-f8b4d.appspot.com",
  messagingSenderId: "738509917730",
  appId: "1:738509917730:web:a16711e03ed7d28b5a047b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;