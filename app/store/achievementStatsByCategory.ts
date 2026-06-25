import {collection, onSnapshot, type Unsubscribe} from 'firebase/firestore';
import db from '~/lib/db.js';
import type {AchievementStat} from '~/types/store.js';

const achievementStatsByCategoryRef = collection(
	db,
	'achievement_stats_by_category',
);
let unsubscribeList: Unsubscribe | null = null;

export interface AchievementStatsByCategoryState {
	isInitList: boolean | null;
	list: AchievementStat[];
}

const localState = (): AchievementStatsByCategoryState => ({
	isInitList: null,
	list: [],
});

const localMutations = {
	setList(state: AchievementStatsByCategoryState, list: AchievementStat[]) {
		state.list = list;
		state.isInitList = import.meta.client;
	},
};

const localGetters = {
	list: (state: AchievementStatsByCategoryState) => state.list,
};

const localActions = {
	async initList({
		state,
		commit,
	}: {
		state: AchievementStatsByCategoryState;
		commit: Function;
	}) {
		if (state.isInitList) return;
		await new Promise<void>((resolve, reject) => {
			unsubscribeList?.();
			let resolved = false;
			unsubscribeList = onSnapshot(
				achievementStatsByCategoryRef,
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
