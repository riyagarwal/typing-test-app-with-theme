// npm install firebase
// can also use "firebase/app" instead of firebase/compat/...
// we are using compat to make version 9 compatible with version 8
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// this config is unique to every user
// taken from the console.firebase.google.com typing test project
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "typing-test-project.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
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
