<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">15%</progress>
		<div class="box">
			<h1 class="title is-size-1 ">{{title}}<DifficultyBadge :difficulty="difficulty" /></h1>
			<h2 class="subtitle">{{condition}}</h2>
		</div>
		<div class="block">{{count}}人が解除済み</div>
		<div class="block">
			<nuxt-link v-for="user in users" :key="user.id" :to="`/users/${user.id}`">
				<img :src="getIcon(user)" />
			</nuxt-link>
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
			return get(this.achievementDatum, ['count'], '');
		},
		difficulty() {
			return get(this.achievementDatum, ['difficulty'], '');
		},
		users() {
			const users = this.$store.getters['achievements/getByName'](this.$route.params.id).map(({name, date, user}) => ({
				name,
				date,
				user: this.$store.getters['users/getById'](user),
			})).sort((a, b) => {
				return a.date - b.date;
			}).map(({user}) => user);
			console.log(users);
			return users;
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
			this.$store.dispatch('users/initList'),
		]).then(() => {
			this.isLoading = false;
		});
	},
	methods: {
		getIcon(user) {
			return get(user, ['info', 'profile', 'image_72'], 'https://placehold.it/72x72');
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
