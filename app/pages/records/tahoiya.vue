<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100" />
		<unauthorized-notification />

		<p class="title">たほいやログ</p>

		<tahoiya-game v-for="game in games" :key="game.id" :game="game" />
	</div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useStore} from '~/plugins/vuex.js';

useHead({title: 'たほいやログ - achievement-viewer'});

const store = useStore();
const isLoading = ref(true);

const games = computed(() => store.state.tahoiyaGames.list);

onMounted(async () => {
	await Promise.all([
		store.dispatch('tahoiyaGames/initList'),
		store.dispatch('slackInfos/initUsers'),
	]);
	isLoading.value = false;
});
</script>
