import Vue from 'vue';
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
		Vue.set(state.isInitData, id, process.browser);
	},
};

const localGetters = {
	list: (state) => state.list,
	data: (state) => state.data,
	getByUser: (state) => (
		(user) => {
			const list = state.isInitList ? state.list : Object.entries(state).filter(([key]) => key.startsWith('data_')).map(([, value]) => value);
			return list.filter((datum) => (
				datum.user === user
			));
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
		await bindFirestoreRef('list', achievementsRef);
	}),
	bind: firestoreAction(async ({bindFirestoreRef, state, commit}, id) => {
		if (state.isInitData[id] === process.browser || state.isInitList === process.browser) {
			return;
		}

		const docRef = achievementsRef.doc(id);
		await bindFirestoreRef(`data_${id}`, docRef);
		commit('initData', id);
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
