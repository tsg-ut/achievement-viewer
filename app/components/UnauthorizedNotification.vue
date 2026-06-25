<template>
	<div v-if="isUnauthorized" class="notification is-danger">
		<span v-if="required">
			このページの閲覧にはログインが必要です。<a :href="loginUrl"
				>こちら</a
			>からログインしてください。
		</span>
		<span v-else>
			ログインしていないためユーザー名などの情報は表示されません。あなたがTSGerである場合は<a
				:href="loginUrl"
				>こちら</a
			>からログインしてください。
		</span>
	</div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useStore} from 'vuex';

withDefaults(
	defineProps<{
		required?: boolean;
	}>(),
	{
		required: false,
	},
);

const store = useStore();
const url = ref('');

const isUnauthorized = computed(
	() => store.state.slackInfos.isUnauthorized as boolean,
);
const loginUrl = computed(() => {
	const returnToPath = `/?return_to=${encodeURIComponent(url.value)}`;
	return `https://slackbot-api.tsg.ne.jp/oauth2/start?rd=${encodeURIComponent(returnToPath)}`;
});

if (import.meta.client) {
	url.value = location.href;
}
</script>
