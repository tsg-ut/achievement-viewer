<template>
	<div class="SlowQuizGame box">
		<nav class="pagination" aria-label="pagination">
			<a
				class="pagination-previous"
				:class="{'is-disabled': progress === 1}"
				@click="decrementProgress"
			>
				1文字減らす
			</a>
			<a
				class="pagination-next"
				:class="{'is-disabled': progress === maxProgress}"
				@click="incrementProgress"
			>
				1文字増やす
			</a>

			<ul class="pagination-list">
				<li v-if="progress >= 3">
					<a class="pagination-link" @click="gotoProgress(1)"> 1 </a>
				</li>
				<li v-if="progress >= 4">
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<li v-if="progress >= 2">
					<a class="pagination-link" @click="gotoProgress(progress - 1)">
						{{ progress - 1 }}
					</a>
				</li>
				<li>
					<a class="pagination-link is-current">{{ progress }}</a>
				</li>
				<li v-if="progress <= maxProgress - 1">
					<a class="pagination-link" @click="gotoProgress(progress + 1)">
						{{ progress + 1 }}
					</a>
				</li>
				<li v-if="progress <= maxProgress - 3">
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<li v-if="progress <= maxProgress - 2">
					<a class="pagination-link" @click="gotoProgress(maxProgress)">
						{{ maxProgress }}
					</a>
				</li>
			</ul>
		</nav>

		<h2 class="is-size-3 has-text-weight-bold question-text">
			{{ questionText }}
		</h2>

		<p class="has-text-grey has-text-right is-size-6">
			{{ getUserName(game.author) }}
			の問題 / {{ formattedStartDate }}出題 / ジャンル: {{ formattedGenre }}
		</p>

		<ol class="correct-answers">
			<li v-for="answer in game.correctAnswers" :key="answer.user">
				<img
					class="answer-icon"
					:src="getUserIcon(answer.user)"
					:srcset="`${getUserIcon(answer.user)} 1x, ${getUserIcon2x(answer.user)} 2x`"
				>
				{{ getUserName(answer.user) }}
				({{ answer.progress }}文字)
				<a class="button is-small" @click="() => gotoProgress(answer.progress)">
					ここまで表示
				</a>
			</li>
		</ol>
		<div class="card game-answer">
			<header
				class="card-header"
				@click="isAnswerPanelShown = !isAnswerPanelShown"
			>
				<p class="card-header-title">正解を表示する</p>
				<button type="button" class="card-header-icon">
					<span class="icon">
						<arrow-up-icon v-if="isAnswerPanelShown" />
						<arrow-down-icon v-else />
					</span>
				</button>
			</header>
			<div v-if="isAnswerPanelShown" class="card-content">
				<div class="content">
					<div class="is-size-3 has-text-weight-bold question-text">
						Q. {{ game.question }}
					</div>
					<div class="is-size-3 has-text-weight-bold question-text">
						A.
						<span class="has-text-success has-background-success-light"
							>{{ game.answer }}</span
						>
					</div>
					<p class="pt-1">読み: {{ game.ruby }}</p>
					<p v-if="game.hint !== null">ヒント: {{ game.hint }}</p>

					<hr>

					<div class="timeline">
						<div v-for="chunk in timelineChunks" :key="chunk[0]">
							<div class="timeline-header-wrapper">
								<header class="timeline-header">
									<span class="tag is-primary">{{ chunk[0] }}日目</span>
								</header>
								<div class="has-text-grey-light is-size-7">
									{{ getQuestionTextAtProgress(chunk[1][0]!.progress) }}
								</div>
							</div>
							<div
								v-for="item in chunk[1]"
								:key="item.date"
								class="timeline-item"
							>
								<div class="timeline-marker is-warning is-image is-32x32">
									<img
										:src="getUserIcon(item.user)"
										:srcset="`${getUserIcon(item.user)} 1x, ${getUserIcon2x(item.user)} 2x`"
									>
								</div>
								<div class="timeline-content">
									<p class="heading">{{ formatTime(item.date) }}</p>
									<p :class="{'has-text-info': item.type === 'comment'}">
										<span
											:class="{'has-text-weight-bold': item.type !== 'comment'}"
											>{{ item.answer }}</span
										>
										<span
											v-if="item.type === 'correctAnswer'"
											class="tag is-danger"
											>正解</span
										>
									</p>
								</div>
							</div>
						</div>
						<header class="timeline-header">
							<span class="tag is-medium is-primary">回答終了</span>
						</header>
					</div>
					<ul>
						<li>問題登録: {{ formattedRegistrationTime }}</li>
						<li>出題: {{ formattedStartTime }}</li>
						<li>回答終了: {{ formattedFinishTime }}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import first from 'lodash/first.js';
