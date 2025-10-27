import {firestoreAction} from 'vuexfire';
import db from '~/lib/db.js';

const slowQuizGamesRef = db.collection('slow_quiz_games');

const localState = () => ({
	isInitList: null,
	list: [],
});

const localMutations = {
	initList(state) {
		state.isInitList = process.client;
	},
};

const localGetters = {
	list: (state) => state.list,
	getById: (state) => (
		(id) => {
			const user = state.list.find((datum) => datum.id === id);
			if (user === undefined) {
				return {id};
			}
			return user;
		}
	),
};

const localActions = {
	async initList({state, dispatch, commit}) {
		if (state.isInitList !== process.client) {
			await dispatch('bindList');
			commit('initList');
		}
	},
	bindList: firestoreAction(async ({bindFirestoreRef, commit}) => {
		await bindFirestoreRef('list', slowQuizGamesRef.where('status', '==', 'finished').orderBy('finishDate', 'desc'));
		commit('initList');
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
