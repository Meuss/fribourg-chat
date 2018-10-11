import firebase from 'firebase';
// eslint-disable-next-line
import firestore from 'firebase/firestore';

const config = {
  // apikeys in => .env
  // not published on github, suckers..
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'fribourg-chat.firebaseapp.com',
  databaseURL: 'https://fribourg-chat.firebaseio.com',
  projectId: 'fribourg-chat',
  storageBucket: 'fribourg-chat.appspot.com',
  messagingSenderId: '319116655555',
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();
