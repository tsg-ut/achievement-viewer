<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">15%</progress>
		<div v-if="isUnauthorized" class="notification is-danger">
			ログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は<a href="https://slackbot-api.tsg.ne.jp/">こちら</a>からログインしてください。
		</div>
		<div class="box">
			<h1 class="title is-size-1">{{title}}<DifficultyBadge :difficulty="difficulty" /></h1>
			<h2 class="subtitle">{{condition}}</h2>
		</div>
		<div class="block">{{count}}人が解除済み</div>
		<div class="block">
			<nuxt-link v-for="user in users" :key="user.id" :to="`/users/${user.id}`">
				<img :src="getUserIcon3x(user)" />
			</nuxt-link>
		</div>
		<div v-if="counter !== null">
			<h1 class="title is-3">実績の達成状況</h1>
			<div class="table-container">
				<table class="table">
					<thead>
						<tr>
							<th>ユーザー</th>
							<th :style="{width: '100%'}">達成状況</th>
							<th/>
						</tr>
					</thead>
					<tbody>
						<tr v-for="user in sortedUserList" :key="user.id">
							<td :style="{whiteSpace: 'nowrap', maxWidth: '15rem', textOverflow: 'ellipsis', overflow: 'hidden'}">
								<nuxt-link :to="`/users/${user.id}`">
									<img class="index-icon" :src="getUserIcon(user)" :srcset="`${getUserIcon(user)} 1x, ${getUserIcon2x(user)} 2x`">
									{{getUserName(user)}}
								</nuxt-link>
							</td>
							<td :style="{minWidth: '15rem'}">
								<progress
									class="progress is-success"
									:class="(user[counter] || 0) >= value ? 'is-success' : 'is-warning'"
									:value="user[counter] || 0"
									:max="value"
								/>
							</td>
							<td :style="{whiteSpace: 'nowrap'}">
								{{user[counter] || 0}} / {{value}}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import {getCategoryColor} from '@/components/utils/utils.js';
import get from 'lodash/get.js';
import sum from 'lodash/sum.js';
import {mapState} from 'vuex';
import DifficultyBadge from '../../../components/DifficultyBadge.vue';

export default {
	data() {
		return {
			isLoading: true,
		};
	},
	computed: {
		...mapState({
			userList: (state) => state.users.list,
			isUnauthorized: (state) => state.slackInfos.isUnauthorized,
		}),
		achievementDatum() {
			return this.$store.getters['achievementData/getById'](this.$route.params.id);
		},
		title() {
			return get(this.achievementDatum, ['title'], '');
		},
		condition() {
			return get(this.achievementDatum, ['condition'], '');
		},
		count() {
			return get(this.achievementDatum, ['count'], 0);
		},
		counter() {
			return get(this.achievementDatum, ['counter'], null);
		},
		value() {
			return get(this.achievementDatum, ['value'], 0);
		},
		difficulty() {
			return get(this.achievementDatum, ['difficulty'], '');
		},
		users() {
			const users = this.$store.getters['achievements/getByName'](this.$route.params.id).map(({name, date, user}) => ({
				name,
				date,
				user: this.$store.getters['slackInfos/getUser'](user),
			})).sort((a, b) => {
				return a.date - b.date;
			}).map(({user}) => user);
			return users;
		},
		sortedUserList() {
			return this.userList.slice().sort((a, b) => (b[this.counter] || 0) - (a[this.counter] || 0));
		},
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('achievements/bindList');
		}
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('achievementData/initList'),
			this.$store.dispatch('achievements/fetchByName', this.$route.params.id),
			this.$store.dispatch('slackInfos/init'),
			this.$store.dispatch('users/initList'),
		]).then(() => {
			this.isLoading = false;
		});
	},
	methods: {
		getUserName(user) {
			const name = get(user, ['profile', 'display_name'], false) || get(user, ['real_name'], false) || '匿名ユーザー';
			return `@${name}`;
		},
		getUserIcon(user) {
			return get(user, ['profile', 'image_24'], '/images/anonymous-icon_24.png');
		},
		getUserIcon2x(user) {
			return get(user, ['profile', 'image_48'], '/images/anonymous-icon_48.png');
		},
		getUserIcon3x(user) {
			return get(user, ['profile', 'image_72'], '/images/anonymous-icon_72.png');
		},
	},
	head() {
		return {
			title: `実績「${this.title}」 - achievement-viewer`,
		};
	},
};
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
