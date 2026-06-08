import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKhycWj3MqBJgM_91hMOqriLpN8pDiUz4",
  authDomain: "jinis-playground.firebaseapp.com",
  projectId: "jinis-playground",
  storageBucket: "jinis-playground.firebasestorage.app",
  messagingSenderId: "911735186490",
  appId: "1:911735186490:web:0ac02d918de0a4dc774103",
  measurementId: "G-GTW5YNX32Y"
};

const app = initializeApp(firebaseConfig);

// DB만 사용
export const db = getFirestore(app);