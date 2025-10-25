import {createStore} from 'vuex';
import {vuexfireMutations} from 'vuexfire';

// Import all store modules
import * as achievements from '~/store/achievements.js';
import * as achievementData from '~/store/achievementData.js';
import * as achievementStatsByCategory from '~/store/achievementStatsByCategory.js';
import * as achievementStatsByDifficulty from '~/store/achievementStatsByDifficulty.js';
import * as achievementStatsByMonth from '~/store/achievementStatsByMonth.js';
import * as slowQuizGames from '~/store/slowQuizGames.js';
import * as users from '~/store/users.js';
import * as oneiromancies from '~/store/oneiromancies.js';
import * as slackInfos from '~/store/slackInfos.js';

export default defineNuxtPlugin((nuxtApp) => {
	const store = createStore({
		mutations: {
			...vuexfireMutations,
		},
		modules: {
			achievements,
			achievementData,
			achievementStatsByCategory,
			achievementStatsByDifficulty,
			achievementStatsByMonth,
			slowQuizGames,
			users,
			oneiromancies,
			slackInfos,
		},
	});

	nuxtApp.vueApp.use(store);

	return {
		provide: {
			store,
		},
	};
});
