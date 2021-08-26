import {getFirestore} from 'firebase/firestore';
import firebase from './firebase.js';

const db = getFirestore(firebase);

export default db;
