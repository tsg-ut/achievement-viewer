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
	</div>
</template>

<script>
import dayjs from 'dayjs';
import first from 'lodash/first.js';
import get from 'lodash/get.js';
import last from 'lodash/last.js';
import {mapGetters} from 'vuex';
import {getQuestionText, getMaxProgress} from '@/components/utils/slow-quiz';

export default {
	components: true,
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
			return dayjs(this.game.startDate).format('YYYY年M月DD日');
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
</style>

