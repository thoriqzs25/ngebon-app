import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyBrHdDDDGqKU9tsF5Y-iEj0szL8W9YVVTs',
  authDomain: 'ngebon-app.firebaseapp.com',
  // databaseURL: 'https://ngebon-app.firebaseio.com',
  projectId: 'ngebon-app',
  storageBucket: 'ngebon-app.appspot.com',
  // messagingSenderId: 'sender-id',
  // appId: 'app-id',
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

export { auth, db, storage };
