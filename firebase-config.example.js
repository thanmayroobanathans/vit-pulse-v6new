// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQQMTFQ8W0mj0jGdvdeVxIB8kgc419OaU",
  authDomain: "vit-pulse.firebaseapp.com",
  projectId: "vit-pulse",
  storageBucket: "vit-pulse.firebasestorage.app",
  messagingSenderId: "208680450066",
  appId: "1:208680450066:web:06fcae6d6431a799af40cb",
  measurementId: "G-32DR3BLRTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
