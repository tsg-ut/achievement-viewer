<template>
	<div :id="game.id" class="TahoiyaGame box">
		<h2 class="is-size-3 has-text-weight-bold">
			<a :href="`#${game.id}`">
				<span v-if="game.type === 'dictionary'"
					>{{ game.word }}（{{ game.theme }}）</span
				>
				<span v-else>{{ game.theme }}</span>
			</a>
		</h2>

		<p class="has-text-grey has-text-right is-size-6">
			{{ formattedDate }}
			<template v-if="game.sourceString">
				/ 出典: {{ game.sourceString }}</template
			>
			<template v-if="game.author">
				/ お題提供: {{ getUserName(game.author) }}</template
			>
		</p>

		<div class="meanings-section mt-4">
			<table class="table is-fullwidth meanings-table">
				<thead>
					<tr>
						<th class="meaning-type-col">種別</th>
						<th>意味</th>
						<th class="voters-col">投票者</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(meaning, index) in sortedMeanings"
						:key="index"
						:class="{'is-selected correct-row': meaning.type === 'correct'}"
					>
						<td>
							<span v-if="meaning.type === 'correct'" class="tag is-success"
								>正解</span
							>
							<span v-else-if="meaning.type === 'user'" class="meaning-user">
								<img
									class="meaning-user-icon"
									:src="getUserIcon(meaning.user ?? '')"
									:srcset="`${getUserIcon(meaning.user ?? '')} 1x, ${getUserIcon2x(meaning.user ?? '')} 2x`"
								>
								{{ getUserName(meaning.user ?? '') }}
							</span>
							<span v-else class="has-text-grey">ダミー</span>
						</td>
						<td class="meaning-text">{{ meaning.text }}</td>
						<td>
							<div class="voter-icons">
								<img
									v-for="voter in meaning.voters"
									:key="voter.user"
									class="voter-icon"
									:src="getUserIcon(voter.user)"
									:srcset="`${getUserIcon(voter.user)} 1x, ${getUserIcon2x(voter.user)} 2x`"
									:title="getUserName(voter.user)"
								>
								<span
									v-if="meaning.voters.length === 0"
									class="has-text-grey-light is-size-7"
									>なし</span
								>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div
			v-if="game.comments && game.comments.length > 0"
			class="card comments-card mt-4"
		>
			<header
				class="card-header"
				@click="isCommentsPanelShown = !isCommentsPanelShown"
			>
				<p class="card-header-title">コメント ({{ game.comments.length }}件)</p>
				<button type="button" class="card-header-icon">
					<span class="icon">
						<arrow-up-icon v-if="isCommentsPanelShown" />
						<arrow-down-icon v-else />
					</span>
				</button>
			</header>
			<div v-if="isCommentsPanelShown" class="card-content">
				<div class="content">
					<div
						v-for="comment in game.comments"
						:key="comment.timestamp"
						class="comment-item"
					>
						<img
							class="comment-icon"
							:src="getUserIcon(comment.user)"
							:srcset="`${getUserIcon(comment.user)} 1x, ${getUserIcon2x(comment.user)} 2x`"
						>
						<span class="comment-user has-text-weight-semibold"
							>{{ getUserName(comment.user) }}</span
						>
						<span class="comment-text">{{ comment.text }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import {computed, ref} from 'vue';
import ArrowDownIcon from 'vue-ionicons/dist/ios-arrow-down.vue';
import ArrowUpIcon from 'vue-ionicons/dist/ios-arrow-up.vue';
import {
	getUserIcon2x as getUserIcon2xByUser,
	getUserIcon as getUserIconByUser,
	getUserName as getUserNameByUser,
} from '@/lib/utils.js';
import type {TahoiyaGame} from '@/types/store.js';
import {useStore} from '~/plugins/vuex.js';

const props = defineProps<{
	game: TahoiyaGame;
}>();

const store = useStore();
const isCommentsPanelShown = ref(false);

const getUser = computed(() => store.getters['slackInfos/getUser']);

const formattedDate = computed(() =>
	dayjs(props.game.timestamp).format('YYYY年M月D日 HH:mm'),
);

const sortedMeanings = computed(() => {
	const order = {correct: 0, user: 1, dummy: 2} as const;
	return [...props.game.meanings].sort((a, b) => {
		if (a.type !== b.type) {
			return order[a.type] - order[b.type];
		}
		return b.voters.length - a.voters.length;
	});
});

function getUserName(userId: string) {
	return getUserNameByUser(getUser.value(userId));
}

function getUserIcon(userId: string) {
	return getUserIconByUser(getUser.value(userId));
}

function getUserIcon2x(userId: string) {
	return getUserIcon2xByUser(getUser.value(userId));
}
</script>

<style scoped>
.TahoiyaGame .meanings-table {
	table-layout: fixed;
}

.TahoiyaGame .meaning-type-col {
	width: 20%;
}

.TahoiyaGame .voters-col {
	width: 20%;
}

.TahoiyaGame .meaning-text {
	word-break: break-all;
}

.TahoiyaGame .correct-row {
	background-color: #effaf5;
}

.TahoiyaGame .meaning-user {
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
}

.TahoiyaGame .meaning-user-icon {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	flex-shrink: 0;
}

.TahoiyaGame .voter-icons {
	display: flex;
	flex-wrap: wrap;
	gap: 0.25rem;
	align-items: center;
}

.TahoiyaGame .voter-icon {
	width: 24px;
	height: 24px;
	border-radius: 50%;
}

.TahoiyaGame .comments-card .card-header {
	cursor: pointer;
}

.TahoiyaGame .comment-item {
	display: flex;
	align-items: baseline;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
}

.TahoiyaGame .comment-icon {
	width: 20px;
	height: 20px;
	border-radius: 50%;
	vertical-align: middle;
	flex-shrink: 0;
}

.TahoiyaGame .comment-text {
	word-break: break-all;
}
</style>
