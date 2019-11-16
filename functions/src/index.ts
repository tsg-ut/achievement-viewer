import * as firebase from 'firebase-admin';
import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

firebase.initializeApp();
const db = firebase.firestore();

export const updateCounts = functions.firestore.document('achievements/{id}').onCreate(async (achievement) => {
	db.runTransaction(async (transaction) => {
		const name = achievement.get('name');
		const user = achievement.get('user');

		const achievementRef = db.collection('achievement_data').doc(name);
		const userRef = db.collection('users').doc(user);

		const achievementDatum = await transaction.get(db.collection('achievement_data').doc(name));
		const userDatum = await transaction.get(userRef);
		const category = achievementDatum.get('category');

		await transaction.update(achievementRef, {
			count: (achievementDatum.get('count') || 0) + 1,
			...(achievementDatum.get('first') === undefined ? {first: user} : {}),
		});

		const oldCounts = userDatum.get('counts') || {};
		await transaction.update(userRef, {
			counts: {
				...oldCounts,
				[category]: (oldCounts[category] || 0) + 1,
			},
		});
	});
});

const app = express();

app.use(cors({origin: true}));

app.get('/', (req, res) => {
	res.send('Hello!');
});

app.post('/tahoiya', (req, res) => {
	res.send('Hello!');
});

app.post('/comments', (req, res) => {
	res.send('Hello!');
});

export const tsglive = functions.https.onRequest(app);
