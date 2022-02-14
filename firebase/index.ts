import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkClnTNJCsKk2wo_59PRMkrISCKYfXpZ0",
  authDomain: "tactical-gaming-d61ad.firebaseapp.com",
  projectId: "tactical-gaming-d61ad",
  storageBucket: "tactical-gaming-d61ad.appspot.com",
  messagingSenderId: "769094007489",
  appId: "1:769094007489:web:71028f3ba483e4745a7240"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

export {
    app,
    auth,
    db,
}