import groupBy from 'lodash/groupBy.js';
import last from 'lodash/last.js';
import sortBy from 'lodash/sortBy.js';
import {computed, ref, watch} from 'vue';
import ArrowDownIcon from 'vue-ionicons/dist/ios-arrow-down.vue';
import ArrowUpIcon from 'vue-ionicons/dist/ios-arrow-up.vue';
import type {SlowQuizGame} from '@/lib/slow-quiz.js';
import {getMaxProgress, getQuestionText} from '@/lib/slow-quiz.js';
import {
	getUserIcon2x as getUserIcon2xByUser,
	getUserIcon as getUserIconByUser,
	getUserName as getUserNameByUser,
} from '@/lib/utils.js';
import {useStore} from '~/plugins/vuex.js';

const props = defineProps<{
	game: SlowQuizGame & {id: string};
	progressType: string;
}>();

const store = useStore();
const progress = ref(1);
const isAnswerPanelShown = ref(false);

const getUser = computed(() => store.getters['slackInfos/getUser']);

const questionText = computed(() =>
	getQuestionText(props.game, progress.value),
);
const maxProgress = computed(() => getMaxProgress(props.game));

const formattedStartDate = computed(() =>
	dayjs(props.game.startDate).format('YYYY年M月D日'),
);
const formattedStartTime = computed(() =>
	dayjs(props.game.startDate).format('YYYY-MM-DD HH:mm:ss'),
);
const formattedRegistrationTime = computed(() =>
	dayjs(props.game.registrationDate).format('YYYY-MM-DD HH:mm:ss'),
);
const formattedFinishTime = computed(() =>
	dayjs(props.game.finishDate).format('YYYY-MM-DD HH:mm:ss'),
);

const formattedGenre = computed(() => {
	if (props.game.genre === 'normal') {
		return '正統派';
	}
	if (props.game.genre === 'strange') {
		return '変化球';
	}
	if (props.game.genre === 'anything') {
		return 'なんでも';
	}
	return '不明';
});

interface TimelineItem {
	user: string;
	answer?: string;
	date?: number;
	days?: number;
	progress?: number;
	type: 'comment' | 'correctAnswer' | 'wrongAnswer';
}

const timelineChunks = computed(() => {
	const timelineItems: TimelineItem[] = [
		...props.game.comments.map((item) => ({...item, type: 'comment' as const})),
		...props.game.correctAnswers.map((item) => ({
			...item,
			type: 'correctAnswer' as const,
		})),
		...props.game.wrongAnswers.map((item) => ({
			...item,
			type: 'wrongAnswer' as const,
		})),
	];

	const chunks = sortBy(
		Object.entries(groupBy(timelineItems, (item) => item.days)),
		([days]) => Number.parseInt(days, 10),
	);

	for (const [, items] of chunks) {
		items.sort((a, b) => (a.date ?? 0) - (b.date ?? 0));
	}

	return chunks;
});

watch(
	() => props.progressType,
	(newProgressType) => {
		if (newProgressType === 'first') {
			gotoProgress(1);
		}
		if (newProgressType === 'first-answer') {
			const answer = first(props.game.correctAnswers);
			gotoProgress(answer ? answer.progress : 1);
		}
		if (newProgressType === 'last-answer') {
			const answer = last(props.game.correctAnswers);
			gotoProgress(answer ? answer.progress : 1);
		}
		if (newProgressType === 'last') {
			gotoProgress(maxProgress.value);
		}
	},
);

function incrementProgress() {
	if (progress.value < maxProgress.value) {
		progress.value++;
	}
}

function decrementProgress() {
	if (progress.value > 1) {
		progress.value--;
	}
}

function gotoProgress(p: number) {
	progress.value = p;
}

function getUserName(userId: string) {
	return getUserNameByUser(getUser.value(userId));
}

function getUserIcon(userId: string) {
	return getUserIconByUser(getUser.value(userId));
}

function getUserIcon2x(userId: string) {
	return getUserIcon2xByUser(getUser.value(userId));
}

function formatTime(time: number | undefined) {
	return dayjs(time ?? 0).format('HH:mm:ss');
}

function getQuestionTextAtProgress(p: number | undefined) {
	return getQuestionText(props.game, p ?? 0);
}
</script>

<style>
.SlowQuizGame .question-text {
	word-break: break-all;
}

.SlowQuizGame .correct-answers {
	margin: 0 1.5rem;
}

.SlowQuizGame .correct-answers li {
	margin: 0.5em 0;
}

.SlowQuizGame .correct-answers .answer-icon {
	vertical-align: text-bottom;
}

.SlowQuizGame .game-answer .card-header {
	cursor: pointer;
}

.SlowQuizGame .timeline-marker img {
	width: 100%;
}

.SlowQuizGame .timeline .timeline-item {
	padding-bottom: 0;
}

.SlowQuizGame .timeline .timeline-item:last-child {
	padding-bottom: 1rem;
}

.SlowQuizGame .timeline .timeline-content {
	word-break: break-all;
}

.SlowQuizGame .timeline .timeline-content .heading {
	margin-bottom: 0;
}

.SlowQuizGame .timeline .timeline-header-wrapper {
	display: flex;
}
</style>
