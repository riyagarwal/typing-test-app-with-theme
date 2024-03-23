// npm install firebase
// can also use "firebase/app" instead of firebase/compat/...
// we are using compat to make version 9 compatible with version 8
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// this config is unique to every user
// taken from the console.firebase.google.com typing test project
const firebaseConfig = {
  apiKey: "AIzaSyD8kNn6nNWQo1JdLjB_uhoNC_a7uMeJnZw",
  authDomain: "typing-test-d9eea.firebaseapp.com",
  projectId: "typing-test-d9eea",
  storageBucket: "typing-test-d9eea.appspot.com",
  messagingSenderId: "833521580531",
  appId: "1:833521580531:web:8bd1c1ec10f5e2c7fa3a86",
  measurementId: "G-Q6JRBN3W5C"
};

// initializes the firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// auth object - firebase does all the user authentication. 
// Using the auth object, we can use the authentication functionality of firebase.
// It also stores the current user when the user logs in

const auth = firebase.auth();
const db = firebaseApp.firestore();

export { auth, db };

// 
