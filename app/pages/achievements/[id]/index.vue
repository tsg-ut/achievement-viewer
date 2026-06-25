<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">
			15%
		</progress>
		<UnauthorizedNotification />
		<div class="block">
			カテゴリ:
			<nuxt-link
				:to="`/categories/${category}`"
				class="category-tag tag is-medium"
				:style="{backgroundColor: categoryColor}"
				>{{ category }}</nuxt-link
			>
		</div>
		<div class="box">
			<h1 class="title is-size-1">
				{{ title }}<DifficultyBadge :difficulty="difficulty" />
			</h1>
			<h2 class="subtitle">{{ condition }}</h2>
		</div>
		<div class="block">{{ count }}人が解除済み</div>
		<div class="block">
			<nuxt-link
				v-for="user in achievedUsers"
				:key="user.id"
				:to="`/users/${user.id}`"
			>
				<img :src="getUserIcon3x(user)">
			</nuxt-link>
		</div>
		<div v-if="counter !== null">
			<h1 class="title is-3">上位/下位実績</h1>
			<ul class="steps has-content-centered">
				<li
					v-for="achievementDatum in sameCounterAchievements"
					:key="achievementDatum.id"
					class="steps-segment"
					:class="{'is-active': achievementDatum.id === route.params['id']}"
				>
					<nuxt-link :to="`/achievements/${achievementDatum.id}`">
						<span class="steps-marker" />
						<div class="steps-content">
							<p class="is-size-4">{{ achievementDatum.title }}</p>
							<p class="is-size-7">{{ achievementDatum.condition }}</p>
							<DifficultyBadge :difficulty="achievementDatum.difficulty" />
						</div>
					</nuxt-link>
				</li>
			</ul>
			<h1 class="title is-3">実績の達成状況</h1>
			<div class="field">
				<input
					id="scaleSwitch"
					v-model="scaleToMaxUser"
					type="checkbox"
					name="scaleSwitch"
					class="switch"
				>
				<label for="scaleSwitch">最大ユーザを基準にする</label>
			</div>
			<div class="table-container">
				<table class="table">
					<thead>
						<tr>
							<th>ユーザー</th>
							<th :style="{width: '100%'}">達成状況</th>
							<th />
						</tr>
					</thead>
					<tbody>
						<tr v-for="user in sortedUserList" :key="user.id">
							<td
								:style="{whiteSpace: 'nowrap', maxWidth: '15rem', textOverflow: 'ellipsis', overflow: 'hidden'}"
							>
								<nuxt-link :to="`/users/${user.id}`">
									<img
										class="index-icon"
										:src="getUserIcon(user.info)"
										:srcset="`${getUserIcon(user.info)} 1x, ${getUserIcon2x(user.info)} 2x`"
									>
									{{ getUserName(user.info) }}
								</nuxt-link>
							</td>
							<td :style="{minWidth: '15rem'}">
								<progress
									class="progress is-success"
									:class="(user.count ?? 0) >= value ? 'is-success' : 'is-warning'"
									:value="user.count ?? 0"
									:max="scaleToMaxUser ? maxCount : value"
								/>
							</td>
							<td :style="{whiteSpace: 'nowrap'}">
								{{ user.count ?? 0 }}
								/ {{ value }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import get from 'lodash/get.js';
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {getCategoryColor} from '@/lib/utils.js';
import type {AchievementData, SlackUser} from '@/types/store.js';
import {useStore} from '~/plugins/vuex.js';

const route = useRoute();
const store = useStore();
const isLoading = ref(true);
const scaleToMaxUser = ref(false);

const achievementId = computed(() => route.params['id'] as string);

const achievementDatum = computed(() =>
	store.getters['achievementData/getById'](achievementId.value),
);

const title = computed(
	() => get(achievementDatum.value, ['title'], '') as string,
);
const condition = computed(
	() => get(achievementDatum.value, ['condition'], '') as string,
);
const count = computed(
	() => get(achievementDatum.value, ['count'], 0) as number,
);
const counter = computed(
	() => get(achievementDatum.value, ['counter'], null) as string | null,
);
const value = computed(
	() => get(achievementDatum.value, ['value'], 0) as number,
);
const difficulty = computed(
	() =>
		get(
			achievementDatum.value,
			['difficulty'],
			'baby',
		) as AchievementData['difficulty'],
);
const category = computed(
	() => get(achievementDatum.value, ['category'], '') as string,
);
const categoryColor = computed(() => getCategoryColor(category.value));

useHead(() => ({title: `実績「${title.value}」 - achievement-viewer`}));

const userList = computed(
	() => store.state.users.list as Array<SlackUser & {[key: string]: unknown}>,
);

const achievedUsers = computed(() =>
	store.getters['achievements/getByName'](achievementId.value)
		.map(({name, date, user}) => ({
			name,
			date,
			user: store.getters['slackInfos/getUser'](user),
		}))
		.sort((a, b) => a.date.seconds - b.date.seconds)
		.map(({user}) => user),
);

const sortedUserList = computed(() =>
	userList.value
		.slice()
		.sort(
			(a, b) =>
				((b[counter.value ?? ''] as number | undefined) ?? 0) -
				((a[counter.value ?? ''] as number | undefined) ?? 0),
		)
		.map((user) => ({
			info: store.getters['slackInfos/getUser'](user.id),
			count: (user[counter.value ?? ''] as number | undefined) ?? null,
			id: user.id,
		})),
);

const maxCount = computed(() =>
	Math.max(...sortedUserList.value.map((user) => user.count ?? 0)),
);

const sameCounterAchievements = computed(() => {
	if (counter.value === null) {
		return [] as AchievementData[];
	}
	return store.getters['achievementData/getByCounter'](counter.value);
});

function getUserName(user: SlackUser | undefined) {
	const name =
		get(user, ['profile', 'display_name'], false) ||
		get(user, ['real_name'], false) ||
		'匿名ユーザー';
	return `@${name}`;
}

function getUserIcon(user: SlackUser | undefined) {
	return get(user, ['profile', 'image_24'], '/images/anonymous-icon_24.png');
}

function getUserIcon2x(user: SlackUser | undefined) {
	return get(user, ['profile', 'image_48'], '/images/anonymous-icon_48.png');
}

function getUserIcon3x(user: SlackUser | undefined) {
	return get(user, ['profile', 'image_72'], '/images/anonymous-icon_72.png');
}

onMounted(async () => {
	await Promise.all([
		store.dispatch('achievementData/initList'),
		store.dispatch('achievements/fetchByName', achievementId.value),
		store.dispatch('slackInfos/initUsers'),
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
.steps-segment > a {
	color: inherit;
}
.tag.category-tag {
	color: white;
}
</style>
