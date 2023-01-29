import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBinPMKSu3bbTHlwG5dUBFynlmShislSxo",
    authDomain: "notes-694e1.firebaseapp.com",
    projectId: "notes-694e1",
    storageBucket: "notes-694e1.appspot.com",
    messagingSenderId: "1005991513692",
    appId: "1:1005991513692:web:100e64e9ffe6794305a099"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)


