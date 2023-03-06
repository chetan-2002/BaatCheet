import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA0SxU-OQE1EWrzx9Uouce7Z7KHQBQEp94',
  authDomain: 'baatcheet-37982.firebaseapp.com',
  projectId: 'baatcheet-37982',
  storageBucket: 'baatcheet-37982.appspot.com',
  messagingSenderId: '681957895120',
  appId: '1:681957895120:web:edd9877aa4316ca82327d5',
  measurementId: 'G-51FCFCM4PZ',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {auth, db};
