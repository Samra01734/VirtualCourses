// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <-- add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAViWuhqP28BDsAWlV2rovfCWNtjvC_jvQ",
  authDomain: "loginvirtualcourses-b841e.firebaseapp.com",
  projectId: "loginvirtualcourses-b841e",
  storageBucket: "loginvirtualcourses-b841e.appspot.com", // corrected
  messagingSenderId: "298512495104",
  appId: "1:298512495104:web:cb7e2885eabd5d7a7f9ee5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };