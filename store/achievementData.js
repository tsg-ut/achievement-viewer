import {firestoreAction} from 'vuexfire';
import db from '~/lib/db.js';

const achievementDataRef = db.collection('achievement_data');

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
			const achievementDatum = state.list.find((datum) => datum.id === id);
			if (achievementDatum === undefined) {
				return {id};
			}
			return achievementDatum;
		}
	),
	getByCounter: (state) => (
		(counter) => state.list.filter((datum) => datum.counter === counter).sort((a, b) => a.value - b.value)
	),
	getByCategory: (state) => (
		(category) => state.list.filter((datum) => datum.category === category).sort((a, b) => (b.count || 0) - (a.count || 0))
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
		await bindFirestoreRef('list', achievementDataRef);
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
