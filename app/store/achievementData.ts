import {collection, onSnapshot, type Unsubscribe} from 'firebase/firestore';
import db from '~/lib/db.js';
import type {AchievementData} from '~/types/store.js';

const achievementDataRef = collection(db, 'achievement_data');
let unsubscribeList: Unsubscribe | null = null;

export interface AchievementDataState {
	isInitList: boolean | null;
	list: AchievementData[];
}

const localState = (): AchievementDataState => ({
	isInitList: null,
	list: [],
});

const localMutations = {
	setList(state: AchievementDataState, list: AchievementData[]) {
		state.list = list;
		state.isInitList = import.meta.client;
	},
};

const localGetters = {
	list: (state: AchievementDataState) => state.list,
	getById: (state: AchievementDataState) => (id: string) =>
		state.list.find((d) => d.id === id),
	getByCounter: (state: AchievementDataState) => (counter: string) =>
		state.list
			.filter((datum) => datum.counter === counter)
			.sort((a, b) => a.value - b.value),
	getByCategory: (state: AchievementDataState) => (category: string) =>
		state.list
			.filter((datum) => datum.category === category)
			.sort((a, b) => (b.count ?? 0) - (a.count ?? 0)),
};

const localActions = {
	async initList({
		state,
		commit,
	}: {
		state: AchievementDataState;
		commit: Function;
	}) {
		if (state.isInitList) return;
		await new Promise<void>((resolve, reject) => {
			unsubscribeList?.();
			let resolved = false;
			unsubscribeList = onSnapshot(
				achievementDataRef,
				(snapshot) => {
					commit(
						'setList',
						snapshot.docs.map((d) => ({
							...(d.data() as AchievementData),
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
