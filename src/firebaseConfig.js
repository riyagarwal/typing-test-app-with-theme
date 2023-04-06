import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYE8_LARSXyLNcSJldH1hTtDo0JynU-Jw",
  authDomain: "march-typingtest.firebaseapp.com",
  projectId: "march-typingtest",
  storageBucket: "march-typingtest.appspot.com",
  messagingSenderId: "103300117091",
  appId: "1:103300117091:web:0dc2ee10fd0b138816be56",
  measurementId: "G-5W0D4S8PWK",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };
