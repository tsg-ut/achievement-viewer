<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100" />
		<unauthorized-notification />

		<p class="title">たほいやログ</p>

		<nav v-if="totalPages > 1" class="pagination mb-4" aria-label="pagination">
			<a
				class="pagination-previous"
				:class="{'is-disabled': currentPage === 1}"
				@click="currentPage = Math.max(1, currentPage - 1)"
			>
				前のページ
			</a>
			<a
				class="pagination-next"
				:class="{'is-disabled': currentPage === totalPages}"
				@click="currentPage = Math.min(totalPages, currentPage + 1)"
			>
				次のページ
			</a>
			<ul class="pagination-list">
				<li v-if="currentPage >= 3">
					<a class="pagination-link" @click="currentPage = 1">1</a>
				</li>
				<li v-if="currentPage >= 4">
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<li v-if="currentPage >= 2">
					<a class="pagination-link" @click="currentPage = currentPage - 1"
						>{{ currentPage - 1 }}</a
					>
				</li>
				<li>
					<a class="pagination-link is-current">{{ currentPage }}</a>
				</li>
				<li v-if="currentPage <= totalPages - 1">
					<a class="pagination-link" @click="currentPage = currentPage + 1"
						>{{ currentPage + 1 }}</a
					>
				</li>
				<li v-if="currentPage <= totalPages - 3">
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<li v-if="currentPage <= totalPages - 2">
					<a class="pagination-link" @click="currentPage = totalPages"
						>{{ totalPages }}</a
					>
				</li>
			</ul>
		</nav>

		<tahoiya-game v-for="game in pagedGames" :key="game.id" :game="game" />

		<nav v-if="totalPages > 1" class="pagination mt-4" aria-label="pagination">
			<a
				class="pagination-previous"
				:class="{'is-disabled': currentPage === 1}"
				@click="currentPage = Math.max(1, currentPage - 1)"
			>
				前のページ
			</a>
			<a
				class="pagination-next"
				:class="{'is-disabled': currentPage === totalPages}"
				@click="currentPage = Math.min(totalPages, currentPage + 1)"
			>
				次のページ
			</a>
		</nav>
	</div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useStore} from '~/plugins/vuex.js';

useHead({title: 'たほいやログ - achievement-viewer'});

const store = useStore();
const isLoading = ref(true);
const currentPage = ref(1);
const GAMES_PER_PAGE = 20;

const games = computed(() => store.state.tahoiyaGames.list);
const totalPages = computed(() =>
	Math.ceil(games.value.length / GAMES_PER_PAGE),
);
const pagedGames = computed(() => {
	const start = (currentPage.value - 1) * GAMES_PER_PAGE;
	return games.value.slice(start, start + GAMES_PER_PAGE);
});

onMounted(async () => {
	await Promise.all([
		store.dispatch('tahoiyaGames/initList'),
		store.dispatch('slackInfos/initUsers'),
	]);
	isLoading.value = false;
});
</script>
