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
	head() {
		return {
			title: '実績一覧 - achievement-viewer',
		};
	},
};
</script>
