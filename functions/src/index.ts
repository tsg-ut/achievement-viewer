import * as cors from 'cors';
import * as express from 'express';
import * as firebase from 'firebase-admin';
import * as functions from 'firebase-functions';
import {check, validationResult} from 'express-validator';

firebase.initializeApp();
const db = firebase.firestore();
const auth = firebase.auth();

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

const endCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		next();
		return;
	}
	res.status(400);
	res.json({errors: errors.array()});
};

const adminOnly = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const token = await auth.verifyIdToken(req.body.token);
	const userRef = db.collection('tsglive_tahoiya_users').doc(token.uid);
	const user = await userRef.get();
	if (user.get('admin') === true) {
		next();
		return;
	}
	res.status(403);
	res.json({errors: ['Admin only']});
};

const app = express();

app.use(cors({origin: true}));

app.get('/', (req, res) => {
	res.send('Hello!');
});

app.post('/tahoiya/theme',
	check('token').isString(),
	check('word').isString(),
	check('ruby').isString(),
	check('description').isString(),
	check('meaning').isString(),
	endCheck,
	adminOnly,
	async (req, res) => {
		const {word, ruby, meaning, description} = req.body;

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

app.patch('/tahoiya/theme',
	check('token').isString(),
	check('id').isString(),
	check('word').isString(),
	check('ruby').isString(),
	check('description').isString(),
	check('meaning').isString(),
	endCheck,
	adminOnly,
	async (req, res) => {
		const {id, word, ruby, meaning, description} = req.body;

		const docRef = db.collection('tsglive_tahoiya_themes').doc(id);
		const doc = await docRef.get();

		if (!doc.exists) {
			res.status(404);
			res.send('Not Found');
			return;
		}

		await docRef.update({
			word,
			ruby,
			meaning,
			description,
		});

		res.send('Success');
	});

app.delete('/tahoiya/theme',
	check('token').isString(),
	check('id').isString(),
	endCheck,
	adminOnly,
	async (req, res) => {
		const {id} = req.body;
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
