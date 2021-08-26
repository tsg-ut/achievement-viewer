const {getFirestore} = require('firebase/firestore');
const firebase = require('./firebase.js');

const db = getFirestore(firebase);

export default db;
