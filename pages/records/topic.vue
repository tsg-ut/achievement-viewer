<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<unauthorized-notification required/>

		<p class="title">sandboxのトピックログ</p>

		<div class="control is-spaced">
			並び替え:
			<label class="radio">
				<input type="radio" id="timestamp" value="timestamp" v-model="sortBy">
				新しい順
			</label>
			<label class="radio">
				<input type="radio" id="username" value="username" v-model="sortBy">
				ユーザー順
			</label>
			<label class="radio">
				<input type="radio" id="likes" value="likes" v-model="sortBy">
				お気に入り順
			</label>
			<label class="radio">
				<input type="radio" id="random" value="random" v-model="sortBy">
				ランダム
			</label>
		</div>

		<div class="table-container">
			<table class="table topics">
				<tbody>
					<tr v-for="{message, likes, isLiked} in sortedTopics" :key="message.ts">
						<td class="topic-text">
							<nuxt-link v-if="message.user" :to="`/users/${message.user}`">
								<img
									class="topic-icon"
									:src="getUserIcon(message)"
								>
								{{getUserName(message)}}
							</nuxt-link>
							<span v-else>
								<img
									class="topic-icon"
									:src="getUserIcon(message)"
								>
								{{getUserName(message)}}
							</span>
							<strong>{{message.text}}</strong>
						</td>
						<td class="topic-like">
							<span class="icon" @click="toggleTopicMessageLike(message, isLiked)">
								<i v-if="isLiked" class="ri-heart-fill"/>
								<i v-else class="ri-heart-line"/>
							</span>{{likes.length}}
						</td>
						<td class="topic-timestamp">
							{{getTime(message.ts)}}
						</td>
						<td class="topic-slacklog">
							<a
								:href="'https://slack-log.tsg.ne.jp/C7AAX50QY/' + message.ts"
								target="_blank"
								rel="noopener nereferrer"
							>
								slacklog<span class="icon"><i class="ri-external-link-line"/></span>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import get from 'lodash/get';
import dayjs from 'dayjs';
import {mapActions, mapGetters, mapState} from 'vuex';
import sortBy from 'lodash/sortBy';

export default {
	data() {
		return {
			isLoading: true,
			sortBy: 'timestamp',
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
		sortedTopics() {
			if (this.sortBy === 'timestamp') {
				return sortBy(this.topicMessages, ({message}) => message.ts).reverse();
			}
			if (this.sortBy === 'username') {
				return sortBy(this.topicMessages, [
					({message}) => this.getUserName(message),
					({message}) => -parseFloat(message.ts),
				]);
			}
			if (this.sortBy === 'likes') {
				return sortBy(this.topicMessages, [
					({likes}) => -likes.length,
					({message}) => -parseFloat(message.ts),
				]);
			}
			if (this.sortBy === 'random') {
				return sortBy(this.topicMessages, [
					({randomSortKey}) => randomSortKey,
				]);
			}
			return this.topicMessages;
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
		}
	},
};
</script>

<style>
.topics.table td, .topics.table th {
	padding-left: 0.25em;
	padding-right: 0.25em;
}

.topic-text {
	line-break: anywhere;
	min-width: 20em;
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
</style>

