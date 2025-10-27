import {firestoreAction} from 'vuexfire';
import db from '~/lib/db.js';

const achievementsRef = db.collection('achievements');

const localState = () => ({
	isInitList: null,
	list: [],
	isInitLatestAchievemnts: null,
	latestAchievements: [],
	isInitUsers: {},
	isInitNames: {},
	isInitData: {},
});

const localMutations = {
	initList(state) {
		state.isInitList = process.client;
	},
	initLatestAchievements(state) {
		state.isInitLatestAchievemnts = process.client;
	},
	initData(state, id) {
		state.isInitData[id] = process.client;
	},
	setUser(state, {id, achievements}) {
		state.isInitUsers[id] = process.client;
		state[`user_${id}`] = achievements;
	},
	setName(state, {name, achievements}) {
		state.isInitNames[name] = process.client;
		state[`name_${name}`] = achievements;
	},
};

const localGetters = {
	list: (state) => state.list,
	initLatestAchievements: (state) => state.latestAchievements,
	data: (state) => state.data,
	getByUser: (state) => (
		(user) => {
			if (state.isInitList) {
				return state.list.filter((datum) => (
					datum.user === user
				));
			}
			return state[`user_${user}`] || [];
		}
	),
	getByName: (state) => (
		(name) => {
			if (state.isInitList) {
				return state.list.filter((datum) => (
					datum.name === name
				));
			}
			return state[`name_${name}`] || [];
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
	async initLatestAchievements({state, dispatch, commit}) {
		if (!state.isInitLatestAchievemnts) {
			await dispatch('bindLatestAchievements');
			commit('initLatestAchievements');
		}
	},
	bindLatestAchievements: firestoreAction(async ({bindFirestoreRef}) => {
		await bindFirestoreRef('latestAchievements', achievementsRef.orderBy('date', 'desc').limit(15));
	}),
	bind: firestoreAction(async ({bindFirestoreRef, state, commit}, id) => {
		if (state.isInitData[id] === process.client || state.isInitList === process.client) {
			return;
		}

		const docRef = achievementsRef.doc(id);
		await bindFirestoreRef(`data_${id}`, docRef);
		commit('initData', id);
	}),
	fetchByUser: async ({state, commit}, id) => {
		if (state.isInitUsers[id] === process.client || state.isInitList === process.client) {
			return;
		}

		const achievements = await achievementsRef.where('user', '==', id).get();
		commit({
			type: 'setUser',
			id,
			achievements: achievements.docs.map((doc) => doc.data()),
		});
	},
	fetchByName: async ({state, commit}, name) => {
		if (state.isInitNames[name] === process.client || state.isInitList === process.client) {
			return;
		}

		const achievements = await achievementsRef.where('name', '==', name).get();
		commit({
			type: 'setName',
			name,
			achievements: achievements.docs.map((doc) => doc.data()),
		});
	},
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
