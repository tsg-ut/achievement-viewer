<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<unauthorized-notification required/>

		<p class="title">夢占いログ</p>

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
				<input type="radio" id="points" value="points" v-model="sortBy">
				点数順
			</label>
		</div>

		<div
			v-if="!isUnauthorized"
			class="table-container"
		>
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
					v-for="{message, summary, originalMessage} in sortedOneiromancies"
					:key="message.ts"
				>
					<tr
						@click="toggleOpenedMessage(message.ts)"
						class="oneiromancy"
					>
						<td class="oneiromancy-username">
							<span
								v-if="!originalMessage"
							>
								-
							</span>
							<nuxt-link
								v-else-if="originalMessage?.user !== undefined"
								:to="`/users/${originalMessage?.user}`"
							>
								<img
									class="oneiromancy-icon"
									:src="getUserIcon(originalMessage)"
								>
								{{getUserName(originalMessage)}}
							</nuxt-link>
							<span v-else>
								<img
									class="oneiromancy-icon"
									:src="getUserIcon(originalMessage)"
								>
								{{getUserName(originalMessage)}}
							</span>
						</td>
						<td class="oneiromancy-lucky-item">
							<strong>{{summary.luckyItem ?? '-'}}</strong>
						</td>
						<td class="oneiromancy-point">
							<strong>{{Number.isFinite(summary.point) ? `${summary.point}点` : '-'}}</strong>
						</td>
						<td class="oneiromancy-timestamp">
							{{getTime(message.ts)}}
						</td>
						<td class="oneiromancy-slacklog">
							<a
								:href="'https://slack-log.tsg.ne.jp/C7AAX50QY/' + message.ts"
								target="_blank"
								rel="noopener nereferrer"
							>
								slacklog<span class="icon"><i class="ri-external-link-line"/></span>
							</a>
						</td>
					</tr>
					<tr
						v-if="openedMessages.includes(message.ts)"
						class="oneiromancy-detail"
					>
						<td :colspan="5">
							<h3>元メッセージ</h3>
							<div class="oneiromancy-original-text">{{originalMessage?.text?.trim()}}</div>
							<h3>夢占い</h3>
							<div class="oneiromancy-text">{{formatSlackText(message.text)}}</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<p class="title">採点基準一覧</p>

		<div
			v-if="!isUnauthorized"
			class="table-container"
		>
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
						<td><strong>{{criteria.name}}</strong></td>
						<td>{{criteria.point}}点</td>
						<td>
							<a
								:href="'https://slack-log.tsg.ne.jp/C7AAX50QY/' + criteria.ts"
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
import {mapGetters, mapState} from 'vuex';
import sortBy from 'lodash/sortBy';

export default {
	data() {
		return {
			isLoading: true,
			sortBy: 'timestamp',
			openedMessages: [],
		};
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('slackInfos/initUsers');
			await store.dispatch('oneiromancies/initOneiromancyMessages');
			await store.dispatch('oneiromancies/initOneiromancyCriteria');
		}
	},
	head() {
		return {
			title: '夢占いログ - achievement-viewer',
		};
	},
	computed: {
		...mapState({
			oneiromancyMessages: (state) => state.oneiromancies.oneiromancyMessages,
			oneiromancyCriteria: (state) => state.oneiromancies.oneiromancyCriteria,
			isUnauthorized: (state) => state.slackInfos.isUnauthorized,
		}),
		...mapGetters('slackInfos', ['getUser']),
		sortedOneiromancies() {
			if (this.sortBy === 'timestamp') {
				return sortBy(this.oneiromancyMessages, ({message}) => message.ts).reverse();
			}
			if (this.sortBy === 'username') {
				return sortBy(this.oneiromancyMessages, [
					({message}) => this.getUserName(message),
					({message}) => -parseFloat(message.ts),
				]);
			}
			if (this.sortBy === 'points') {
				return sortBy(this.oneiromancyMessages, [
					({summary}) => -(summary.point ?? -Infinity),
					({message}) => -parseFloat(message.ts),
				]);
			}
			return this.oneiromancyMessages;
		},
		filteredOneiromancyCriteria() {
			return this.oneiromancyCriteria.filter((criteria) => criteria.name !== '基準点');
		},
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('slackInfos/initUsers'),
			this.$store.dispatch('oneiromancies/initOneiromancyMessages'),
			this.$store.dispatch('oneiromancies/initOneiromancyCriteria'),
		]).then(() => {
			this.isLoading = false;
		});
	},
	methods: {
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
		toggleOpenedMessage(ts) {
			if (this.openedMessages.includes(ts)) {
				this.openedMessages = this.openedMessages.filter((openedTs) => openedTs !== ts);
			} else {
				this.openedMessages.push(ts);
			}
		},
		formatSlackText(originalText) {
			const text = (originalText ?? '').trim();
			const lines = text.split('\n');
			return lines.slice(2).join('\n')
		},
	},
};
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

.oneiromancy-original-text, .oneiromancy-text {
	line-break: anywhere;
	min-width: 20em;
	white-space: pre-line;
}

.oneiromancy-icon {
	vertical-align: bottom;
	width: 24px;
	height: 24px;
}

.oneiromancy-slacklog, .oneiromancy-point, .oneiromancy-timestamp {
	width: 1%;
	white-space: nowrap;
}
</style>

