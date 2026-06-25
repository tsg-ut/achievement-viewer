import {
	collection,
	onSnapshot,
	orderBy,
	query,
	type Unsubscribe,
} from 'firebase/firestore';
import db from '~/lib/db.js';
import type {TwentyQuestionsGame} from '~/types/store.js';

const twentyQuestionsGamesRef = collection(db, 'twenty_questions_games');
let unsubscribeList: Unsubscribe | null = null;

export interface TwentyQuestionsGamesState {
	isInitList: boolean | null;
	list: TwentyQuestionsGame[];
}

const localState = (): TwentyQuestionsGamesState => ({
	isInitList: null,
	list: [],
});

const localMutations = {
	setList(state: TwentyQuestionsGamesState, list: TwentyQuestionsGame[]) {
		state.list = list;
		state.isInitList = import.meta.client;
	},
};

const localGetters = {
	list: (state: TwentyQuestionsGamesState) => state.list,
};

const localActions = {
	async initList({
		state,
		commit,
	}: {
		state: TwentyQuestionsGamesState;
		commit: Function;
	}) {
		if (state.isInitList) return;
		await new Promise<void>((resolve, reject) => {
			unsubscribeList?.();
			let resolved = false;
			unsubscribeList = onSnapshot(
				query(twentyQuestionsGamesRef, orderBy('finishedAt', 'desc')),
				(snapshot) => {
					commit(
						'setList',
						snapshot.docs.map((d) => ({
							...(d.data() as TwentyQuestionsGame),
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
