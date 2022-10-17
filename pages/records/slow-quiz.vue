<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<unauthorized-notification/>

		<p class="title">1日1文字クイズログ</p>
		<slow-quiz-game v-for="game in games" :key="game.id" :game="game"/>
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
			await store.dispatch('slowQuizGames/initList');
			await store.dispatch('slackInfos/init');
		}
	},
	head() {
		return {
			title: '1日1文字クイズログ - achievement-viewer',
		};
	},
	computed: {
		...mapState({
			games: (state) => (
				state.slowQuizGames.list
			),
		}),
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('slowQuizGames/initList'),
			this.$store.dispatch('slackInfos/init'),
		]).then(() => {
			this.isLoading = false;
		});
	},
};
</script>

<style>
.question-text {
  word-break: break-all;
}
</style>
