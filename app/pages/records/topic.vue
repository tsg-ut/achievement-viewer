<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100" />
		<unauthorized-notification required />

		<p class="title">sandboxのトピックログ</p>

		<div class="field">
			<div class="control has-icons-left">
				<input
					v-model="searchQuery"
					class="input"
					type="text"
					placeholder="トピックを検索..."
				>
				<span class="icon is-left">
					<i class="ri-search-line" />
				</span>
			</div>
		</div>

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
				<input id="likes" v-model="sortByValue" type="radio" value="likes">
				お気に入り順
			</label>
			<label class="radio">
				<input id="random" v-model="sortByValue" type="radio" value="random">
				ランダム
			</label>
		</div>

		<div class="table-container">
			<table class="table topics">
				<tbody>
					<tr
						v-for="{ message, likes, isLiked } in paginatedTopics"
						:key="message.ts"
					>
						<td class="topic-text">
							<nuxt-link
								v-if="message.user"
								:to="`/users/${message.user}`"
								class="topic-user"
							>
								<img class="topic-icon" :src="getUserIcon(message)">
								{{ getUserName(message) }}
							</nuxt-link>
							<span v-else class="topic-user">
								<img class="topic-icon" :src="getUserIcon(message)">
								{{ getUserName(message) }}
							</span>
							<strong>{{ message.text }}</strong>
						</td>
						<td class="topic-like">
							<span
								class="icon"
								@click="() => toggleTopicMessageLike(message, isLiked)"
							>
								<i v-if="isLiked" class="ri-heart-fill" />
								<i v-else class="ri-heart-line" />
							</span>{{ likes.length }}
						</td>
						<td class="topic-timestamp">
							{{ getTime(message.ts) }}
						</td>
						<td class="topic-slacklog">
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
				</tbody>
			</table>
		</div>

		<nav
			v-if="totalPages > 1"
			class="pagination is-centered"
			aria-label="pagination"
		>
			<a
				class="pagination-previous"
				:class="{'is-disabled': currentPage === 1}"
				@click="changePage(currentPage - 1)"
			>
				前へ
			</a>
			<a
				class="pagination-next"
				:class="{'is-disabled': currentPage === totalPages}"
				@click="changePage(currentPage + 1)"
			>
				次へ
			</a>
			<ul class="pagination-list">
				<li v-for="(page, index) in paginationRange" :key="index">
					<span v-if="page === '...'" class="pagination-ellipsis"
						>&hellip;</span
					>
					<a
						v-else
						class="pagination-link"
						:class="{'is-current': page === currentPage}"
						:aria-label="`ページ ${page}`"
						:aria-current="page === currentPage ? 'page' : undefined"
						@click="() => changePage(page as number)"
					>
						{{ page }}
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import get from 'lodash/get.js';
import sortBy from 'lodash/sortBy.js';
import {computed, onMounted, ref, watch} from 'vue';
import {useStore} from 'vuex';
import type {SlackUser, TopicMessage} from '@/types/store.js';

useHead({title: 'sandboxのトピックログ - achievement-viewer'});

const ITEMS_PER_PAGE = 100;

const store = useStore();
const isLoading = ref(true);
const sortByValue = ref('timestamp');
const currentPage = ref(1);
const searchQuery = ref('');

const getUser = computed(
	() =>
		store.getters['slackInfos/getUser'] as (
			id: string,
		) => SlackUser | undefined,
);

const topicMessages = computed(() =>
	(store.state.slackInfos.topicMessages as TopicMessage[]).filter(({message}) =>
		message?.reactions?.some(
			({name, count}) => name === 'koresuki' && count >= 3,
		),
	),
);

const filteredTopics = computed(() => {
	if (!searchQuery.value.trim()) {
		return topicMessages.value;
	}
	const q = searchQuery.value.toLowerCase().normalize('NFKC');
	return topicMessages.value.filter(({message}) => {
		const text = (message.text?.toLowerCase() ?? '').normalize('NFKC');
		const username = getUserName(message).toLowerCase().normalize('NFKC');
		return text.includes(q) || username.includes(q);
	});
});

