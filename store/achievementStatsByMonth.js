import {firestoreAction} from 'vuexfire';
import db from '~/lib/db.js';

const achievementStatsByMonthRef = db.collection('achievement_stats_by_month');

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
			const achievementStatByMonth = state.list.find((datum) => datum.id === id);
			if (achievementStatByMonth === undefined) {
				return {id};
			}
			return achievementStatByMonth;
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
		await bindFirestoreRef('list', achievementStatsByMonthRef);
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
