<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100" />
		<unauthorized-notification />

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

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useStore} from 'vuex';
import type {SlowQuizGame} from '@/lib/slow-quiz.js';

useHead({title: '1日1文字クイズログ - achievement-viewer'});

const store = useStore();
const isLoading = ref(true);
const progressType = ref('none');

const games = computed(
	() => store.state.slowQuizGames.list as Array<SlowQuizGame & {id: string}>,
);

onMounted(async () => {
	await Promise.all([
		store.dispatch('slowQuizGames/initList'),
		store.dispatch('slackInfos/initUsers'),
	]);
	isLoading.value = false;
});
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
