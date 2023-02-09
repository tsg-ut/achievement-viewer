<template>
	<div v-if="isUnauthorized" class="notification is-danger">
		<span v-if="required">
			このページの閲覧にはログインが必要です。<a :href="loginUrl">こちら</a>からログインしてください。
		</span>
		<span v-else>
			ログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は<a :href="loginUrl">こちら</a>からログインしてください。
		</span>
	</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	props: {
		required: {
			type: Boolean,
			default: false,
		},
	},
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
			const returnToPath = `/?return_to=${encodeURIComponent(this.url)}`;
			return `https://slackbot-api.tsg.ne.jp/oauth2/start?rd=${encodeURIComponent(returnToPath)}`;
		},
	},
	created() {
		this.url = location.href;
	},
};
</script>

