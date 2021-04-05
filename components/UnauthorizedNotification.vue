<template>
	<div v-if="isUnauthorized" class="notification is-danger">
		ログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は<a :href="loginUrl">こちら</a>からログインしてください。
	</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	data() {
		return {
			url: '',
		};
	},
	computed: {
		...mapState({
			isUnauthorized: (state) => state.slackInfos.isUnauthorized,
		}),
		loginUrl() {
			return `https://slackbot-api.tsg.ne.jp/?return_to=${encodeURIComponent(this.url)}`;
		},
	},
	created() {
		this.url = location.href;
	},
	components: true,
}
</script>

