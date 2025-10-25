import {firestoreAction} from 'vuexfire';
import db from '~/lib/db.js';

const usersRef = db.collection('users');
const achievementsRef = db.collection('achievements');

const localState = () => ({
	isInitList: null,
	list: [],
	isInitData: {},
	data: {},
});

const localMutations = {
	initList(state) {
		state.isInitList = process.client;
	},
	initData(state, id) {
		state.isInitData[id] = process.client;
	},
};

const localGetters = {
	list: (state) => state.list,
	data: (state) => state.data,
	getById: (state) => (
		(id) => {
			if (state[`data_${id}`] !== undefined) {
				return state[`data_${id}`];
			}
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
		await bindFirestoreRef('list', usersRef);
		commit('initList');
	}),
	bindById: firestoreAction(async ({bindFirestoreRef, state, dispatch, getters, commit}, id) => {
		const localCharacter = getters.getById(id);
		if (localCharacter !== undefined && state.isInitData[localCharacter.id] === process.client) {
			return;
		}

		const user = await usersRef.doc(id).get();
		if (user.exists) {
			const userBindPromise = bindFirestoreRef(`data_${user.id}`, user.ref);
			commit('initData', user.id);

			await Promise.all([
				userBindPromise,
				dispatch('achievements/fetchByUser', user.id, {root: true}),
			]);
		}
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
