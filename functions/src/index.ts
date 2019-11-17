import * as cors from 'cors';
import * as express from 'express';
import * as firebase from 'firebase-admin';
import * as functions from 'firebase-functions';

firebase.initializeApp();
const db = firebase.firestore();

export const updateCounts = functions.firestore.document('achievements/{id}').onCreate((achievement) => {
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

app.post('/tahoiya/theme', async (req, res) => {
	if (!req.body.word || !req.body.ruby || !req.body.description || !req.body.meaning) {
		res.status(400);
		res.send('Bad Request');
		return;
	}

	const word = req.body.word.toString();
	const ruby = req.body.ruby.toString();
	const meaning = req.body.meaning.toString();
	const description = req.body.description.toString();
	const date = new Date();

	await db.collection('tsglive_tahoiya_themes').add({
		word,
		ruby,
		meaning,
		description,
		date,
	});

	res.send('Success');
});

app.patch('/tahoiya/theme', async (req, res) => {
	if (!req.body.word || !req.body.ruby || !req.body.description || !req.body.meaning || !req.body.id) {
		res.status(400);
		res.send('Bad Request');
		return;
	}

	const id = req.body.id.toString();
	const docRef = db.collection('tsglive_tahoiya_themes').doc(id);
	const doc = await docRef.get();

	if (!doc.exists) {
		res.status(404);
		res.send('Not Found');
		return;
	}

	const word = req.body.word.toString();
	const ruby = req.body.ruby.toString();
	const meaning = req.body.meaning.toString();
	const description = req.body.description.toString();

	await docRef.update({
		word,
		ruby,
		meaning,
		description,
	});

	res.send('Success');
});

app.delete('/tahoiya/theme', async (req, res) => {
	if (!req.body.id) {
		res.status(400);
		res.send('Bad Request');
		return;
	}

	const id = req.body.id.toString();
	const docRef = db.collection('tsglive_tahoiya_themes').doc(id);
	const doc = await docRef.get();

	if (!doc.exists) {
		res.status(404);
		res.send('Not Found');
		return;
	}

	await docRef.delete();

	res.send('Success');
});

app.post('/comments', async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		res.send('Bad Request');
		return;
	}

	const text = req.body.text.toString().trim().slice(0, 140);
	const date = new Date();

	await db.collection('tsglive_audience_comments').add({
		text,
		date,
		headers: req.headers,
	});

	res.send(`Commented: ${text}`);
});

export const tsglive = functions.https.onRequest(app);
