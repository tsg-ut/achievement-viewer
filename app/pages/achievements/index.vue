<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100" />
		<p class="title">実績一覧</p>
		<div class="columns is-multiline">
			<div
				v-for="achievement in ranking"
				:key="achievement.id"
				class="column is-half"
			>
				<AchievementCard
					:achievement="achievement"
					:count-max="ranking[0]!.count ?? 0"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useStore} from '~/plugins/vuex.js';

useHead({title: '実績一覧 - achievement-viewer'});

const store = useStore();
const isLoading = ref(true);

const achievementData = computed(() => store.state.achievementData.list);

const ranking = computed(() => {
	const entries = achievementData.value.slice();
	entries.sort((a, b) => (b.count ?? 0) - (a.count ?? 0));
	return entries;
});

onMounted(async () => {
	await Promise.all([
		store.dispatch('achievementData/initList'),
		store.dispatch('users/initList'),
	]);
	isLoading.value = false;
});
</script>
