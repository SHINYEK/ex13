// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDngeXEzvjGduAgEvvauM4JeG5begUqp_Y",
  authDomain: "fir-cdbc5.firebaseapp.com",
  databaseURL: "https://fir-cdbc5-default-rtdb.firebaseio.com",
  projectId: "fir-cdbc5",
  storageBucket: "fir-cdbc5.appspot.com",
  messagingSenderId: "170389830238",
  appId: "1:170389830238:web:84a5da6037b59e87ed92cf",
  measurementId: "G-MLSLG42NEN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);