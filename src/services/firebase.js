import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDu17o607ye1274MTw2ALrhJY6VV78GpwE",
  authDomain: "senfrost-aircon.firebaseapp.com",
  projectId: "senfrost-aircon",
  storageBucket: "senfrost-aircon.firebasestorage.app",
  messagingSenderId: "399557479565",
  appId: "1:399557479565:web:d6e66e51408f8a0e4066c4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
