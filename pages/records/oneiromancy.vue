<template>
	<div class="container is-max-desktop">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100"/>
		<unauthorized-notification required/>

		<p class="title">夢占いログ</p>

		<div
			v-if="!isUnauthorized"
			class="table-container"
		>
			<table class="table oneiromancies">
				<tbody>
					<tr v-for="{message, summary, originalMessage} in oneiromancyMessages" :key="message.ts">
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
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import get from 'lodash/get';
import dayjs from 'dayjs';
import {mapGetters, mapState} from 'vuex';

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
			await store.dispatch('oneiromancies/initOneiromancyMessages');
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
			isInitOneiromancyMessages: (state) => state.oneiromancies.isInitOneiromancyMessages,
			isUnauthorized: (state) => state.slackInfos.isUnauthorized,
		}),
		...mapGetters('slackInfos', ['getUser']),
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('slackInfos/initUsers'),
			this.$store.dispatch('oneiromancies/initOneiromancyMessages'),
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
		}
	},
};
</script>

<style>
.oneiromancies.table td, .oneiromancies.table th {
	padding-left: 0.25em;
	padding-right: 0.25em;
}

.oneiromancy-text {
	line-break: anywhere;
	min-width: 20em;
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

