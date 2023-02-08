<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<p class="title">
			カテゴリ <span class="category-tag tag is-large" :style="{backgroundColor: categoryColor}">{{$route.params.id}}</span> の実績一覧
		</p>
		<div class="columns is-multiline">
			<div v-for="achievement in achievements" :key="achievement.id" class="column is-half">
				<AchievementCard
					:achievement="achievement"
					:count-max="achievements[0].count"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import {getCategoryColor} from '@/lib/utils.js';

export default {
	data() {
		return {
			isLoading: true,
		};
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('achievementsData/bindList');
		}
	},
	head() {
		return {
			title: `実績カテゴリ「${this.$route.params.id}」 - achievement-viewer`,
		};
	},
	computed: {
		achievements() {
			return this.$store.getters['achievementData/getByCategory'](this.$route.params.id);
		},
		categoryColor() {
			return getCategoryColor(this.$route.params.id);
		},
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('achievementData/initList'),
			this.$store.dispatch('users/initList'),
		]).then(() => {
			this.isLoading = false;
		});
	},
};
</script>

