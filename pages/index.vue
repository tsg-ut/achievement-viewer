<template>
	<div class="container content">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">15%</progress>
		<unauthorized-notification/>

		<h2>最近のアクティビティ</h2>
		<table class="table">
			<thead>
				<tr>
					<th>日時</th>
					<th>アクティビティ</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="achievement in latestAchievements" :key="achievement.date.toString()">
					<td>{{getDateStringJa(achievement.date)}}</td>
					<td>
						<nuxt-link :to="`/users/${achievement.user}`">
							<img class="index-icon" :src="getUserIcon(getUser(achievement.user))" :srcset="`${getUserIcon(getUser(achievement.user))} 1x, ${getUserIcon2x(getUser(achievement.user))} 2x`">
							{{getUserName(getUser(achievement.user))}}
						</nuxt-link>
						が
						<nuxt-link :to="`/achievements/${achievement.name}`">
							<strong>{{getAchievement(achievement.name).title}}</strong>
							<DifficultyBadge :difficulty="getAchievement(achievement.name).difficulty"/>
						</nuxt-link>
						を解除しました。
					</td>
				</tr>
			</tbody>
		</table>
		<h2>統計情報</h2>
		<div class="columns is-multiline block">
			<div class="column is-half">
				<PieChartStat :chart-data="statsByDifficulty"/>
			</div>
			<div class="column is-half">
				<PieChartStat :chart-data="statsByCategory"/>
			</div>
			<div class="column is-full">
				<TimeSeriesStat :chart-data="statsByMonth"/>
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
							<img class="index-icon" :src="getUserIcon(getUser(user.id))" :srcset="`${getUserIcon(getUser(user.id))} 1x, ${getUserIcon2x(getUser(user.id))} 2x`">
							{{getUserName(getUser(user.id))}}
						</nuxt-link>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import get from 'lodash/get.js';
import {mapGetters, mapState} from 'vuex';

import UnauthorizedNotification from '../components/UnauthorizedNotification.vue';
import {getCategoryColor} from '@/lib/utils.js';

export default {
	components: {UnauthorizedNotification},
	data() {
		return {
			online: true,
			isLoading: true,
			datacollection: null,
		};
	},
	computed: {
		...mapState({
			users: (state) => state.users.list,
			achievementData: (state) => state.achievementData.list,
			achievementStatsByDifficulty: (state) => state.achievementStatsByDifficulty.list,
			achievementStatsByCategory: (state) => state.achievementStatsByCategory.list,
			achievementStatsByMonth: (state) => state.achievementStatsByMonth.list,
			latestAchievements: (state) => state.achievements.latestAchievements,
		}),
		...mapGetters('slackInfos', ['getUser']),
		statsByDifficulty() {
			const labels = ['baby', 'easy', 'medium', 'hard', 'professional'];
			return {
				datasets: [{
					data: labels.map((label) => {
						const stat = this.achievementStatsByDifficulty.find((stat) => stat.id === label);
						if (stat) {
							return stat.count;
						}
						return 0;
					}),
					backgroundColor: ['whitesmoke', '#48c774', '#3273dc', '#ffdd57', '#f14668'],
				}],
				labels,
			};
		},
		statsByCategory() {
			return {
				datasets: [{
					data: this.achievementStatsByCategory.map((stat) => stat.count),
					backgroundColor: this.achievementStatsByCategory.map((stat) => getCategoryColor(stat.id)),
				}],
				labels: this.achievementStatsByCategory.map((stat) => stat.id),
			};
		},
		statsByMonth() {
			return {
				datasets: [{
					label: '実績解除数',
					data: this.achievementStatsByMonth.map((stat) => stat.count),
					backgroundColor: '#3273dc',
				}],
				labels: this.achievementStatsByMonth.map((stat) => stat.id),
			};
		},
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('users/bindList');
			await store.dispatch('slackInfos/init');
			await store.dispatch('achievements/bindLatestAchievements');
			await store.dispatch('achievementsData/bindList');
			await store.dispatch('achievementStatsByDifficulty/bindList');
			await store.dispatch('achievementStatsByCategory/bindList');
			await store.dispatch('achievementStatsByMonth/bindList');
		}
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('users/initList'),
			this.$store.dispatch('slackInfos/init'),
			this.$store.dispatch('achievements/initLatestAchievements'),
			this.$store.dispatch('achievementData/initList'),
			this.$store.dispatch('achievementStatsByDifficulty/initList'),
			this.$store.dispatch('achievementStatsByCategory/initList'),
			this.$store.dispatch('achievementStatsByMonth/initList'),
		]).then(() => {
			this.isLoading = false;
		});
	},
	methods: {
		getUserName(user) {
			const name = get(user, ['profile', 'display_name'], false) || get(user, ['real_name'], false) || '匿名ユーザー';
			return `@${name}`;
		},
		getUserIcon(user) {
			return get(user, ['profile', 'image_24'], '/images/anonymous-icon_24.png');
		},
		getUserIcon2x(user) {
			return get(user, ['profile', 'image_48'], '/images/anonymous-icon_48.png');
		},
		getCategoryColor(category) {
			return getCategoryColor(category);
		},
		getAchievement(id) {
			return this.achievementData.find((achievementDatum) => achievementDatum.id === id) || {title: '---', difficulty: 'baby'};
		},
		getDateStringJa(date) {
			const d = new Date(date.seconds * 1000);
			const h = d.getHours().toString().padStart(2, '0');
			const m = d.getMinutes().toString().padStart(2, '0');
			return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${h}:${m}`;
		},
	},
	head() {
		return {
			title: 'achievement-viewer',
		};
	},
};
</script>

<style>
.index-icon {
	vertical-align: bottom;
}
</style>
