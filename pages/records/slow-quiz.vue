<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<p class="title">1日1文字クイズログ</p>
		<div v-for="game in ranking" :key="game.id" class="box">
			<h2 class="is-size-3 has-text-weight-bold question-text">
				{{getQuestionText(game)}}
			</h2>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import {getQuestionText} from '../../components/utils/slow-quiz';

export default {
	data() {
		return {
			isLoading: true,
		};
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('slowQuizGames/initList');
			await store.dispatch('users/initList');
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
		ranking() {
			return this.games;
		},
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('slowQuizGames/initList'),
			this.$store.dispatch('users/initList'),
		]).then(() => {
			this.isLoading = false;
		});
	},
	methods: {
		getQuestionText(game) {
			return getQuestionText(game, 1);
		},
	},
};
</script>

<style>
.question-text {
  word-break: break-all;
}
</style>
