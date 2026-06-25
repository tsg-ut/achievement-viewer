<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">
			15%
		</progress>
		<UnauthorizedNotification />
		<div class="columns has-text-centered">
			<div class="column is-narrow">
				<img :src="icon" :srcset="`${icon} 1x, ${icon2x} 2x`">
			</div>
			<div class="column">
				<p class="title user-title">{{ name }}の<wbr>解除した<wbr>実績一覧</p>
			</div>
		</div>
		<div class="columns is-multiline">
			<div
				v-for="{ datum, name: achievementName, date } in achievements"
				:key="achievementName"
				class="column is-one-third"
			>
				<nuxt-link
					class="card"
					:to="`/achievements/${achievementName}`"
					:style="{display: 'block'}"
				>
					<div class="card-image">
						<div
							class="image achievements-color"
							:style="{backgroundColor: getCategoryColor(datum.category)}"
						/>
					</div>
					<div class="card-content">
						<div class="content">
							<p class="title">
								{{ datum.title }}
								<DifficultyBadge :difficulty="datum.difficulty" />
							</p>
							<div v-if="datum.counter" class="columns">
								<div class="column achievements-progress">
									<progress
										class="progress is-success"
										:value="(user as Record<string, unknown>)[datum.counter] as number ?? 0"
										:max="datum.value"
									/>
								</div>
								<div class="column is-narrow">
									<p class="subtitle is-6 achievements-count">
										{{ datum.value }}/{{ datum.value }}
									</p>
								</div>
							</div>
							<p>{{ datum.condition }}</p>
							<p class="has-text-right is-size-7">
								<time :datetime="getDateString(date)"
									>{{ getDateStringJa(date) }}</time
								>
							</p>
						</div>
					</div>
				</nuxt-link>
			</div>
		</div>
		<p class="title">未解除の実績一覧</p>
		<div class="columns is-multiline">
			<div
				v-for="datum in lockedAchievements"
				:key="datum.id"
				class="column is-one-third"
			>
				<nuxt-link
					class="card"
					:to="`/achievements/${datum.id}`"
					:style="{display: 'block'}"
				>
					<div class="card-image">
						<div
							class="image achievements-color"
							:style="{backgroundColor: getCategoryColor(datum.category)}"
						/>
					</div>
					<div class="card-content">
						<div class="content">
							<p class="title">
								??????
								<DifficultyBadge :difficulty="datum.difficulty" />
							</p>
							<div v-if="datum.counter" class="columns">
								<div class="column achievements-progress">
									<progress
										class="progress is-gray"
										:value="(user as Record<string, unknown>)[datum.counter] as number ?? 0"
										:max="datum.value"
									/>
								</div>
								<div class="column is-narrow">
									<p class="subtitle is-6 achievements-count">
										{{ (user as Record<string, unknown>)[datum.counter] as number ?? 0 }}/{{ datum.value }}
									</p>
								</div>
							</div>
							<p>{{ datum.condition }}</p>
						</div>
					</div>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import get from 'lodash/get.js';
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {getCategoryColor} from '@/lib/utils.js';
import type {SlackUser} from '@/types/store.js';
import {useStore} from '~/plugins/vuex.js';

const route = useRoute();
const store = useStore();
const isLoading = ref(true);

const userId = computed(() => route.params['id'] as string);

const user = computed(
	() =>
		store.getters['users/getById'](userId.value) as SlackUser &
			Record<string, unknown>,
);
const slackUser = computed(() =>
	store.getters['slackInfos/getUser'](userId.value),
);
const achievementData = computed(() => store.state.achievementData.list);

const name = computed(() => {
	const displayName = get(slackUser.value, ['profile', 'display_name'], false);
	const realName = get(slackUser.value, ['real_name'], false);
	return `@${displayName || realName || '匿名ユーザー'}`;
});

useHead(() => ({
	title: `${name.value}の解除した実績一覧 - achievement-viewer`,
}));

const icon = computed(() =>
	get(
		slackUser.value,
		['profile', 'image_72'],
		'/images/anonymous-icon_72.png',
	),
);
const icon2x = computed(() =>
	get(
		slackUser.value,
		['profile', 'image_192'],
		'/images/anonymous-icon_192.png',
	),
);

const difficultyRank: Record<string, number> = {
	baby: 1,
	easy: 2,
	medium: 3,
	hard: 4,
	professional: 5,
};

const achievements = computed(() =>
	store.getters['achievements/getByUser'](userId.value)
		.map(({name: aName, date}) => ({
			name: aName,
			date,
			datum: store.getters['achievementData/getById'](aName),
		}))
		.sort((a, b) => {
			if (a.datum.difficulty && b.datum.difficulty) {
				return (
					(difficultyRank[b.datum.difficulty] ?? 0) -
					(difficultyRank[a.datum.difficulty] ?? 0)
				);
			}
			return 0;
		}),
);

const lockedAchievements = computed(() => {
	const unlockedAchievements = new Set(
		store.getters['achievements/getByUser'](userId.value).map(({name: n}) => n),
	);
	return achievementData.value
		.filter(({id}) => !unlockedAchievements.has(id))
		.sort((a, b) =>
			a.category && b.category ? a.category.localeCompare(b.category) : 0,
		);
});

function getDateString(date: {seconds: number}) {
	const d = new Date(date.seconds * 1000);
	return d.toISOString().split('T')[0] ?? '';
}

function getDateStringJa(date: {seconds: number}) {
	const d = new Date(date.seconds * 1000);
	return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

onMounted(async () => {
	await Promise.all([
		store.dispatch('achievementData/initList'),
		store.dispatch('slackInfos/initUsers'),
		store.dispatch('users/bindById', userId.value),
		store.dispatch('users/initList'),
	]);
	isLoading.value = false;
});
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
.user-title {
	white-space: nowrap;
	overflow: hidden;
}
</style>
