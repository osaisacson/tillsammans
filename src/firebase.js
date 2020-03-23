// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
// import "firebase/auth";

// Your app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyA5Bf1jlqYWyJF_277LRCRkkwdnp-G5FUY',
  authDomain: 'tillsammans-1ad95.firebaseapp.com',
  databaseURL: 'https://tillsammans-1ad95.firebaseio.com',
  projectId: 'tillsammans-1ad95',
  storageBucket: 'tillsammans-1ad95.appspot.com',
  messagingSenderId: '289035770626',
  appId: '1:289035770626:web:d3f4b337d322c86155c01b',
  measurementId: 'G-9SN29E1YXM'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default firebase;
