import {
	collection,
	doc,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	type Unsubscribe,
	where,
} from 'firebase/firestore';
import db from '~/lib/db.js';
import type {Achievement} from '~/types/store.js';

const achievementsRef = collection(db, 'achievements');
let unsubscribeList: Unsubscribe | null = null;
let unsubscribeLatest: Unsubscribe | null = null;
const dataUnsubscribes = new Map<string, Unsubscribe>();

interface State {
	isInitList: boolean | null;
	list: Achievement[];
	isInitLatestAchievemnts: boolean | null;
	latestAchievements: Achievement[];
	isInitUsers: Record<string, boolean>;
	isInitNames: Record<string, boolean>;
	isInitData: Record<string, boolean>;
	[key: string]: unknown;
}

const localState = (): State => ({
	isInitList: null,
	list: [],
	isInitLatestAchievemnts: null,
	latestAchievements: [],
	isInitUsers: {},
	isInitNames: {},
	isInitData: {},
});

const localMutations = {
	setList(state: State, list: Achievement[]) {
		state.list = list;
		state.isInitList = import.meta.client;
	},
	setLatestAchievements(state: State, list: Achievement[]) {
		state.latestAchievements = list;
		state.isInitLatestAchievemnts = import.meta.client;
	},
	setData(state: State, {id, data}: {id: string; data: unknown}) {
		state[`data_${id}`] = data;
		state.isInitData[id] = import.meta.client;
	},
	setUser(
		state: State,
		{id, achievements}: {id: string; achievements: Achievement[]},
	) {
		state.isInitUsers[id] = import.meta.client;
		state[`user_${id}`] = achievements;
	},
	setName(
		state: State,
		{name, achievements}: {name: string; achievements: Achievement[]},
	) {
		state.isInitNames[name] = import.meta.client;
		state[`name_${name}`] = achievements;
	},
};

const localGetters = {
	list: (state: State) => state.list,
	initLatestAchievements: (state: State) => state.latestAchievements,
	data: (state: State) => state.data,
	getByUser: (state: State) => (user: string) => {
		if (state.isInitList) {
			return (state.list as Achievement[]).filter(
				(datum) => datum.user === user,
			);
		}
		return (state[`user_${user}`] as Achievement[]) || [];
	},
	getByName: (state: State) => (name: string) => {
		if (state.isInitList) {
			return (state.list as Achievement[]).filter(
				(datum) => datum.name === name,
			);
		}
		return (state[`name_${name}`] as Achievement[]) || [];
	},
};

const localActions = {
	async initList({state, commit}: {state: State; commit: Function}) {
		if (state.isInitList) return;
		await new Promise<void>((resolve, reject) => {
			unsubscribeList?.();
			let resolved = false;
			unsubscribeList = onSnapshot(
				achievementsRef,
				(snapshot) => {
					commit(
						'setList',
						snapshot.docs.map((d) => ({
							...(d.data() as Achievement),
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
	async initLatestAchievements({
		state,
		commit,
	}: {
		state: State;
		commit: Function;
	}) {
		if (state.isInitLatestAchievemnts) return;
		await new Promise<void>((resolve, reject) => {
			unsubscribeLatest?.();
			let resolved = false;
			unsubscribeLatest = onSnapshot(
				query(achievementsRef, orderBy('date', 'desc'), limit(15)),
				(snapshot) => {
					commit(
						'setLatestAchievements',
						snapshot.docs.map((d) => ({
							...(d.data() as Achievement),
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
	async bind({state, commit}: {state: State; commit: Function}, id: string) {
		if (
			state.isInitData[id] === import.meta.client ||
			state.isInitList === import.meta.client
		) {
			return;
		}
		await new Promise<void>((resolve, reject) => {
			dataUnsubscribes.get(id)?.();
			let resolved = false;
			const unsubscribe = onSnapshot(
				doc(achievementsRef, id),
				(docSnap) => {
					commit('setData', {
						id,
						data: docSnap.exists()
							? {...(docSnap.data() as Achievement), id: docSnap.id}
							: null,
					});
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
			dataUnsubscribes.set(id, unsubscribe);
		});
	},
	async fetchByUser(
		{state, commit}: {state: State; commit: Function},
		id: string,
	) {
		if (
			state.isInitUsers[id] === import.meta.client ||
			state.isInitList === import.meta.client
		) {
			return;
		}
		const snapshot = await getDocs(
			query(achievementsRef, where('user', '==', id)),
		);
		commit({
			type: 'setUser',
			id,
			achievements: snapshot.docs.map((d) => d.data()),
		});
	},
	async fetchByName(
		{state, commit}: {state: State; commit: Function},
		name: string,
	) {
		if (
			state.isInitNames[name] === import.meta.client ||
			state.isInitList === import.meta.client
		) {
			return;
		}
		const snapshot = await getDocs(
			query(achievementsRef, where('name', '==', name)),
		);
		commit({
			type: 'setName',
			name,
			achievements: snapshot.docs.map((d) => d.data()),
		});
	},
};

export {
	localActions as actions,
	localGetters as getters,
	localMutations as mutations,
	localState as state,
};
