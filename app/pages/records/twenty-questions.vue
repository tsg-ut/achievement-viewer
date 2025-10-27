<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<unauthorized-notification/>

		<p class="title">20の扉ログ</p>

		<twenty-questions-game
			v-for="game in games"
			:key="game.id"
			:game="game"
		/>
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
			await store.dispatch('twentyQuestionsGames/initList');
			await store.dispatch('slackInfos/initUsers');
		}
	},
	head() {
		return {
			title: '20の扉ログ - achievement-viewer',
		};
	},
	computed: {
		...mapState({
			games: (state) => (
				state.twentyQuestionsGames.list
			),
		}),
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('twentyQuestionsGames/initList'),
			this.$store.dispatch('slackInfos/initUsers'),
		]).then(() => {
			this.isLoading = false;
		});
	},
};
</script>
