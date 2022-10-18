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
			{{getUserName(game.author)}} の問題
		</p>
		<ol class="correct-answers">
			<li v-for="answer in game.correctAnswers" :key="answer.user">
				<span class="icon">
					<img
						class="index-icon"
						:src="getUserIcon(answer.user)"
						:srcset="`${getUserIcon(answer.user)} 1x, ${getUserIcon2x(answer.user)} 2x`"
					>
				</span>
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
import get from 'lodash/get.js';
import {mapGetters} from 'vuex';
import {getQuestionText, getMaxProgress} from '@/components/utils/slow-quiz';

export default {
	components: true,
	props: ['game'],
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
</style>

