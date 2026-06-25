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

interface State {
	isInitList: boolean | null;
	list: TwentyQuestionsGame[];
}

const localState = (): State => ({
	isInitList: null,
	list: [],
});

const localMutations = {
	setList(state: State, list: TwentyQuestionsGame[]) {
		state.list = list;
		state.isInitList = import.meta.client;
	},
};

const localGetters = {
	list: (state: State) => state.list,
	getById: (state: State) => (id: string) => {
		const game = state.list.find((datum) => datum.id === id);
		return game ?? ({id} as TwentyQuestionsGame);
	},
};

const localActions = {
	async initList({state, commit}: {state: State; commit: Function}) {
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
