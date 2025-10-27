import {createStore} from 'vuex';
import {vuexfireMutations} from 'vuexfire';

// Import all store modules
import * as achievementData from '~/store/achievementData.js';
import * as achievementStatsByCategory from '~/store/achievementStatsByCategory.js';
import * as achievementStatsByDifficulty from '~/store/achievementStatsByDifficulty.js';
import * as achievementStatsByMonth from '~/store/achievementStatsByMonth.js';
import * as achievements from '~/store/achievements.js';
import * as oneiromancies from '~/store/oneiromancies.js';
import * as slackInfos from '~/store/slackInfos.js';
import * as slowQuizGames from '~/store/slowQuizGames.js';
import * as twentyQuestionsGames from '~/store/twentyQuestionsGames.js';
import * as users from '~/store/users.js';

export default defineNuxtPlugin((nuxtApp) => {
	const store = createStore({
		mutations: {
			...vuexfireMutations,
		},
		modules: {
			achievements: {
				namespaced: true,
				...achievements,
			},
			achievementData: {
				namespaced: true,
				...achievementData,
			},
			achievementStatsByCategory: {
				namespaced: true,
				...achievementStatsByCategory,
			},
			achievementStatsByDifficulty: {
				namespaced: true,
				...achievementStatsByDifficulty,
			},
			achievementStatsByMonth: {
				namespaced: true,
				...achievementStatsByMonth,
			},
			slowQuizGames: {
				namespaced: true,
				...slowQuizGames,
			},
			twentyQuestionsGames: {
				namespaced: true,
				...twentyQuestionsGames,
			},
			users: {
				namespaced: true,
				...users,
			},
			oneiromancies: {
				namespaced: true,
				...oneiromancies,
			},
			slackInfos: {
				namespaced: true,
				...slackInfos,
			},
		},
	});

	nuxtApp.vueApp.use(store);

	return {
		provide: {
			store,
		},
	};
});
