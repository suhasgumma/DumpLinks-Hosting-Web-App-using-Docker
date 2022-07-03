import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAtbwX5SvGFhvcxJjcA0KaCsycfTaAm73s",
  authDomain: "dumplinks-e123d.firebaseapp.com",
  projectId: "dumplinks-e123d",
  storageBucket: "dumplinks-e123d.appspot.com",
  messagingSenderId: "415470854893",
  appId: "1:415470854893:web:4d21b3f1e8f19988e5a2e4",
  measurementId: "G-W5B8X2EPD4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();


export {  db };

