import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnlNQR6ik4WnIB62aZ2lZArpA-_IJOJfI",
  authDomain: "fir-todolist-89d2c.firebaseapp.com",
  projectId: "fir-todolist-89d2c",
  storageBucket: "fir-todolist-89d2c.appspot.com",
  messagingSenderId: "253410031593",
  appId: "1:253410031593:web:c30d9b256e135da90c3d78",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
