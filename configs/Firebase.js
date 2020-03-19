import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDzeUHwVGt4kcjO3Daz5phamYUHgXnvhK8',
  authDomain: 'test-login-3aace.firebaseapp.com',
  databaseURL: 'https://test-login-3aace.firebaseio.com',
  projectId: 'test-login-3aace',
  storageBucket: 'test-login-3aace.appspot.com',
  messagingSenderId: '524604018582',
  appId: '1:524604018582:web:8009455a8f2cdcb3c9d7b7',
  measurementId: 'G-SB4BRM9MCJ'
}

export const initialFirebase = firebase.initializeApp(firebaseConfig);
export const fb = firebase;

export default initialFirebase;