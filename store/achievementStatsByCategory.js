import {firestoreAction} from 'vuexfire';
import db from '~/components/utils/db.js';

const achievementStatsByCategoryRef = db.collection('achievement_stats_by_category');

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
			const achievementStatByCategory = state.list.find((datum) => datum.id === id);
			if (achievementStatByCategory === undefined) {
				return {id};
			}
			return achievementStatByCategory;
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
		await bindFirestoreRef('list', achievementStatsByCategoryRef);
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
