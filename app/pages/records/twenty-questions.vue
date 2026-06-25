<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100" />
		<unauthorized-notification />

		<p class="title">20の扉ログ</p>

		<twenty-questions-game v-for="game in games" :key="game.id" :game="game" />
	</div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useStore} from 'vuex';
import type {TwentyQuestionsGame} from '@/types/store.js';

useHead({title: '20の扉ログ - achievement-viewer'});

const store = useStore();
const isLoading = ref(true);

const games = computed(
	() => store.state.twentyQuestionsGames.list as TwentyQuestionsGame[],
);

onMounted(async () => {
	await Promise.all([
		store.dispatch('twentyQuestionsGames/initList'),
		store.dispatch('slackInfos/initUsers'),
	]);
	isLoading.value = false;
});
</script>
