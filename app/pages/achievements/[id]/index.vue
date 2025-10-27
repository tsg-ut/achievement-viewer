<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">15%</progress>
		<UnauthorizedNotification/>
		<div class="block">
			カテゴリ: <nuxt-link :to="`/categories/${category}`" class="category-tag tag is-medium" :style="{backgroundColor: categoryColor}">{{category}}</nuxt-link>
		</div>
		<div class="box">
			<h1 class="title is-size-1">{{title}}<DifficultyBadge :difficulty="difficulty"/></h1>
			<h2 class="subtitle">{{condition}}</h2>
		</div>
		<div class="block">{{count}}人が解除済み</div>
		<div class="block">
			<nuxt-link v-for="user in users" :key="user.id" :to="`/users/${user.id}`">
				<img :src="getUserIcon3x(user)">
			</nuxt-link>
		</div>
		<div v-if="counter !== null">
			<h1 class="title is-3">上位/下位実績</h1>
			<ul class="steps has-content-centered">
				<li
					v-for="achievementData in sameCounterAchievements"
					:key="achievementData.id"
					class="steps-segment"
					:class="{'is-active': achievementData.id === $route.params.id}"
				>
					<nuxt-link :to="`/achievements/${achievementData.id}`">
						<span class="steps-marker"/>
						<div class="steps-content">
							<p class="is-size-4">{{achievementData.title}}</p>
							<p class="is-size-7">{{achievementData.condition}}</p>
							<DifficultyBadge :difficulty="achievementData.difficulty"/>
						</div>
					</nuxt-link>
				</li>
			</ul>
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
									<img class="index-icon" :src="getUserIcon(user.info)" :srcset="`${getUserIcon(user.info)} 1x, ${getUserIcon2x(user.info)} 2x`">
									{{getUserName(user.info)}}
								</nuxt-link>
							</td>
							<td :style="{minWidth: '15rem'}">
								<progress
									class="progress is-success"
									:class="(user.count || 0) >= value ? 'is-success' : 'is-warning'"
									:value="user.count || 0"
									:max="value"
								/>
							</td>
							<td :style="{whiteSpace: 'nowrap'}">
								{{user.count || 0}} / {{value}}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import get from 'lodash/get.js';
import {mapState} from 'vuex';
import {getCategoryColor} from '@/lib/utils.js';

export default {
	data() {
		return {
			isLoading: true,
		};
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('achievements/bindList');
		}
	},
	head() {
		return {
			title: `実績「${this.title}」 - achievement-viewer`,
		};
	},
	computed: {
		...mapState({
			userList: (state) => state.users.list,
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
		category() {
			return get(this.achievementDatum, ['category'], '');
		},
		users() {
			const users = this.$store.getters['achievements/getByName'](this.$route.params.id).map(({name, date, user}) => ({
				name,
				date,
				user: this.$store.getters['slackInfos/getUser'](user),
			})).sort((a, b) => a.date - b.date).map(({user}) => user);
			return users;
		},
		sortedUserList() {
			return this.userList.slice()
				.sort((a, b) => (b[this.counter] || 0) - (a[this.counter] || 0))
				.map((user) => ({
					info: this.$store.getters['slackInfos/getUser'](user.id),
					count: user[this.counter],
					id: user.id,
				}));
		},
		sameCounterAchievements() {
			if (this.counter === null) {
				return [];
			}
			return this.$store.getters['achievementData/getByCounter'](this.counter);
		},
		categoryColor() {
			return getCategoryColor(this.category);
		},
	},
	mounted() {
		Promise.all([
			this.$store.dispatch('achievementData/initList'),
			this.$store.dispatch('achievements/fetchByName', this.$route.params.id),
			this.$store.dispatch('slackInfos/initUsers'),
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
.steps-segment > a {
	color: inherit;
}
.tag.category-tag {
	color: white;
}
</style>
