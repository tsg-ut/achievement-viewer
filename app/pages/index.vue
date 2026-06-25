<template>
	<div class="container content">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">
			15%
		</progress>
		<unauthorized-notification />

		<h2>最近のアクティビティ</h2>
		<table class="table">
			<thead>
				<tr>
					<th>日時</th>
					<th>アクティビティ</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="achievement in latestAchievements"
					:key="achievement.date.toString()"
				>
					<td>{{ getDateStringJa(achievement.date) }}</td>
					<td>
						<nuxt-link :to="`/users/${achievement.user}`">
							<img
								class="index-icon"
								:src="getUserIcon(getUser(achievement.user))"
								:srcset="`${getUserIcon(getUser(achievement.user))} 1x, ${getUserIcon2x(getUser(achievement.user))} 2x`"
							>
							{{ getUserName(getUser(achievement.user)) }}
						</nuxt-link>
						が
						<nuxt-link :to="`/achievements/${achievement.name}`">
							<strong>{{ getAchievement(achievement.name).title }}</strong>
							<DifficultyBadge
								:difficulty="getAchievement(achievement.name).difficulty"
							/>
						</nuxt-link>
						を解除しました。
					</td>
				</tr>
			</tbody>
		</table>
		<h2>統計情報</h2>
		<div class="columns is-multiline block">
			<div class="column is-half">
				<PieChartStat id="doughnut-chart" :chart-data="statsByDifficulty" />
			</div>
			<div class="column is-half">
				<PieChartStat :chart-data="statsByCategory" />
			</div>
			<div class="column is-full">
				<TimeSeriesStat :chart-data="statsByMonth" />
			</div>
		</div>
		<h2>ユーザー一覧</h2>
		<table class="table">
			<thead>
				<tr>
					<th>名前</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user.id">
					<td>
						<nuxt-link :to="`/users/${user.id}`">
							<img
								class="index-icon"
								:src="getUserIcon(getUser(user.id))"
								:srcset="`${getUserIcon(getUser(user.id))} 1x, ${getUserIcon2x(getUser(user.id))} 2x`"
							>
							{{ getUserName(getUser(user.id)) }}
						</nuxt-link>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {getCategoryColor} from '@/lib/utils.js';
import type {AchievementData, SlackUser} from '@/types/store.js';
import {useStore} from '~/plugins/vuex.js';

useHead({title: 'achievement-viewer'});

const store = useStore();
const isLoading = ref(true);

const users = computed(() => store.state.users.list);
const achievementData = computed(() => store.state.achievementData.list);
const achievementStatsByDifficulty = computed(
	() => store.state.achievementStatsByDifficulty.list,
);
const achievementStatsByCategory = computed(
	() => store.state.achievementStatsByCategory.list,
);
const achievementStatsByMonth = computed(
	() => store.state.achievementStatsByMonth.list,
);
const latestAchievements = computed(
	() => store.state.achievements.latestAchievements,
);
const getUser = computed(() => store.getters['slackInfos/getUser']);

const statsByDifficulty = computed(() => {
	const labels = ['baby', 'easy', 'medium', 'hard', 'professional'];
	return {
		datasets: [
			{
				data: labels.map((label) => {
					const stat = achievementStatsByDifficulty.value.find(
						(s) => s.id === label,
					);
					return stat ? stat.count : 0;
				}),
				backgroundColor: [
					'whitesmoke',
					'#48c774',
					'#3273dc',
					'#ffdd57',
					'#f14668',
				],
			},
		],
		labels,
	};
});

const statsByCategory = computed(() => ({
	datasets: [
		{
			data: achievementStatsByCategory.value.map((stat) => stat.count),
			backgroundColor: achievementStatsByCategory.value.map((stat) =>
				getCategoryColor(stat.id),
			),
		},
	],
	labels: achievementStatsByCategory.value.map((stat) => stat.id),
}));

const statsByMonth = computed(() => ({
	datasets: [
		{
			label: '実績解除数',
			data: achievementStatsByMonth.value.map((stat) => stat.count),
			backgroundColor: '#3273dc',
		},
	],
	labels: achievementStatsByMonth.value.map((stat) => stat.id),
}));

function getUserName(user: SlackUser | undefined) {
	const name = user?.profile?.display_name || user?.real_name || '匿名ユーザー';
	return `@${name}`;
}

function getUserIcon(user: SlackUser | undefined) {
	return user?.profile?.image_24 ?? '/images/anonymous-icon_24.png';
}

function getUserIcon2x(user: SlackUser | undefined) {
	return user?.profile?.image_48 ?? '/images/anonymous-icon_48.png';
}

function getAchievement(id: string): AchievementData {
	return (
		achievementData.value.find((datum) => datum.id === id) ?? {
			id,
			title: '---',
			difficulty: 'baby',
			condition: '',
			category: '',
			counter: null,
			value: 0,
		}
	);
}

function getDateStringJa(date: {seconds: number}) {
	const d = new Date(date.seconds * 1000);
	const h = d.getHours().toString().padStart(2, '0');
	const m = d.getMinutes().toString().padStart(2, '0');
	return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${h}:${m}`;
}

onMounted(async () => {
	await Promise.all([
		store.dispatch('users/initList'),
		store.dispatch('slackInfos/initUsers'),
		store.dispatch('achievements/initLatestAchievements'),
		store.dispatch('achievementData/initList'),
		store.dispatch('achievementStatsByDifficulty/initList'),
		store.dispatch('achievementStatsByCategory/initList'),
		store.dispatch('achievementStatsByMonth/initList'),
	]);
	isLoading.value = false;
});
</script>

<style>
.index-icon {
	vertical-align: bottom;
}
</style>
