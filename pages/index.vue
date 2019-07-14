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
				<tr v-for="{rank, achievements, user} in ranking" :key="user.id">
					<td><strong>{{rank}}</strong></td>
					<td>{{achievements.length}}</td>
					<td>
						<nuxt-link :to="`/users/${user.id}`">
							<img class="index-icon" :src="getUserIcon(user)" :srcset="`${getUserIcon(user)} 1x, ${getUserIcon2x(user)} 2x`">
							{{getUserName(user)}}
						</nuxt-link>
						<span
							v-for="achievement in achievements"
							:key="achievement.id"
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
import get from 'lodash/get.js';
import {getCategoryColor} from '@/components/utils/utils.js';
import groupBy from 'lodash/groupBy.js';
import {mapState} from 'vuex';
import randomcolor from 'randomcolor';

export default {
	data() {
		return {
			online: true,
		};
	},
	computed: {
		...mapState({
			isLoading: (state) => (
				!state.achievements.isInitList
			),
			achievements: (state) => {
				if (!state.achievements.list) {
					return [];
				}

				return state.achievements.list;
			},
			achievementData: (state) => (
				state.achievementData.list
			),
		}),
		ranking() {
			const entries = Object.entries(groupBy(this.achievements, ({user}) => user))
				.map(([user, achievements]) => ({
					user: this.$store.getters['users/getById'](user),
					achievements: achievements
						.map(({name, id}) => ({...this.$store.getters['achievementData/getById'](name), id}))
						.sort((a, b) => (a.category && b.category) ? a.category.localeCompare(b.category) : 0),
				}));
			entries.sort((a, b) => b.achievements.length - a.achievements.length);
			let rank = 1;
			let previousLength = Infinity;
			for (const [index, entry] of entries.entries()) {
				if (previousLength !== entry.achievements.length) {
					rank = index + 1;
				}
				entry.rank = rank;
				previousLength = entry.achievements.length;
			}
			return entries;
		},
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('achievements/bindList');
		}
	},
	mounted() {
		this.$store.dispatch('achievements/initList');
		this.$store.dispatch('achievementData/initList');
		this.$store.dispatch('users/initList');
	},
	methods: {
		handleClickButton() {
			if (!this.online) {
				return;
			}

			this.$store.dispatch('increment');
		},
		getColor(id) {
			return randomcolor({
				luminosity: 'bright',
				seed: id,
			});
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
