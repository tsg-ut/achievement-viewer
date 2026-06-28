import {
	collection,
	onSnapshot,
	orderBy,
	query,
	type Unsubscribe,
} from 'firebase/firestore';
import db from '~/lib/db.js';
import type {TahoiyaGame} from '~/types/store.js';

const tahoiyaGamesRef = collection(db, 'tahoiya_games');
let unsubscribeList: Unsubscribe | null = null;

export interface TahoiyaGamesState {
	isInitList: boolean | null;
	list: TahoiyaGame[];
}

const localState = (): TahoiyaGamesState => ({
	isInitList: null,
	list: [],
});

const localMutations = {
	setList(state: TahoiyaGamesState, list: TahoiyaGame[]) {
		state.list = list;
		state.isInitList = import.meta.client;
	},
};

const localGetters = {
	list: (state: TahoiyaGamesState) => state.list,
};

const localActions = {
	async initList({
		state,
		commit,
	}: {
		state: TahoiyaGamesState;
		commit: Function;
	}) {
		if (state.isInitList) return;
		await new Promise<void>((resolve, reject) => {
			unsubscribeList?.();
			let resolved = false;
			unsubscribeList = onSnapshot(
				query(tahoiyaGamesRef, orderBy('timestamp', 'desc')),
				(snapshot) => {
					commit(
						'setList',
						snapshot.docs.map((d) => ({
							...(d.data() as TahoiyaGame),
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
