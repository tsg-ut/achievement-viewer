<template>
	<div class="container content">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">15%</progress>
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
							<DifficultyBadge :difficulty="getAchievement(achievement.name).difficulty" />
						</nuxt-link>
						を解除しました。
					</td>
				</tr>
			</tbody>
		</table>
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
							<img class="index-icon" :src="getUserIcon(user)" :srcset="`${getUserIcon(user)} 1x, ${getUserIcon2x(user)} 2x`">
							{{getUserName(user)}}
						</nuxt-link>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import {getCategoryColor} from '@/components/utils/utils.js';
import flatten from 'lodash/flatten.js';
import get from 'lodash/get.js';
import sum from 'lodash/sum.js';
import {mapState} from 'vuex';

import db from '~/components/utils/db.js'

export default {
	data() {
		return {
			online: true,
			isLoading: true,
		};
	},
	computed: {
		...mapState({
			users: (state) => state.users.list,
			achievementData: (state) => state.achievementData.list,
			latestAchievements: (state) => state.achievements.latestAchievements,
		}),
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('users/bindList');
			await store.dispatch('achievements/bindLatestAchievements');
			await store.dispatch('achievementsData/bindList');
		}
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('users/initList'),
			this.$store.dispatch('achievements/initLatestAchievements'),
			this.$store.dispatch('achievementData/initList'),
		]).then(() => {
			this.isLoading = false;
		});
	},
	methods: {
		getUser(id) {
			return this.users.find((user) => user.id === id);
		},
		getUserName(user) {
			const name = get(user, ['info', 'profile', 'display_name'], false) || get(user, ['info', 'real_name'], false) || user.id;
			return `@${name}`;
		},
		getUserIcon(user) {
			return get(user, ['info', 'profile', 'image_24'], 'https://placehold.it/24x24');
		},
		getUserIcon2x(user) {
			return get(user, ['info', 'profile', 'image_48'], 'https://placehold.it/48x48');
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
