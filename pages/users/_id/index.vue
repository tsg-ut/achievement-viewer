<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">15%</progress>
		<div class="columns">
			<div class="column is-narrow">
				<img :src="icon">
			</div>
			<div class="column">
				<p class="title">{{name}}の解除した実績一覧</p>
				<div class="columns">
					<div class="column achievements-progress">
						<progress
							class="progress is-success"
							:value="achievements.length"
							:max="achievementData.length"
						/>
					</div>
					<div class="column is-narrow">
						<p class="subtitle is-6 achievements-count">
							{{achievements.length}}/{{achievementData.length}}達成済み
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="columns is-multiline">
			<div v-for="{datum, name: id, date} in achievements" :key="id" class="column is-one-third">
				<div class="card">
					<div class="card-content">
						<div class="content">
							<p class="title">{{datum.title}}</p>
							<div v-if="datum.counter" class="columns">
								<div class="column achievements-progress">
									<progress
										class="progress is-success"
										:value="user[datum.counter]"
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
						</div>
					</div>
				</div>
			</div>
		</div>
		<p class="title">未解除の実績一覧</p>
		<div class="columns is-multiline">
			<div v-for="datum in lockedAchievements" :key="datum.name" class="column is-one-third">
				<div class="card">
					<div class="card-content">
						<div class="content">
							<p class="title">??????</p>
							<div v-if="datum.counter" class="columns">
								<div class="column achievements-progress">
									<progress
										class="progress is-gray"
										:value="user[datum.counter]"
										:max="datum.value"
									/>
								</div>
								<div class="column is-narrow">
									<p class="subtitle is-6 achievements-count">
										{{user[datum.counter]}}/{{datum.value}}
									</p>
								</div>
							</div>
							<p>{{datum.condition}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import get from 'lodash/get.js';
import {mapState} from 'vuex';
import randomcolor from 'randomcolor';

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
		}),
		user() {
			return this.$store.getters['users/getById'](this.$route.params.id);
		},
		name() {
			const name = get(this.user, ['info', 'profile', 'display_name'], false) || get(this.user, ['info', 'real_name'], false) || this.user.id;
			return `@${name}`;
		},
		achievements() {
			return this.$store.getters['achievements/getByUser'](this.$route.params.id).map(({name, date}) => ({
				name,
				date,
				datum: this.$store.getters['achievementData/getById'](name),
			}));
		},
		lockedAchievements() {
			const unlockedAchievements = new Set(this.$store.getters['achievements/getByUser'](this.$route.params.id).map(({name}) => name));
			return this.achievementData.filter(({id}) => !unlockedAchievements.has(id));
		},
		icon() {
			return get(this.user, ['info', 'profile', 'image_72'], 'https://placehold.it/72x72');
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
			this.$store.dispatch('users/bindById', this.$route.params.id),
		]).then(() => {
			this.isLoading = false;
		});
	},
	methods: {
		handleClickButton() {
			if (!this.online) {
				return;
			}

			this.$store.dispatch('increment');
		},
		getColor(id) {
			return randomcolor({
				luminosity: 'bright',
				seed: id,
			});
		},
		getUserName(user) {
			const name = get(user, ['info', 'profile', 'display_name'], false) || get(user, ['info', 'real_name'], false) || user.id;
			return `@${name}`;
		},
	},
	head() {
		return {
			title: 'achievement-viewer',
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
</style>
