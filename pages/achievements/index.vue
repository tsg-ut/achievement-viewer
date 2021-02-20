<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<p class="title">実績一覧</p>
		<div class="columns is-multiline">
			<div v-for="{category, difficulty, id, count, first, title, condition} in ranking" :key="id" class="column is-half">
				<nuxt-link class="card" :to="`/achievements/${id}`" :style="{display: 'block'}">
					<div class="card-image">
						<div class="image achievements-color" :style="{backgroundColor: getCategoryColor(category)}"/>
					</div>
					<div class="card-content">
						<div class="content">
							<p class="title">
								{{title}}
							</p>
							<div class="columns">
								<div class="column achievements-progress">
									<progress
										class="progress is-danger"
										:value="count"
										:max="ranking[0].count"
									/>
								</div>
								<div class="column is-narrow">
									<p class="subtitle is-6 achievements-count"><strong>{{count}}人</strong>が<wbr>解除済み</p>
								</div>
							</div>
							<p>{{condition}}</p>
						</div>
					</div>
				</nuxt-link>
			</div>

			<div class="column is-half">
				<div class="card">
					<div class="card-content">
						<div class="content">
							<p class="title">+{{achievementData.length - ranking.length}}個の未解除の実績</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {getCategoryColor} from '@/components/utils/utils.js';
import get from 'lodash/get.js';
import {mapState} from 'vuex';

export default {
	data() {
		return {
			isLoading: true,
		};
	},
	computed: {
		...mapState({
			achievementData: (state) => (
				state.achievementData.list
			),
		}),
		ranking() {
			const entries = this.achievementData.filter(({count}) => count && count > 0);
			entries.sort((a, b) => b.count - a.count);
			return entries;
		},
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('achievementsData/bindList');
		}
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('achievementData/initList'),
			this.$store.dispatch('users/initList'),
		]).then(() => {
			this.isLoading = false;
		});
	},
	methods: {
		getUserName(userId) {
			const user = this.$store.getters['users/getById'](userId);
			const name = get(user, ['info', 'profile', 'display_name'], false) || get(user, ['info', 'real_name'], false) || user.id;
			return `@${name}`;
		},
		getCategoryColor(category) {
			return getCategoryColor(category);
		},
	},
	head() {
		return {
			title: '実績一覧 - achievement-viewer',
		};
	},
};
</script>

<style>
.achievements-count {
	white-space: nowrap;
}
.achievements-progress {
	display: flex;
	align-items: center;
}
.achievements-color {
	height: 0.3rem;
}
</style>
