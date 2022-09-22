<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<p class="title">実績一覧</p>
		<div class="columns is-multiline">
			<div v-for="achievement in ranking" :key="achievement.id" class="column is-half">
				<AchievementCard
					:achievement="achievement"
					:count-max="ranking[0].count"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';

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
			title: '実績一覧 - achievement-viewer',
		};
	},
	computed: {
		...mapState({
			achievementData: (state) => (
				state.achievementData.list
			),
		}),
		ranking() {
			const entries = this.achievementData.slice();
			entries.sort((a, b) => b.count - a.count);
			return entries;
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
