<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">15%</progress>
		<div v-if="isUnauthorized" class="notification is-danger">
			ログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は<a href="https://slackbot-api.tsg.ne.jp/">こちら</a>からログインしてください。
		</div>
		<div class="columns has-text-centered">
			<div class="column is-narrow">
				<img :src="icon" :srcset="`${icon} 1x, ${icon2x} 2x`">
			</div>
			<div class="column">
				<p class="title user-title">{{name}}の<wbr>解除した<wbr>実績一覧</p>
			</div>
		</div>
		<div class="columns is-multiline">
			<div v-for="{datum, name: id, date} in achievements" :key="id" class="column is-one-third">
				<nuxt-link class="card" :to="`/achievements/${id}`" :style="{display: 'block'}">
					<div class="card-image">
						<div class="image achievements-color" :style="{backgroundColor: getCategoryColor(datum.category)}"/>
					</div>
					<div class="card-content">
						<div class="content">
							<p class="title">
								{{datum.title}}
								<DifficultyBadge :difficulty="datum.difficulty" />
							</p>
							<div v-if="datum.counter" class="columns">
								<div class="column achievements-progress">
									<progress
										class="progress is-success"
										:value="user[datum.counter] || 0"
										:max="datum.value"
									/>
								</div>
								<div class="column is-narrow">
									<p class="subtitle is-6 achievements-count">
										{{datum.value}}/{{datum.value}}
									</p>
								</div>
							</div>
							<p>{{datum.condition}}</p>
							<p class="has-text-right is-size-7">
								<time :datetime="getDateString(date)">{{getDateStringJa(date)}}</time>
							</p>
						</div>
					</div>
				</nuxt-link>
			</div>
		</div>
		<p class="title">未解除の実績一覧</p>
		<div class="columns is-multiline">
			<div v-for="datum in lockedAchievements" :key="datum.id" class="column is-one-third">
				<nuxt-link class="card" :to="`/achievements/${datum.id}`" :style="{display: 'block'}">
					<div class="card-image">
						<div class="image achievements-color" :style="{backgroundColor: getCategoryColor(datum.category)}"/>
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
										:value="user[datum.counter] || 0"
										:max="datum.value"
									/>
								</div>
								<div class="column is-narrow">
									<p class="subtitle is-6 achievements-count">
										{{user[datum.counter] || 0}}/{{datum.value}}
									</p>
								</div>
							</div>
							<p>{{datum.condition}}</p>
						</div>
					</div>
				</nuxt-link>
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
			achievementData: (state) => (
				state.achievementData.list
			),
			isUnauthorized: (state) => state.slackInfos.isUnauthorized,
		}),
		user() {
			return this.$store.getters['users/getById'](this.$route.params.id);
		},
		slackUser() {
			return this.$store.getters['slackInfos/getUser'](this.$route.params.id);
		},
		achievementCount() {
			return sum(Object.values(this.user.counts || {}));
		},
		name() {
			const name = get(this.slackUser, ['profile', 'display_name'], false) || get(this.slackUser, ['real_name'], false) || '匿名ユーザー';
			return `@${name}`;
		},
		achievements() {
			return this.$store.getters['achievements/getByUser'](this.$route.params.id).map(({name, date}) => ({
				name,
				date,
				datum: this.$store.getters['achievementData/getById'](name),
			})).sort((a, b) => {
				if (a.datum.difficulty && b.datum.difficulty) {
					return this.getDifficultyRank(b.datum.difficulty) - this.getDifficultyRank(a.datum.difficulty);
				}
				return 0;
			});
		},
		lockedAchievements() {
			const unlockedAchievements = new Set(this.$store.getters['achievements/getByUser'](this.$route.params.id).map(({name}) => name));
			return this.achievementData
				.filter(({id}) => !unlockedAchievements.has(id))
				.sort((a, b) => (a.category && b.category) ? a.category.localeCompare(b.category) : 0);
		},
		icon() {
			return get(this.slackUser, ['profile', 'image_72'], '/images/anonymous-icon_72.png');
		},
		icon2x() {
			return get(this.slackUser, ['profile', 'image_192'], '/images/anonymous-icon_192.png');
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
			this.$store.dispatch('slackInfos/init'),
			this.$store.dispatch('users/bindById', this.$route.params.id),
			this.$store.dispatch('users/initList'),
		]).then(() => {
			this.isLoading = false;
		});
	},
	methods: {
		getCategoryColor(category) {
			return getCategoryColor(category);
		},
		getDifficultyRank(difficulty) {
			return {baby: 1, easy: 2, medium: 3, hard: 4, professional: 5}[difficulty] || 0;
		},
		getDateString(date) {
			const d = new Date(date.seconds * 1000);
			return d.toISOString().split('T')[0];
		},
		getDateStringJa(date) {
			const d = new Date(date.seconds * 1000);
			return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
		},
	},
	head() {
		return {
			title: `${this.name}の解除した実績一覧 - achievement-viewer`,
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
