<template>
	<div class="SlowQuizGame box">
		<h2 class="is-size-3 has-text-weight-bold question-text">
			{{questionText}}
		</h2>
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
	</div>
</template>

<script>
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
	},
};
</script>

<style>
.SlowQuizGame .question-text {
  word-break: break-all;
}
</style>

