<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100" />
		<p class="title">
			カテゴリ
			<span
				class="category-tag tag is-large"
				:style="{backgroundColor: categoryColor}"
				>{{ route.params['id'] }}</span
			>
			の実績一覧
		</p>
		<div class="columns is-multiline">
			<div
				v-for="achievement in achievements"
				:key="achievement.id"
				class="column is-half"
			>
				<AchievementCard
					:achievement="achievement"
					:count-max="achievements[0]!.count ?? 0"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {useStore} from 'vuex';
import {getCategoryColor} from '@/lib/utils.js';
import type {AchievementData} from '@/types/store.js';

const route = useRoute();
const store = useStore();
const isLoading = ref(true);

const categoryId = computed(() => route.params['id'] as string);

useHead(() => ({
	title: `実績カテゴリ「${categoryId.value}」 - achievement-viewer`,
}));

const achievements = computed(
	() =>
		store.getters['achievementData/getByCategory'](
			categoryId.value,
		) as AchievementData[],
);

const categoryColor = computed(() => getCategoryColor(categoryId.value));

onMounted(async () => {
	await Promise.all([
		store.dispatch('achievementData/initList'),
		store.dispatch('users/initList'),
	]);
	isLoading.value = false;
});
</script>
