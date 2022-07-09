import { initializeApp  } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFunctions } from "firebase/functions";
const firebaseConfig = {
    apiKey: "AIzaSyBVsYE5r-KmfLztlgZKv7YauX0IaAoo5-o",
  authDomain: "isearch-3a507.firebaseapp.com",
  databaseURL: "https://isearch-3a507-default-rtdb.firebaseio.com",
  projectId: "isearch-3a507",
  storageBucket: "isearch-3a507.appspot.com",
  messagingSenderId: "7934105666",
  appId: "1:7934105666:web:56758bdec452c7907d35db",
  measurementId: "G-97Q0DRKMGG"
  };
  

  const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
 /* const auth = app.auth(); */
 const storage = getStorage(app);
 export { storage, db ,ref ,app};