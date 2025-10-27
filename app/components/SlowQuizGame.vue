<template>
	<div class="SlowQuizGame box">
		<nav class="pagination" role="navigation" aria-label="pagination">
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
					<a
						class="pagination-link"
						@click="gotoProgress(1)"
					>
						1
					</a>
				</li>
				<li v-if="progress >= 4">
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<li v-if="progress >= 2">
					<a
						class="pagination-link"
						@click="gotoProgress(progress - 1)"
					>
						{{progress - 1}}
					</a>
				</li>
				<li>
					<a class="pagination-link is-current">{{progress}}</a>
				</li>
				<li v-if="progress <= maxProgress - 1">
					<a
						class="pagination-link"
						@click="gotoProgress(progress + 1)"
					>
						{{progress + 1}}
					</a>
				</li>
				<li v-if="progress <= maxProgress - 3">
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<li v-if="progress <= maxProgress - 2">
					<a
						class="pagination-link"
						@click="gotoProgress(maxProgress)"
					>
						{{maxProgress}}
					</a>
				</li>
			</ul>
		</nav>

		<h2 class="is-size-3 has-text-weight-bold question-text">
			{{questionText}}
		</h2>

		<p class="has-text-grey has-text-right is-size-6">
			{{getUserName(game.author)}} の問題 / {{formattedStartDate}}出題 / ジャンル: {{formattedGenre}}
		</p>

		<ol class="correct-answers">
			<li v-for="answer in game.correctAnswers" :key="answer.user">
				<img
					class="answer-icon"
					:src="getUserIcon(answer.user)"
					:srcset="`${getUserIcon(answer.user)} 1x, ${getUserIcon2x(answer.user)} 2x`"
				>
				{{getUserName(answer.user)}}
				({{answer.progress}}文字)
				<a
					class="button is-small"
					@click="gotoProgress(answer.progress)"
				>
					ここまで表示
				</a>
			</li>
		</ol>
		<div class="card game-answer">
			<header class="card-header" @click="isAnswerPanelShown = !isAnswerPanelShown">
				<p class="card-header-title">
					正解を表示する
				</p>
				<button type="button" class="card-header-icon">
					<span class="icon">
						<arrow-up-icon v-if="isAnswerPanelShown"/>
						<arrow-down-icon v-else/>
					</span>
				</button>
			</header>
			<div v-if="isAnswerPanelShown" class="card-content">
				<div class="content">
					<div class="is-size-3 has-text-weight-bold question-text">
						Q. {{game.question}}
					</div>
					<div class="is-size-3 has-text-weight-bold question-text">
						A. <span class="has-text-success has-background-success-light">{{game.answer}}</span>
					</div>
					<p class="pt-1">読み: {{game.ruby}}</p>
					<p v-if="game.hint !== null">ヒント: {{game.hint}}</p>

					<hr>

					<div class="timeline">
						<div v-for="chunk in timelineChunks" :key="chunk[0]">
							<div class="timeline-header-wrapper">
								<header class="timeline-header">
									<span class="tag is-primary">{{chunk[0]}}日目</span>
								</header>
								<div class="has-text-grey-light is-size-7">{{getQuestionText(chunk[1][0].progress)}}</div>
							</div>
							<div v-for="item in chunk[1]" :key="item.date" class="timeline-item">
								<div class="timeline-marker is-warning is-image is-32x32">
									<img
										:src="getUserIcon(item.user)"
										:srcset="`${getUserIcon(item.user)} 1x, ${getUserIcon2x(item.user)} 2x`"
									>
								</div>
								<div class="timeline-content">
									<p class="heading">{{formatTime(item.date)}}</p>
									<p :class="{'has-text-info': item.type === 'comment'}">
										<span :class="{'has-text-weight-bold': item.type !== 'comment'}">{{item.answer}}</span>
										<span v-if="item.type === 'correctAnswer'" class="tag is-danger">正解</span>
									</p>
								</div>
							</div>
						</div>
						<header class="timeline-header">
							<span class="tag is-medium is-primary">回答終了</span>
						</header>
					</div>
					<ul>
						<li>問題登録: {{formattedRegistrationTime}}</li>
						<li>出題: {{formattedStartTime}}</li>
						<li>回答終了: {{formattedFinishTime}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import first from 'lodash/first.js';
import get from 'lodash/get.js';
import groupBy from 'lodash/groupBy.js';
import last from 'lodash/last.js';
import sortBy from 'lodash/sortBy.js';
import ArrowDownIcon from 'vue-ionicons/dist/ios-arrow-down.vue';
import ArrowUpIcon from 'vue-ionicons/dist/ios-arrow-up.vue';
import {mapGetters} from 'vuex';
import {getQuestionText, getMaxProgress} from '@/lib/slow-quiz';

export default {
	components: {
		ArrowDownIcon,
		ArrowUpIcon,
	},
	props: {
		game: {
			type: Object,
			required: true,
		},
		progressType: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			progress: 1,
			isAnswerPanelShown: false,
		};
	},
	computed: {
		...mapGetters('slackInfos', ['getUser']),
		questionText() {
			return getQuestionText(this.game, this.progress);
		},
		maxProgress() {
			return getMaxProgress(this.game);
		},
		formattedStartDate() {
			return dayjs(this.game.startDate).format('YYYY年M月D日');
		},
		formattedStartTime() {
			return dayjs(this.game.startDate).format('YYYY-MM-DD HH:mm:ss');
		},
		formattedRegistrationTime() {
			return dayjs(this.game.registrationDate).format('YYYY-MM-DD HH:mm:ss');
		},
		formattedFinishTime() {
			return dayjs(this.game.finishDate).format('YYYY-MM-DD HH:mm:ss');
		},
		formattedGenre() {
			if (this.game.genre === 'normal') {
				return '正統派';
			}
			if (this.game.genre === 'strange') {
				return '変化球';
			}
			if (this.game.genre === 'anything') {
				return 'なんでも';
			}
			return '不明';
		},
		timelineChunks() {
			const timelineItems = [
				...this.game.comments.map((item) => ({...item, type: 'comment'})),
				...this.game.correctAnswers.map((item) => ({...item, type: 'correctAnswer'})),
				...this.game.wrongAnswers.map((item) => ({...item, type: 'wrongAnswer'})),
			];

			const chunks = sortBy(
				Object.entries(groupBy(timelineItems, (item) => item.days)),
				([days]) => parseInt(days),
			);

			for (const [, items] of chunks) {
				items.sort((a, b) => (a.date || 0) - (b.date || 0));
			}

			return chunks;
		},
	},
	watch: {
		progressType(newProgressType) {
			if (newProgressType === 'first') {
				this.gotoProgress(1);
			}
			if (newProgressType === 'first-answer') {
				const answer = first(this.game.correctAnswers);
				this.gotoProgress(answer ? answer.progress : 1);
			}
			if (newProgressType === 'last-answer') {
				const answer = last(this.game.correctAnswers);
				this.gotoProgress(answer ? answer.progress : 1);
			}
			if (newProgressType === 'last') {
				this.gotoProgress(this.maxProgress);
			}
		},
	},
	methods: {
		incrementProgress() {
			if (this.progress < this.maxProgress) {
				this.progress++;
			}
		},
		decrementProgress() {
			if (this.progress > 1) {
				this.progress--;
			}
		},
		gotoProgress(progress) {
			this.progress = progress;
		},
		getUserName(userId) {
			const user = this.getUser(userId);
			const name = get(user, ['profile', 'display_name'], false) || get(user, ['real_name'], false) || '匿名ユーザー';
			return `@${name}`;
		},
		getUserIcon(userId) {
			const user = this.getUser(userId);
			return get(user, ['profile', 'image_24'], '/images/anonymous-icon_24.png');
		},
		getUserIcon2x(userId) {
			const user = this.getUser(userId);
			return get(user, ['profile', 'image_48'], '/images/anonymous-icon_48.png');
		},
		formatTime(time) {
			return dayjs(time || 0).format('HH:mm:ss');
		},
		getQuestionText(progress) {
			return getQuestionText(this.game, progress);
		},
	},
};
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

