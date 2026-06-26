<template>
	<nuxt-link
		class="card"
		:to="`/achievements/${achievement.id}`"
		:style="{display: 'block'}"
	>
		<div class="card-image">
			<div
				class="image achievements-color"
				:style="{backgroundColor: getCategoryColor(achievement.category)}"
			/>
		</div>
		<div class="card-content">
			<div class="content">
				<p class="title">
					{{ achievement.title }}
					<DifficultyBadge :difficulty="achievement.difficulty" />
				</p>
				<div class="columns">
					<div class="column achievements-progress">
						<progress
							class="progress is-danger"
							:value="achievement.count || 0"
							:max="countMax"
						/>
					</div>
					<div class="column is-narrow">
						<p class="subtitle is-6 achievements-count">
							<strong>{{ achievement.count || 0 }}人</strong>が<wbr>解除済み
						</p>
					</div>
				</div>
				<p>{{ achievement.condition }}</p>
			</div>
		</div>
	</nuxt-link>
</template>

<script setup lang="ts">
import {getCategoryColor} from '@/lib/utils.js';
import type {AchievementData} from '@/types/store.js';

defineProps<{
	achievement: AchievementData;
	countMax: number;
}>();
</script>

<style>
.achievements-count {
	white-space: nowrap;
}
.achievements-progress {
	display: flex;
	align-items: center;
}
.achievements-color {
	height: 0.3rem;
}
</style>
