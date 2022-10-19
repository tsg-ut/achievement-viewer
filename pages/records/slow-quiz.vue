<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<unauthorized-notification/>

		<p class="title">1日1文字クイズログ</p>

		<div class="control is-flex">
			<div class="control-label">一括操作</div>
			<div class="buttons are-small">
				<button
					type="button"
					class="button is-primary is-outlined"
					@click="progressType = 'first'"
				>
					1文字目のみ表示
				</button>
				<button
					type="button"
					class="button is-primary is-outlined"
					@click="progressType = 'first-answer'"
				>
					最初の正解者まで表示
				</button>
				<button
					type="button"
					class="button is-primary is-outlined"
					@click="progressType = 'last-answer'"
				>
					最後の正解者まで表示
				</button>
				<button
					type="button"
					class="button is-primary is-outlined"
					@click="progressType = 'last'"
				>
					最後まで表示
				</button>
			</div>
		</div>

		<slow-quiz-game
			v-for="game in games"
			:key="game.id"
			:game="game"
			:progress-type="progressType"
		/>
	</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	data() {
		return {
			isLoading: true,
			progressType: 'none',
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

.control {
	margin: 1rem 0;
}

.control-label {
	margin-right: 0.5em;
}
</style>
