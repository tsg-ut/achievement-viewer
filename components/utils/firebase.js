// TODO: Use v9 API
// https://firebase.google.com/docs/web/modular-upgrade?hl=en
const {default: firebase} = require('firebase/compat/app');
require('firebase/compat/firestore');

if (firebase.apps.length === 0) {
	firebase.initializeApp({
		apiKey: 'AIzaSyAPaAYbtVtoZNrU9GA3jxXNKNptLJDe39g',
		authDomain: 'hakata-shi.firebaseapp.com',
		databaseURL: 'https://hakata-shi.firebaseio.com',
		projectId: 'hakata-shi',
		storageBucket: 'hakata-shi.appspot.com',
		messagingSenderId: '745572740539',
		appId: '1:745572740539:web:50444e3a76095a31',
	});
}

module.exports = firebase.apps[0];
