import {
	collection,
	doc,
	onSnapshot,
	type Unsubscribe,
} from 'firebase/firestore';
import db from '~/lib/db.js';
import type {SlackUser} from '~/types/store.js';

const usersRef = collection(db, 'users');
let unsubscribeList: Unsubscribe | null = null;
const dataUnsubscribes = new Map<string, Unsubscribe>();

export interface UsersState {
	isInitList: boolean | null;
	list: SlackUser[];
	isInitData: Record<string, boolean>;
}

interface State extends UsersState {
	[key: string]: unknown;
}

const localState = (): State => ({
	isInitList: null,
	list: [],
	isInitData: {},
});

const localMutations = {
	setList(state: State, list: SlackUser[]) {
		state.list = list;
		state.isInitList = import.meta.client;
	},
	setData(state: State, {id, data}: {id: string; data: SlackUser | null}) {
		state[`data_${id}`] = data;
		state.isInitData[id] = import.meta.client;
	},
};

const localGetters = {
	list: (state: State) => state.list,
	getById: (state: State) => (id: string) => {
		if (state[`data_${id}`] !== undefined) {
			return state[`data_${id}`] as SlackUser;
		}
		const user = state.list.find((datum) => datum.id === id);
		if (user === undefined) {
			return {id} as SlackUser;
		}
		return user;
	},
};

const localActions = {
	async initList({state, commit}: {state: State; commit: Function}) {
		if (state.isInitList) return;
		await new Promise<void>((resolve, reject) => {
			unsubscribeList?.();
			let resolved = false;
			unsubscribeList = onSnapshot(
				usersRef,
				(snapshot) => {
					commit(
						'setList',
						snapshot.docs.map((d) => ({...(d.data() as SlackUser), id: d.id})),
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
	async bindById(
		{
			state,
			commit,
			dispatch,
			getters,
		}: {
			state: State;
			commit: Function;
			dispatch: Function;
			getters: {getById: (id: string) => SlackUser};
		},
		id: string,
	) {
		const localUser = getters.getById(id);
		if (
			localUser !== undefined &&
			state.isInitData[localUser.id] === import.meta.client
		) {
			return;
		}

		await new Promise<void>((resolve, reject) => {
			dataUnsubscribes.get(id)?.();
			let resolved = false;
			const unsubscribe = onSnapshot(
				doc(usersRef, id),
				async (docSnap) => {
					if (docSnap.exists()) {
						commit('setData', {
							id: docSnap.id,
							data: {...(docSnap.data() as SlackUser), id: docSnap.id},
						});
						if (!resolved) {
							resolved = true;
							await dispatch('achievements/fetchByUser', docSnap.id, {
								root: true,
							});
							resolve();
						}
					} else {
						commit('setData', {id, data: null});
						if (!resolved) {
							resolved = true;
							resolve();
						}
					}
				},
				(error) => {
					if (!resolved) {
						resolved = true;
						reject(error);
					}
				},
			);
			dataUnsubscribes.set(id, unsubscribe);
		});
	},
};

export {
	localActions as actions,
	localGetters as getters,
	localMutations as mutations,
	localState as state,
};
