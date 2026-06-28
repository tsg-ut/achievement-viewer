import type {InjectionKey} from 'vue';
import {useStore as baseUseStore, createStore, type Store} from 'vuex';

import type {AchievementDataState} from '~/store/achievementData.js';
import * as achievementData from '~/store/achievementData.js';
import type {AchievementStatsByCategoryState} from '~/store/achievementStatsByCategory.js';
import * as achievementStatsByCategory from '~/store/achievementStatsByCategory.js';
import type {AchievementStatsByDifficultyState} from '~/store/achievementStatsByDifficulty.js';
import * as achievementStatsByDifficulty from '~/store/achievementStatsByDifficulty.js';
import type {AchievementStatsByMonthState} from '~/store/achievementStatsByMonth.js';
import * as achievementStatsByMonth from '~/store/achievementStatsByMonth.js';
import type {AchievementsState} from '~/store/achievements.js';
import * as achievements from '~/store/achievements.js';
import type {OneiromanciesState} from '~/store/oneiromancies.js';
import * as oneiromancies from '~/store/oneiromancies.js';
import type {SlackInfosState} from '~/store/slackInfos.js';
import * as slackInfos from '~/store/slackInfos.js';
import type {SlowQuizGamesState} from '~/store/slowQuizGames.js';
import * as slowQuizGames from '~/store/slowQuizGames.js';
import type {TahoiyaGamesState} from '~/store/tahoiyaGames.js';
import * as tahoiyaGames from '~/store/tahoiyaGames.js';
import type {TwentyQuestionsGamesState} from '~/store/twentyQuestionsGames.js';
import * as twentyQuestionsGames from '~/store/twentyQuestionsGames.js';
import type {UsersState} from '~/store/users.js';
import * as users from '~/store/users.js';
import type {Achievement, AchievementData, SlackUser} from '~/types/store.js';

export interface RootState {
	achievements: AchievementsState;
	achievementData: AchievementDataState;
	achievementStatsByCategory: AchievementStatsByCategoryState;
	achievementStatsByDifficulty: AchievementStatsByDifficultyState;
	achievementStatsByMonth: AchievementStatsByMonthState;
	slowQuizGames: SlowQuizGamesState;
	twentyQuestionsGames: TwentyQuestionsGamesState;
	tahoiyaGames: TahoiyaGamesState;
	users: UsersState;
	oneiromancies: OneiromanciesState;
	slackInfos: SlackInfosState;
}

export interface StoreGetters {
	'achievementData/getById': (id: string) => AchievementData | undefined;
	'achievementData/getByCategory': (category: string) => AchievementData[];
	'achievementData/getByCounter': (counter: string) => AchievementData[];
	'achievements/getByUser': (user: string) => Achievement[];
	'achievements/getByName': (name: string) => Achievement[];
	'slackInfos/getUser': (id: string) => SlackUser;
	'users/getById': (id: string) => SlackUser;
}

type TypedStore = Omit<Store<RootState>, 'getters'> & {
	readonly getters: StoreGetters;
};

export const storeKey: InjectionKey<TypedStore> = Symbol();

export function useStore(): TypedStore {
	return baseUseStore(storeKey);
}

export default defineNuxtPlugin((nuxtApp) => {
	const store = createStore<RootState>({
		modules: {
			achievements: {namespaced: true, ...achievements},
			achievementData: {namespaced: true, ...achievementData},
			achievementStatsByCategory: {
				namespaced: true,
				...achievementStatsByCategory,
			},
			achievementStatsByDifficulty: {
				namespaced: true,
				...achievementStatsByDifficulty,
			},
			achievementStatsByMonth: {namespaced: true, ...achievementStatsByMonth},
			slowQuizGames: {namespaced: true, ...slowQuizGames},
			twentyQuestionsGames: {namespaced: true, ...twentyQuestionsGames},
			tahoiyaGames: {namespaced: true, ...tahoiyaGames},
			users: {namespaced: true, ...users},
			oneiromancies: {namespaced: true, ...oneiromancies},
			slackInfos: {namespaced: true, ...slackInfos},
		},
	});

	nuxtApp.vueApp.use(store, storeKey);

	return {
		provide: {
			store,
		},
	};
});
