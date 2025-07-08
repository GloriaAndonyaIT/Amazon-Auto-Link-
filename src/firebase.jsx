import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDwxW0G2nEoIeDiA3-dqDVufbECKeEoGZQ",
    authDomain: "auto-link-a63bb.firebaseapp.com",
    projectId: "auto-link-a63bb",
    messagingSenderId: "352932987469",
    appId: "1:352932987469:web:292e7fcb9b638d3ad5d204"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { 
    auth, 
    db, 
    googleProvider, 
    signInWithPopup,
    signOut,
    onAuthStateChanged
};