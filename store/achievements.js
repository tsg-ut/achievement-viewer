import Vue from 'vue';
import {firestoreAction} from 'vuexfire';
import db from '~/components/utils/db.js';

const achievementsRef = db.collection('achievements');

const localState = () => ({
	isInitList: null,
	list: [],
	isInitLatestAchievemnts: null,
	latestAchievements: [],
	isInitUsers: {},
	isInitData: {},
});

const localMutations = {
	initList(state) {
		state.isInitList = process.browser;
	},
	initLatestAchievements(state) {
		state.isInitLatestAchievemnts = process.browser;
	},
	initData(state, id) {
		Vue.set(state.isInitData, id, process.browser);
	},
	setUser(state, {id, achievements}) {
		Vue.set(state.isInitUsers, id, process.browser);
		Vue.set(state, `user_${id}`, achievements);
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
		if (state.isInitData[id] === process.browser || state.isInitList === process.browser) {
			return;
		}

		const docRef = achievementsRef.doc(id);
		await bindFirestoreRef(`data_${id}`, docRef);
		commit('initData', id);
	}),
	fetchByUser: async ({state, commit}, id) => {
		if (state.isInitUsers[id] === process.browser || state.isInitList === process.browser) {
			return;
		}

		const achievements = await achievementsRef.where('user', '==', id).get();
		commit({
			type: 'setUser',
			id,
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
