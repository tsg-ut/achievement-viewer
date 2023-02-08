// TODO: Use v9 API
// https://firebase.google.com/docs/web/modular-upgrade?hl=en
const {default: firebase} = require('firebase/compat/app');
require('firebase/compat/firestore');

if (firebase.apps.length === 0) {
	firebase.initializeApp({
		apiKey: 'AIzaSyBiI-MHTxhqNpgJ6FMJaVTN3lcBMmL9cqU',
		authDomain: 'tsg-slackbot.firebaseapp.com',
		projectId: 'tsg-slackbot',
		storageBucket: 'tsg-slackbot.appspot.com',
		messagingSenderId: '382537830947',
		appId: '1:382537830947:web:41aa27c8a7261f0fe61796',
		measurementId: 'G-NZD98Q80NG',
	});
}

module.exports = firebase.apps[0];
