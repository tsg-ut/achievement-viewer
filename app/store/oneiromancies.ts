import {
	collection,
	onSnapshot,
	orderBy,
	query,
	type Unsubscribe,
} from 'firebase/firestore';
import db from '~/lib/db.js';
import type {OneiromancyCriterion, OneiromancyMessage} from '~/types/store.js';

const oneiromancyMessagesRef = collection(db, 'oneiromancy_messages');
const oneiromancyCriteriaRef = collection(db, 'oneiromancy_criteria');
let unsubscribeMessages: Unsubscribe | null = null;
let unsubscribeCriteria: Unsubscribe | null = null;

export interface OneiromanciesState {
	isInitOneiromancyMessages: boolean | null;
	oneiromancyMessages: OneiromancyMessage[];
	isInitOneiromancyCriteria: boolean | null;
	oneiromancyCriteria: OneiromancyCriterion[];
}

const localState = (): OneiromanciesState => ({
	isInitOneiromancyMessages: null,
	oneiromancyMessages: [],
	isInitOneiromancyCriteria: null,
	oneiromancyCriteria: [],
});

const localMutations = {
	setOneiromancyMessages(
		state: OneiromanciesState,
		list: OneiromancyMessage[],
	) {
		state.oneiromancyMessages = list;
		state.isInitOneiromancyMessages = import.meta.client;
	},
	setOneiromancyCriteria(
		state: OneiromanciesState,
		list: OneiromancyCriterion[],
	) {
		state.oneiromancyCriteria = list;
		state.isInitOneiromancyCriteria = import.meta.client;
	},
};

const localGetters = {
	oneiromancyMessages: (state: OneiromanciesState) => state.oneiromancyMessages,
	oneiromancyCriteria: (state: OneiromanciesState) => state.oneiromancyCriteria,
};

const localActions = {
	async initOneiromancyMessages({
		state,
		commit,
	}: {
		state: OneiromanciesState;
		commit: Function;
	}) {
		if (state.isInitOneiromancyMessages) return;
		await new Promise<void>((resolve, reject) => {
			unsubscribeMessages?.();
			let resolved = false;
			unsubscribeMessages = onSnapshot(
				query(oneiromancyMessagesRef, orderBy('message.ts', 'desc')),
				(snapshot) => {
					commit(
						'setOneiromancyMessages',
						snapshot.docs.map((d) => ({
							...(d.data() as OneiromancyMessage),
							id: d.id,
						})),
					);
					if (!resolved) {
						resolved = true;
						resolve();
					}
				},
				(error) => {
					if (!resolved) {
						resolved = true;
						reject(error);
					}
				},
			);
		});
	},
	async initOneiromancyCriteria({
		state,
		commit,
	}: {
		state: OneiromanciesState;
		commit: Function;
	}) {
		if (state.isInitOneiromancyCriteria) return;
		await new Promise<void>((resolve, reject) => {
			unsubscribeCriteria?.();
			let resolved = false;
			unsubscribeCriteria = onSnapshot(
				query(oneiromancyCriteriaRef, orderBy('point', 'desc')),
				(snapshot) => {
					commit(
						'setOneiromancyCriteria',
						snapshot.docs.map((d) => ({
							...(d.data() as OneiromancyCriterion),
							id: d.id,
						})),
					);
					if (!resolved) {
						resolved = true;
						resolve();
					}
				},
				(error) => {
					if (!resolved) {
						resolved = true;
						reject(error);
					}
				},
			);
		});
	},
};

export {
	localActions as actions,
	localGetters as getters,
	localMutations as mutations,
	localState as state,
};
