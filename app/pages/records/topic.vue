<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<unauthorized-notification required/>

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
					<i class="ri-search-line"/>
				</span>
			</div>
		</div>

		<div class="control is-spaced">
			並び替え:
			<label class="radio">
				<input
					id="timestamp"
					v-model="sortBy"
					type="radio"
					value="timestamp"
				>
				新しい順
			</label>
			<label class="radio">
				<input
					id="username"
					v-model="sortBy"
					type="radio"
					value="username"
				>
				ユーザー順
			</label>
			<label class="radio">
				<input
					id="likes"
					v-model="sortBy"
					type="radio"
					value="likes"
				>
				お気に入り順
			</label>
			<label class="radio">
				<input
					id="random"
					v-model="sortBy"
					type="radio"
					value="random"
				>
				ランダム
			</label>
		</div>

		<div class="table-container">
			<table class="table topics">
				<tbody>
					<tr v-for="{message, likes, isLiked} in paginatedTopics" :key="message.ts">
						<td class="topic-text">
							<nuxt-link
								v-if="message.user"
								:to="`/users/${message.user}`"
								class="topic-user"
							>
								<img
									class="topic-icon"
									:src="getUserIcon(message)"
								>
								{{getUserName(message)}}
							</nuxt-link>
							<span v-else class="topic-user">
								<img
									class="topic-icon"
									:src="getUserIcon(message)"
								>
								{{getUserName(message)}}
							</span>
							<strong>{{message.text}}</strong>
						</td>
						<td class="topic-like">
							<span class="icon" @click="() => toggleTopicMessageLike(message, isLiked)">
								<i v-if="isLiked" class="ri-heart-fill"/>
								<i v-else class="ri-heart-line"/>
							</span>{{likes.length}}
						</td>
						<td class="topic-timestamp">
							{{getTime(message.ts)}}
						</td>
						<td class="topic-slacklog">
							<a
								:href="`https://slack-log.tsg.ne.jp/C7AAX50QY/${message.ts}`"
								target="_blank"
								rel="noopener noreferrer"
							>
								slacklog<span class="icon"><i class="ri-external-link-line"/></span>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<nav
			v-if="totalPages > 1"
			class="pagination is-centered"
			role="navigation"
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
					<span v-if="page === '...'" class="pagination-ellipsis">&hellip;</span>
					<a
						v-else
						class="pagination-link"
						:class="{'is-current': page === currentPage}"
						:aria-label="`ページ ${page}`"
						:aria-current="page === currentPage ? 'page' : null"
						@click="() => changePage(page)"
					>
						{{page}}
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import {mapActions, mapGetters, mapState} from 'vuex';

const ITEMS_PER_PAGE = 100;

export default {
	data() {
		return {
			isLoading: true,
			sortBy: 'timestamp',
			currentPage: 1,
			searchQuery: '',
		};
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('slackInfos/initUsers');
			await store.dispatch('slackInfos/initTopicMessages');
		}
	},
	head() {
		return {
			title: 'sandboxのトピックログ - achievement-viewer',
		};
	},
	computed: {
		...mapState({
			topicMessages: (state) => (
				state.slackInfos.topicMessages.filter(({message}) => (
					message?.reactions?.some(({name, count}) => name === 'koresuki' && count >= 3)
				))
			),
		}),
		...mapGetters('slackInfos', ['getUser']),
		filteredTopics() {
			if (!this.searchQuery.trim()) {
				return this.topicMessages;
			}
			const query = this.searchQuery.toLowerCase().normalize('NFKC');
			return this.topicMessages.filter(({message}) => {
				const text = (message.text?.toLowerCase() || '').normalize('NFKC');
				const username = this.getUserName(message).toLowerCase().normalize('NFKC');
				return text.includes(query) || username.includes(query);
			});
		},
		sortedTopics() {
			let sorted;
			if (this.sortBy === 'timestamp') {
				sorted = sortBy(this.filteredTopics, ({message}) => message.ts).reverse();
			} else if (this.sortBy === 'username') {
				sorted = sortBy(this.filteredTopics, [
					({message}) => this.getUserName(message),
					({message}) => -parseFloat(message.ts),
				]);
			} else if (this.sortBy === 'likes') {
				sorted = sortBy(this.filteredTopics, [
					({likes}) => -likes.length,
					({message}) => -parseFloat(message.ts),
				]);
			} else if (this.sortBy === 'random') {
				sorted = sortBy(this.filteredTopics, [
					({randomSortKey}) => randomSortKey,
				]);
			} else {
				sorted = this.filteredTopics;
			}
			return sorted;
		},
		totalPages() {
			return Math.ceil(this.sortedTopics.length / ITEMS_PER_PAGE);
		},
		paginatedTopics() {
			const start = (this.currentPage - 1) * ITEMS_PER_PAGE;
			const end = start + ITEMS_PER_PAGE;
			return this.sortedTopics.slice(start, end);
		},
		paginationRange() {
			const range = [];
			const total = this.totalPages;
			const current = this.currentPage;
			const delta = 2;

			for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
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
		},
	},
	watch: {
		sortBy() {
			this.currentPage = 1;
		},
		searchQuery() {
			this.currentPage = 1;
		},
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('slackInfos/initUsers'),
			this.$store.dispatch('slackInfos/initTopicMessages'),
		]).then(() => {
			this.isLoading = false;
		});
	},
	methods: {
		changePage(page) {
			if (page >= 1 && page <= this.totalPages) {
				this.currentPage = page;
				window.scrollTo({top: 0, behavior: 'smooth'});
			}
		},
		...mapActions({
			likeTopicMessage: 'slackInfos/likeTopicMessage',
			unlikeTopicMessage: 'slackInfos/unlikeTopicMessage',
		}),
		toggleTopicMessageLike(message, isLiked) {
			if (isLiked) {
				this.unlikeTopicMessage({ts: message.ts});
			} else {
				this.likeTopicMessage({ts: message.ts});
			}
		},
		getUserName(message) {
			if (message.username) {
				return message.username;
			}
			if (message.user && message.user.startsWith('U')) {
				const user = this.getUser(message.user);
				const name =
					get(user, ['profile', 'display_name'], false) ||
					get(user, ['real_name'], false) ||
					'匿名ユーザー';
				return `@${name}`;
			}
			return '@匿名ユーザー';
		},
		getUserIcon(message) {
			if (message?.icons?.image_48) {
				return message.icons.image_48;
			}
			if (message.user && message.user.startsWith('U')) {
				const user = this.getUser(message.user);
				return get(user, ['profile', 'image_24'], '/images/anonymous-icon_24.png');
			}
			return '/images/anonymous-icon_24.png';
		},
		getTime(ts) {
			const timestamp = parseFloat(ts);
			const date = dayjs(timestamp * 1000);
			return date.format('YYYY/MM/DD');
		},
	},
};
</script>

<style>
.control {
	.radio {
		margin-inline-start: 0.5em;
	}
}

.topics.table td, .topics.table th {
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

