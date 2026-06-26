import {getApps, initializeApp} from 'firebase/app';

if (getApps().length === 0) {
	initializeApp({
		apiKey: 'AIzaSyBiI-MHTxhqNpgJ6FMJaVTN3lcBMmL9cqU',
		authDomain: 'tsg-slackbot.firebaseapp.com',
		projectId: 'tsg-slackbot',
		storageBucket: 'tsg-slackbot.appspot.com',
		messagingSenderId: '382537830947',
		appId: '1:382537830947:web:41aa27c8a7261f0fe61796',
		measurementId: 'G-NZD98Q80NG',
	});
}
