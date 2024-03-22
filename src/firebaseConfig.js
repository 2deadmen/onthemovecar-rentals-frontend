// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth,GoogleAuthProvider, signInWithPopup,FacebookAuthProvider,GithubAuthProvider,RecaptchaVerifier  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD4ArUm7-zsmtyugGEts5R30-cqXkEz6KI",
    authDomain: "onthemovecarrentals.firebaseapp.com",
    projectId: "onthemovecarrentals",
    storageBucket: "onthemovecarrentals.appspot.com",
    messagingSenderId: "875761822475",
    appId: "1:875761822475:web:9f79e7e7dc5d728bac500e",
    measurementId: "G-4V45ED5E6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const  auth = getAuth(app);
export{auth,storage}