import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyDWPvVazyfSJsm4Nfsz0PvBTakMvGptmPE',
  authDomain: 'ngebon-app.firebaseapp.com',
  // databaseURL: 'https://ngebon-app.firebaseio.com',
  projectId: 'ngebon-app',
  // storageBucket: 'project-id.appspot.com',
  // messagingSenderId: 'sender-id',
  // appId: 'app-id',
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
