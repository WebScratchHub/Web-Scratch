import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtySdXYkzIwQevDq9Vqm_hgMB-5vRiY4g",
  authDomain: "web-scratch-92e15.firebaseapp.com",
  projectId: "web-scratch-92e15",
  storageBucket: "web-scratch-92e15.appspot.com",
  messagingSenderId: "1080870395655",
  appId: "1:1080870395655:web:bb61e38520886b34d5efa2",
  measurementId: "G-DDTNF3LF6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and provider instances
export const auth = getAuth(app);
