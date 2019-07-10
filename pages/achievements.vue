<template>
	<div class="container">
		<progress v-if="isLoading" class="progress is-small is-primary" max="100">15%</progress>
		<p class="title">実績一覧</p>
		<div class="columns is-multiline">
			<div v-for="{achievements, datum, name} in ranking" :key="name" class="column is-half">
				<div class="card">
					<div class="card-content">
						<div class="content">
							<p class="title">{{datum.title}}</p>
							<div class="columns">
								<div class="column achievements-progress">
									<progress
										class="progress is-danger"
										:value="achievements.length"
										:max="ranking[0].achievements.length"
									/>
								</div>
								<div class="column is-narrow">
									<p class="subtitle is-6 achievements-count"><strong>{{achievements.length}}人</strong>が<wbr>解除済み</p>
								</div>
							</div>
							<p>{{datum.condition}}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="column is-half">
				<div class="card">
					<div class="card-content">
						<div class="content">
							<p class="title">+{{achievementData.length - ranking.length}}個の未解除の実績</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import get from 'lodash/get.js';
import groupBy from 'lodash/groupBy.js';
import {mapState} from 'vuex';
import randomcolor from 'randomcolor';

export default {
	computed: {
		...mapState({
			isLoading: (state) => (
				!state.achievements.isInitList
			),
			achievements: (state) => {
				if (!state.achievements.list) {
					return [];
				}

				return state.achievements.list.slice().sort((a, b) => a.id.localeCompare(b.id));
			},
			achievementData: (state) => (
				state.achievementData.list
			),
		}),
		ranking() {
			const entries = Object.entries(groupBy(this.achievements, ({name}) => name))
				.map(([name, achievements]) => ({
					name,
					datum: this.$store.getters['achievementData/getById'](name),
					achievements,
				}));
			entries.sort((a, b) => b.achievements.length - a.achievements.length);
			return entries;
		},
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('achievements/bindList');
		}
	},
	mounted() {
		this.$store.dispatch('achievements/initList');
		this.$store.dispatch('achievementData/initList');
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
