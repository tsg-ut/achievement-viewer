import {collection, onSnapshot, type Unsubscribe} from 'firebase/firestore';
import db from '~/lib/db.js';
import type {AchievementStat} from '~/types/store.js';

const achievementStatsByMonthRef = collection(db, 'achievement_stats_by_month');
let unsubscribeList: Unsubscribe | null = null;

interface State {
	isInitList: boolean | null;
	list: AchievementStat[];
}

const localState = (): State => ({
	isInitList: null,
	list: [],
});

const localMutations = {
	setList(state: State, list: AchievementStat[]) {
		state.list = list;
		state.isInitList = import.meta.client;
	},
};

const localGetters = {
	list: (state: State) => state.list,
	getById: (state: State) => (id: string) => {
		const datum = state.list.find((d) => d.id === id);
		return datum ?? ({id} as AchievementStat);
	},
};

const localActions = {
	async initList({state, commit}: {state: State; commit: Function}) {
		if (state.isInitList) return;
		await new Promise<void>((resolve, reject) => {
			unsubscribeList?.();
			let resolved = false;
			unsubscribeList = onSnapshot(
				achievementStatsByMonthRef,
				(snapshot) => {
					commit(
						'setList',
						snapshot.docs.map((d) => ({
							...(d.data() as AchievementStat),
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
