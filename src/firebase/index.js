// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMzKSr5wBt8g84I1-28eGi8iajg1HiIIo",
  authDomain: "todoapp-e835c.firebaseapp.com",
  projectId: "todoapp-e835c",
  storageBucket: "todoapp-e835c.appspot.com",
  messagingSenderId: "578736484083",
  appId: "1:578736484083:web:a20374abace4a30f2c1186",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
