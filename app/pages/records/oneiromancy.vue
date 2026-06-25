<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100" />
		<unauthorized-notification required />

		<p class="title">夢占いログ</p>

		<div class="control is-spaced">
			並び替え:
			<label class="radio">
				<input
					id="timestamp"
					v-model="sortByValue"
					type="radio"
					value="timestamp"
				>
				新しい順
			</label>
			<label class="radio">
				<input
					id="username"
					v-model="sortByValue"
					type="radio"
					value="username"
				>
				ユーザー順
			</label>
			<label class="radio">
				<input id="points" v-model="sortByValue" type="radio" value="points">
				点数順
			</label>
		</div>

		<div v-if="!isUnauthorized" class="table-container">
			<table class="table is-striped is-hoverable oneiromancies">
				<tbody>
					<tr>
						<th>ユーザー</th>
						<th>ラッキーアイテム</th>
						<th>点数</th>
						<th>日時</th>
						<th>リンク</th>
					</tr>
				</tbody>
				<tbody
					v-for="{ message, summary, originalMessage } in sortedOneiromancies"
					:key="message.ts"
				>
					<tr
						class="oneiromancy"
						@click="() => toggleOpenedMessage(message.ts)"
					>
						<td class="oneiromancy-username">
							<span v-if="!originalMessage"> - </span>
							<nuxt-link
								v-else-if="originalMessage?.user !== undefined"
								:to="`/users/${originalMessage?.user}`"
							>
								<img
									class="oneiromancy-icon"
									:src="getUserIcon(originalMessage)"
								>
								{{ getUserName(originalMessage) }}
							</nuxt-link>
							<span v-else>
								<img
									class="oneiromancy-icon"
									:src="getUserIcon(originalMessage)"
								>
								{{ getUserName(originalMessage) }}
							</span>
						</td>
						<td class="oneiromancy-lucky-item">
							<strong>{{ summary.luckyItem ?? '-' }}</strong>
						</td>
						<td class="oneiromancy-point">
							<strong
								>{{ Number.isFinite(summary.point) ? `${summary.point}点` : '-' }}</strong
							>
						</td>
						<td class="oneiromancy-timestamp">
							{{ getTime(message.ts) }}
						</td>
						<td class="oneiromancy-slacklog">
							<a
								:href="`https://slack-log.tsg.ne.jp/C7AAX50QY/${message.ts}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								slacklog<span class="icon"
									><i class="ri-external-link-line" /></span
								>
							</a>
						</td>
					</tr>
					<tr
						v-if="openedMessages.includes(message.ts)"
						class="oneiromancy-detail"
					>
						<td :colspan="5">
							<h3>元メッセージ</h3>
							<div class="oneiromancy-original-text">
								{{ originalMessage?.text?.trim() }}
							</div>
							<h3>夢占い</h3>
							<div class="oneiromancy-text">
								{{ formatSlackText(message.text) }}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<p class="title">採点基準一覧</p>

		<div v-if="!isUnauthorized" class="table-container">
			<table class="table is-hoverable is-fullwidth">
				<tbody>
					<tr>
						<th>名前</th>
						<th>点数</th>
						<th>リンク</th>
					</tr>
					<tr
						v-for="criteria in filteredOneiromancyCriteria"
						:key="criteria.name"
					>
						<td>
							<strong>{{ criteria.name }}</strong>
						</td>
						<td>{{ criteria.point }}点</td>
						<td>
							<a
								:href="`https://slack-log.tsg.ne.jp/C7AAX50QY/${criteria.ts}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								slacklog<span class="icon"
									><i class="ri-external-link-line" /></span
								>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import sortBy from 'lodash/sortBy.js';
import {computed, onMounted, ref} from 'vue';
import {useStore} from '~/plugins/vuex.js';

useHead({title: '夢占いログ - achievement-viewer'});

const store = useStore();
const isLoading = ref(true);
const sortByValue = ref('timestamp');
const openedMessages = ref<string[]>([]);

const getUser = computed(() => store.getters['slackInfos/getUser']);
const isUnauthorized = computed(() => store.state.slackInfos.isUnauthorized);
const oneiromancyMessages = computed(
	() => store.state.oneiromancies.oneiromancyMessages,
);
const oneiromancyCriteria = computed(
	() => store.state.oneiromancies.oneiromancyCriteria,
);

const sortedOneiromancies = computed(() => {
	const messages = oneiromancyMessages.value;
	if (sortByValue.value === 'timestamp') {
		return sortBy(messages, ({message}) => message.ts).reverse();
	}
	if (sortByValue.value === 'username') {
		return sortBy(messages, [
			({originalMessage}) => getUserName(originalMessage),
			({message}) => -Number.parseFloat(message.ts),
		]);
	}
	if (sortByValue.value === 'points') {
		return sortBy(messages, [
			({summary}) => -(summary.point ?? Number.NEGATIVE_INFINITY),
			({message}) => -Number.parseFloat(message.ts),
		]);
	}
	return messages;
});

const filteredOneiromancyCriteria = computed(() =>
	oneiromancyCriteria.value.filter((criteria) => criteria.name !== '基準点'),
);

function getUserName(
	message:
		| {username?: string; user?: string; [key: string]: unknown}
		| undefined,
) {
	if (!message) {
		return '@匿名ユーザー';
	}
	if (typeof message.username === 'string') {
		return message.username;
	}
	if (typeof message.user === 'string' && message.user.startsWith('U')) {
		const user = getUser.value(message.user);
		const name =
			user?.profile?.display_name || user?.real_name || '匿名ユーザー';
		return `@${name}`;
	}
	return '@匿名ユーザー';
}

function getUserIcon(
	message:
		| {user?: string; icons?: {image_48?: string}; [key: string]: unknown}
		| undefined,
) {
	if (message?.icons?.image_48) {
		return message.icons.image_48;
	}
	if (typeof message?.user === 'string' && message.user.startsWith('U')) {
		const user = getUser.value(message.user);
		return user?.profile?.image_24 ?? '/images/anonymous-icon_24.png';
	}
	return '/images/anonymous-icon_24.png';
}

function getTime(ts: string) {
	return dayjs(Number.parseFloat(ts) * 1000).format('YYYY/MM/DD');
}

function toggleOpenedMessage(ts: string) {
	if (openedMessages.value.includes(ts)) {
		openedMessages.value = openedMessages.value.filter(
			(openedTs) => openedTs !== ts,
		);
	} else {
		openedMessages.value.push(ts);
	}
}

function formatSlackText(originalText: string | undefined) {
	const text = (originalText ?? '').trim();
	const lines = text.split('\n');
	return lines.slice(2).join('\n');
}

onMounted(async () => {
	await Promise.all([
		store.dispatch('slackInfos/initUsers'),
		store.dispatch('oneiromancies/initOneiromancyMessages'),
		store.dispatch('oneiromancies/initOneiromancyCriteria'),
	]);
	isLoading.value = false;
});
</script>

<style>
.oneiromancies.table .oneiromancy {
	cursor: pointer;
	border-top: 1px solid #808080;
}

.oneiromancy-detail td {
	padding: 0.5rem;
}

.oneiromancy-detail h3 {
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
	font-size: 1.5em;
	font-weight: bold;
}

.oneiromancy-original-text,
.oneiromancy-text {
	line-break: anywhere;
	min-width: 20em;
	white-space: pre-line;
}

.oneiromancy-icon {
	vertical-align: bottom;
	width: 24px;
	height: 24px;
}

.oneiromancy-slacklog,
.oneiromancy-point,
.oneiromancy-timestamp {
	width: 1%;
	white-space: nowrap;
}
</style>
