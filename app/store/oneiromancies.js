import {firestoreAction} from 'vuexfire';
import db from '~/lib/db.js';

const oneiromancyMessagesRef = db.collection('oneiromancy_messages');
const oneiromancyCriteriaRef = db.collection('oneiromancy_criteria');

const localState = () => ({
	isInitOneiromancyMessages: null,
	oneiromancyMessages: [],
	isInitOneiromancyCriteria: null,
	oneiromancyCriteria: [],
});

const localMutations = {
	initOneiromancyMessages(state) {
		state.isInitOneiromancyMessages = process.client;
	},
	initOneiromancyCriteria(state) {
		state.isInitOneiromancyCriteria = process.client;
	},
};

const localGetters = {
	oneiromancyMessages: (state) => state.oneiromancyMessages,
	oneiromancyCriteria: (state) => state.oneiromancyCriteria,
};

const localActions = {
	async initOneiromancyMessages({state, dispatch, commit}) {
		if (state.isInitOneiromancyMessages !== process.client) {
			await dispatch('bindOneiromancyMessages');
			commit('initOneiromancyMessages');
		}
	},
	bindOneiromancyMessages: firestoreAction(async ({bindFirestoreRef, commit}) => {
		await bindFirestoreRef('oneiromancyMessages', oneiromancyMessagesRef.orderBy('message.ts', 'desc'));
		commit('initOneiromancyMessages');
	}),
	async initOneiromancyCriteria({state, dispatch, commit}) {
		if (state.isInitOneiromancyCriteria !== process.client) {
			await dispatch('bindOneiromancyCriteria');
			commit('initOneiromancyCriteria');
		}
	},
	bindOneiromancyCriteria: firestoreAction(async ({bindFirestoreRef, commit}) => {
		await bindFirestoreRef('oneiromancyCriteria', oneiromancyCriteriaRef.orderBy('point', 'desc'));
		commit('initOneiromancyCriteria');
	}),
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};
