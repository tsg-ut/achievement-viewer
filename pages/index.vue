<template>
	<div class="container">
		{{users}}
	</div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';

export default {
	data() {
		return {
			online: true,
		};
	},
	computed: {
		...mapGetters(['users']),
		...mapState({
			isLoading: (state) => (
				!state.users.isInitList
			),
			users: (state) => {
				if (!state.users.list) {
					return [];
				}

				return state.users.list.slice().sort((a, b) => a.id.localeCompare(b.id));
			},
		}),
	},
	async fetch({store}) {
		if (!process.browser) {
			await store.dispatch('users/bindList');
		}
	},
	mounted() {
		this.$store.dispatch('users/bindList');
	},
	methods: {
		handleClickButton() {
			if (!this.online) {
				return;
			}

			this.$store.dispatch('increment');
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
