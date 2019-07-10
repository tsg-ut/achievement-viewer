import db from '~/components/utils/db.js';
import {firestoreAction} from 'vuexfire';

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
		state.isInitList = process.browser;
	},
	initData(state, id) {
		state.isInitData[id] = process.browser;
	},
};

const localGetters = {
	list: (state) => state.list,
	data: (state) => state.data,
	getById: (state) => (
		(id) => {
			if (state.data[id] !== undefined) {
				return state.data[id];
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
		if (state.isInitList !== process.browser) {
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
		if (localCharacter !== undefined && state.isInitData[localCharacter.id] === process.browser) {
			return;
		}

		const user = await usersRef.doc(id).get();
		if (user.exists) {
			const characterBindPromise = bindFirestoreRef(`data.${user.id}`, user.ref);
			commit('initData', user.id);

			/*
			const achievements = await achievementsRef.where('user', '==', user.id).get();
			await Promise.all([
				characterBindPromise,
				...couplings.docs.map((coupling) => (
					dispatch('couplings/bind', coupling.id, {root: true})
				)),
			]);
			*/
		}
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
