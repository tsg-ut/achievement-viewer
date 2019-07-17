import * as firebase from 'firebase-admin';
import * as functions from 'firebase-functions';

firebase.initializeApp();
const db = firebase.firestore();

export const updateCounts = functions.firestore.document('achievements/{id}').onCreate(async (achievement) => {
	db.runTransaction(async (transaction) => {
		const name = achievement.get('name');
		const user = achievement.get('user');
		const achievementDatum = await transaction.get(db.collection('achievement_data').doc(name));
		const category = achievementDatum.get('category');

		const achievementRef = db.collection('achievements').doc(name);
		const userRef = db.collection('users').doc(user);

		const achievementData = await transaction.get(achievementRef);
		const userData = await transaction.get(userRef);

		await transaction.update(achievementRef, {
			count: (achievementData.get('count') || 0) + 1,
		});

		await transaction.update(userRef, {
			counts: {
				[category]: (userData.get(`counts.${category}`) || 0) + 1,
			},
		});
	});
});