const sortedTopics = computed(() => {
	if (sortByValue.value === 'timestamp') {
		return sortBy(filteredTopics.value, ({message}) => message.ts).reverse();
	}
	if (sortByValue.value === 'username') {
		return sortBy(filteredTopics.value, [
			({message}) => getUserName(message),
			({message}) => -Number.parseFloat(message.ts),
		]);
	}
	if (sortByValue.value === 'likes') {
		return sortBy(filteredTopics.value, [
			({likes}) => -likes.length,
			({message}) => -Number.parseFloat(message.ts),
		]);
	}
	if (sortByValue.value === 'random') {
		return sortBy(filteredTopics.value, [({randomSortKey}) => randomSortKey]);
	}
	return filteredTopics.value;
});

const totalPages = computed(() =>
	Math.ceil(sortedTopics.value.length / ITEMS_PER_PAGE),
);

const paginatedTopics = computed(() => {
	const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
	return sortedTopics.value.slice(start, start + ITEMS_PER_PAGE);
});

const paginationRange = computed(() => {
	const range: Array<number | '...'> = [];
	const total = totalPages.value;
	const current = currentPage.value;
	const delta = 2;

	for (
		let i = Math.max(2, current - delta);
		i <= Math.min(total - 1, current + delta);
		i++
	) {
		range.push(i);
	}

	if (current - delta > 2) {
		range.unshift('...');
	}
	if (current + delta < total - 1) {
		range.push('...');
	}

	range.unshift(1);
	if (total > 1) {
		range.push(total);
	}

	return range;
});

watch(sortByValue, () => {
	currentPage.value = 1;
});

watch(searchQuery, () => {
	currentPage.value = 1;
});

function changePage(page: number) {
	if (page >= 1 && page <= totalPages.value) {
		currentPage.value = page;
		window.scrollTo({top: 0, behavior: 'smooth'});
	}
}

function toggleTopicMessageLike(
	message: TopicMessage['message'],
	isLiked: boolean | undefined,
) {
	if (isLiked) {
		store.dispatch('slackInfos/unlikeTopicMessage', {ts: message.ts});
	} else {
		store.dispatch('slackInfos/likeTopicMessage', {ts: message.ts});
	}
}

function getUserName(message: TopicMessage['message']) {
	if (message.username) {
		return message.username;
	}
	if (message.user?.startsWith('U')) {
		const user = getUser.value(message.user);
		const name =
			get(user, ['profile', 'display_name'], false) ||
			get(user, ['real_name'], false) ||
			'匿名ユーザー';
		return `@${name}`;
	}
	return '@匿名ユーザー';
}

function getUserIcon(message: TopicMessage['message']) {
	if (message?.icons?.image_48) {
		return message.icons.image_48;
	}
	if (message.user?.startsWith('U')) {
		const user = getUser.value(message.user);
		return get(user, ['profile', 'image_24'], '/images/anonymous-icon_24.png');
	}
	return '/images/anonymous-icon_24.png';
}

function getTime(ts: string) {
	const timestamp = Number.parseFloat(ts);
	return dayjs(timestamp * 1000).format('YYYY/MM/DD');
}

onMounted(async () => {
	await Promise.all([
		store.dispatch('slackInfos/initUsers'),
		store.dispatch('slackInfos/initTopicMessages'),
	]);
	isLoading.value = false;
});
</script>

<style>
.control {
	.radio {
		margin-inline-start: 0.5em;
	}
}

.topics.table td,
.topics.table th {
	padding-left: 0.25em;
	padding-right: 0.25em;
}

.topic-text {
	line-break: anywhere;
	min-width: 20em;

	.topic-user {
		margin-inline-end: 0.2em;
	}
}

.topic-icon {
	vertical-align: bottom;
	width: 24px;
	height: 24px;
}

.topic-slacklog {
	width: 1%;
	white-space: nowrap;
}

.topic-timestamp {
	width: 1%;
	white-space: nowrap;
}

.topic-like {
	width: 1%;
	white-space: nowrap;
	color: deeppink;
	cursor: pointer;
}

.topic-like .icon {
	vertical-align: bottom;
}

.pagination {
	margin-top: 2rem;
	margin-bottom: 2rem;
}

.field {
	margin-bottom: 1.5rem;
}
</style>
