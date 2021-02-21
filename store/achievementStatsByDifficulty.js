import {firestoreAction} from 'vuexfire';
import db from '~/components/utils/db.js';

const achievementStatsByDifficultyRef = db.collection('achievement_stats_by_difficulty');

const localState = () => ({
	isInitList: null,
	list: [],
});

const localMutations = {
	initList(state) {
		state.isInitList = process.browser;
	},
};

const localGetters = {
	list: (state) => state.list,
	getById: (state) => (
		(id) => {
			const achievementStatByDifficulty = state.list.find((datum) => datum.id === id);
			if (achievementStatByDifficulty === undefined) {
				return {id};
			}
			return achievementStatByDifficulty;
		}
	),
};

const localActions = {
	async initList({state, dispatch, commit}) {
		if (!state.isInitList) {
			await dispatch('bindList');
			commit('initList');
		}
	},
	bindList: firestoreAction(async ({bindFirestoreRef}) => {
		await bindFirestoreRef('list', achievementStatsByDifficultyRef);
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
