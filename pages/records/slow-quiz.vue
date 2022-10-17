<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<p class="title">1日1文字クイズログ</p>
		<div v-for="game in ranking" :key="game.id" class="box">
			<h2 class="is-size-3 has-text-weight-bold question-text">
				{{getQuestionText(game)}}
			</h2>
			<nav class="pagination" role="navigation" aria-label="pagination">
				<a class="pagination-previous">1文字減らす</a>
				<a class="pagination-next">1文字増やす</a>

				<ul class="pagination-list">
					<li>
						<a class="pagination-link" aria-label="1文字目まで表示">1</a>
					</li>
					<li>
						<span class="pagination-ellipsis">&hellip;</span>
					</li>
					<li>
						<a class="pagination-link" aria-label="45文字目まで表示">45</a>
					</li>
					<li>
						<a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
					</li>
					<li>
						<a class="pagination-link" aria-label="47文字目まで表示">47</a>
					</li>
					<li>
						<span class="pagination-ellipsis">&hellip;</span>
					</li>
					<li>
						<a class="pagination-link" aria-label="86文字目まで表示">86</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import {getQuestionText} from '@/components/utils/slow-quiz';

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
