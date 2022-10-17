<template>
	<div class="SlowQuizGame box">
		<h2 class="is-size-3 has-text-weight-bold question-text">
			{{questionText}}
		</h2>
		<nav class="pagination" role="navigation" aria-label="pagination">
			<a class="pagination-previous">1文字減らす</a>
			<a class="pagination-next">1文字増やす</a>

			<ul class="pagination-list">
				<li>
					<a class="pagination-link" aria-label="1文字目まで表示">1</a>
				</li>
				<li>
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<li>
					<a class="pagination-link" aria-label="45文字目まで表示">45</a>
				</li>
				<li>
					<a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
				</li>
				<li>
					<a class="pagination-link" aria-label="47文字目まで表示">47</a>
				</li>
				<li>
					<span class="pagination-ellipsis">&hellip;</span>
				</li>
				<li>
					<a class="pagination-link" aria-label="86文字目まで表示">86</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import {getQuestionText} from '@/components/utils/slow-quiz';

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
			return getQuestionText(this.game, 1);
		},
	},
};
</script>

<style>
.SlowQuizGame .question-text {
  word-break: break-all;
}
</style>

