import {firestoreAction} from 'vuexfire';
import db from '~/lib/db.js';

const twentyQuestionsGamesRef = db.collection('twenty_questions_games');

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
			const game = state.list.find((datum) => datum.id === id);
			if (game === undefined) {
				return {id};
			}
			return game;
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
		await bindFirestoreRef('list', twentyQuestionsGamesRef.orderBy('finishedAt', 'desc'));
		commit('initList');
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
