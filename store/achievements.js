import db from '~/components/utils/db.js';
import {firestoreAction} from 'vuexfire';

const achievementsRef = db.collection('achievements');

const localState = () => ({
	isInitList: null,
	list: [],
	isInitData: {},
	data: {},
});

const localMutations = {
	initList(state) {
		state.isInitList = process.browser;
	},
	initData(state, id) {
		state.isInitData[id] = process.browser;
	},
};

const localGetters = {
	list: (state) => state.list,
	data: (state) => state.data,
	getByUser: (state) => (
		(user) => (
			[...state.list, ...Object.values(state.data)].filter((datum) => (
				datum.user === user
			))
		)
	),
};

const localActions = {
	async initList({state, dispatch, commit}) {
		if (!state.isInitList) {
			await dispatch('bindList');
			commit('initList');
		}
	},
	bindList: firestoreAction(async ({bindFirestoreRef, commit}) => {
		await bindFirestoreRef('list', achievementsRef);
		commit('initList');
	}),
	bind: firestoreAction(async ({bindFirestoreRef, state, commit}, id) => {
		if (state.isInitData[id] === process.browser || state.isInitList === process.browser) {
			return;
		}

		const docRef = achievementsRef.doc(id);
		commit('initData', id);
		await bindFirestoreRef(`data.${id}`, docRef);
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
