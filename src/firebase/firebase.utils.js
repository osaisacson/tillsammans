import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA1U1ZqCGWk11wpBvoDj2nsbPwrLfRyqVE',
  authDomain: 'sverige-tillsammans.firebaseapp.com',
  databaseURL: 'https://sverige-tillsammans.firebaseio.com',
  projectId: 'sverige-tillsammans',
  storageBucket: 'sverige-tillsammans.appspot.com',
  messagingSenderId: '1051712811922',
  appId: '1:1051712811922:web:7be6a7bd7fdd3376a6474b',
  measurementId: 'G-M0919C717V'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
