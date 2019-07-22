<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">15%</progress>
		<p class="title">実績一覧</p>
		<div class="columns is-multiline">
			<div v-for="{category, difficulty, id, count, first, title, condition} in ranking" :key="id" class="column is-half">
				<div class="card">
					<div class="card-image">
						<div class="image achievements-color" :style="{backgroundColor: getCategoryColor(category)}"/>
					</div>
					<div class="card-content">
						<div class="content">
							<p class="title">
								{{title}}
								<span v-if="difficulty === 'baby'" class="tag is-light">
									Baby
								</span>
								<span v-if="difficulty === 'easy'" class="tag is-success">
									Easy
								</span>
								<span v-if="difficulty === 'medium'" class="tag is-link">
									Medium
								</span>
								<span v-if="difficulty === 'hard'" class="tag is-warning">
									Hard
								</span>
								<span v-if="difficulty === 'professional'" class="tag is-danger">
									Pro
								</span>
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
							<p class="has-text-right is-size-7">
								初達成者:
								{{first}}
							</p>
						</div>
					</div>
				</div>
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
import get from 'lodash/get.js';
import {getCategoryColor} from '@/components/utils/utils.js';
import {mapState} from 'vuex';
import randomcolor from 'randomcolor';

export default {
	computed: {
		...mapState({
			isLoading: (state) => (
				!state.achievementData.isInitList
			),
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
		this.$store.dispatch('achievementData/initList');
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
