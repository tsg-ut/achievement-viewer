<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">15%</progress>
		<table class="table">
			<thead>
				<tr>
					<th>順位</th>
					<th>解除数</th>
					<th>名前</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="{rank, count, user, achievements} in ranking" :key="user.id">
					<td><strong>{{rank}}</strong></td>
					<td>{{count}}</td>
					<td>
						<nuxt-link :to="`/users/${user.id}`">
							<img class="index-icon" :src="getUserIcon(user)" :srcset="`${getUserIcon(user)} 1x, ${getUserIcon2x(user)} 2x`">
							{{getUserName(user)}}
						</nuxt-link>
						<span
							v-for="achievement in achievements"
							:key="`${achievement.category}-${achievement.index}`"
							:style="{
								display: 'inline-block',
								width: '0.5rem',
								height: '0.5rem',
								marginLeft: '0.3rem',
								borderRadius: '100%',
								backgroundColor: getCategoryColor(achievement.category),
							}"
						/>
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

export default {
	data() {
		return {
			online: true,
		};
	},
	computed: {
		...mapState({
			isLoading: (state) => (
				!state.users.isInitList
			),
			users: (state) => state.users.list,
		}),
		ranking() {
			const users = this.users.map((user) => ({
				user,
				count: sum(Object.values(user.counts || {})),
				achievements: flatten(
					Object.entries(user.counts || {}).map(([category, count]) => (
						Array(count).fill().map((_, index) => ({category, index}))
					)),
				).sort(),
				rank: null,
			}));
			users.sort((a, b) => b.count - a.count);
			let rank = 1;
			let previousCount = Infinity;
			for (const [index, user] of users.entries()) {
				if (previousCount !== user.count) {
					rank = index + 1;
				}
				user.rank = rank;
				previousCount = user.count;
			}
			return users;
		},
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('users/bindList');
		}
	},
	mounted() {
		this.$store.dispatch('users/initList');
	},
	methods: {
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
