import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWQepT0ka0fT589FWCTH_dNdwHDs__kxA",
  authDomain: "tenedores-v2-4056f.firebaseapp.com",
  projectId: "tenedores-v2-4056f",
  storageBucket: "tenedores-v2-4056f.appspot.com",
  messagingSenderId: "535095123992",
  appId: "1:535095123992:web:350282737b428750e0e36d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//con esto obtengo mi base de

// Initialize Firebase
const initFirebase = () => initializeApp(firebaseConfig);
const db = getFirestore();

export { auth, db };
export default initFirebase;