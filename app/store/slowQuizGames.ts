import {
	collection,
	onSnapshot,
	orderBy,
	query,
	type Unsubscribe,
	where,
} from 'firebase/firestore';
import db from '~/lib/db.js';
import type {SlowQuizGame} from '~/lib/slow-quiz.js';

const slowQuizGamesRef = collection(db, 'slow_quiz_games');
let unsubscribeList: Unsubscribe | null = null;

export interface SlowQuizGamesState {
	isInitList: boolean | null;
	list: Array<SlowQuizGame & {id: string}>;
}

const localState = (): SlowQuizGamesState => ({
	isInitList: null,
	list: [],
});

const localMutations = {
	setList(state: SlowQuizGamesState, list: Array<SlowQuizGame & {id: string}>) {
		state.list = list;
		state.isInitList = import.meta.client;
	},
};

const localGetters = {
	list: (state: SlowQuizGamesState) => state.list,
	getById: (state: SlowQuizGamesState) => (id: string) => {
		const game = state.list.find((datum) => datum.id === id);
		return game ?? ({id} as SlowQuizGame & {id: string});
	},
};

const localActions = {
	async initList({
		state,
		commit,
	}: {
		state: SlowQuizGamesState;
		commit: Function;
	}) {
		if (state.isInitList) return;
		await new Promise<void>((resolve, reject) => {
			unsubscribeList?.();
			let resolved = false;
			unsubscribeList = onSnapshot(
				query(
					slowQuizGamesRef,
					where('status', '==', 'finished'),
					orderBy('finishDate', 'desc'),
				),
				(snapshot) => {
					commit(
						'setList',
						snapshot.docs.map((d) => ({
							...(d.data() as SlowQuizGame),
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
