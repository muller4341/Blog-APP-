// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app1-f5eec.firebaseapp.com",
  projectId: "blog-app1-f5eec",
  storageBucket: "blog-app1-f5eec.appspot.com",
  messagingSenderId: "315232602246",
  appId: "1:315232602246:web:4d53fcf9b324547f70e907",
  measurementId: "G-18VC6S6XGJ"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);  
  

