<template>
	<div :id="game.id" class="TwentyQuestionsGame box">
		<h2 class="is-size-3 has-text-weight-bold">
			<a :href="`#${game.id}`">お題: {{game.topic}} ({{game.topicRuby}})</a>
		</h2>

		<p class="has-text-grey has-text-right is-size-6">
			{{formattedStartDate}}開始 / {{formattedFinishDate}}終了
		</p>

		<div class="players-section">
			<h3 class="is-size-5 has-text-weight-semibold mb-3">
				参加者 ({{game.players.length}}人)
			</h3>
			<div class="table-container">
				<table class="table is-fullwidth is-striped players-table">
					<thead>
						<tr>
							<th>順位</th>
							<th>プレイヤー</th>
							<th>質問数</th>
							<th>結果</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<!-- eslint-disable-next-line vue/no-v-for-template-key -->
						<template v-for="player in sortedPlayers" :key="player.userId">
							<tr>
								<td>
									<span v-if="player.score !== null" class="tag is-primary">
										{{getRank(player)}}位
									</span>
									<span v-else class="tag is-light">-</span>
								</td>
								<td>
									<img
										class="player-icon"
										:src="getUserIcon(player.userId)"
										:srcset="`${getUserIcon(player.userId)} 1x, ${getUserIcon2x(player.userId)} 2x`"
									>
									{{getUserName(player.userId)}}
								</td>
								<td>{{player.questionCount}}問</td>
								<td>
									<span v-if="player.score !== null" class="tag is-success">
										正解 ({{player.score}}問)
									</span>
									<span v-else-if="player.questionCount > 0">
										<span class="tag is-danger">不正解</span>
										<span v-if="getLastAnswer(player)" class="last-answer">
											<close-circle-icon class="last-answer-icon" w="20" h="20"/>
											{{getLastAnswer(player)}}
										</span>
									</span>
									<span v-else class="tag is-light not-answered">
										未参加
									</span>
								</td>
								<td>
									<button
										v-if="player.questionCount > 0"
										type="button"
										class="button is-small"
										@click="() => togglePlayerLog(player.userId)"
									>
										{{expandedPlayers.has(player.userId) ? '履歴を隠す' : '履歴を表示'}}
									</button>
								</td>
							</tr>
							<tr v-if="expandedPlayers.has(player.userId) && player.questionCount > 0">
								<td colspan="5" class="player-log-cell">
									<div class="player-log">
										<div class="questions-list">
											<div v-for="(question, qIndex) in player.questions" :key="qIndex" class="question-item">
												<span
													class="question-label"
													:class="{
														'has-text-success': question.isAnswerAttempt && question.isCorrect,
														'has-text-danger': question.isAnswerAttempt && !question.isCorrect,
														'has-text-info': !question.isAnswerAttempt,
													}"
												>
													<span v-if="!question.isAnswerAttempt">Q{{qIndex + 1}}</span>
													<span v-else>A</span>
												</span>
												<span class="question-time">{{formatTime(question.timestamp)}}</span>
												<span class="question-text">{{question.question}}</span>
												<span class="question-answer">
													→
													<span class="tag answer-tag" :style="getAnswerTagStyle(question.answer)">
														{{question.answer}}
													</span>
												</span>
											</div>
										</div>
									</div>
								</td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>

		<div class="card game-details mt-4">
			<header class="card-header" @click="isDetailsPanelShown = !isDetailsPanelShown">
				<p class="card-header-title">
					データシートを表示
				</p>
				<button type="button" class="card-header-icon">
					<span class="icon">
						<arrow-up-icon v-if="isDetailsPanelShown"/>
						<arrow-down-icon v-else/>
					</span>
				</button>
			</header>
			<div v-if="isDetailsPanelShown" class="card-content">
				<div class="content">
					<h4 class="is-size-5 has-text-weight-semibold">{{game.topic}} ({{game.topicRuby}})</h4>
					<pre class="topic-description">{{game.topicDescription}}</pre>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import get from 'lodash/get.js';
import ArrowDownIcon from 'vue-ionicons/dist/ios-arrow-down.vue';
import ArrowUpIcon from 'vue-ionicons/dist/ios-arrow-up.vue';
import CloseCircleIcon from 'vue-ionicons/dist/ios-close.vue';
import {mapGetters} from 'vuex';

export default {
	components: {
		ArrowDownIcon,
		ArrowUpIcon,
		CloseCircleIcon,
	},
	props: {
		game: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			expandedPlayers: new Set(),
			isDetailsPanelShown: false,
		};
	},
	computed: {
		...mapGetters('slackInfos', ['getUser']),
		formattedStartDate() {
			return dayjs(this.game.startedAt.toDate()).format('YYYY年M月D日 HH:mm');
		},
		formattedFinishDate() {
			return dayjs(this.game.finishedAt.toDate()).format('YYYY年M月D日 HH:mm');
		},
		sortedPlayers() {
			// Sort by score (ascending, nulls last), then by questionCount (ascending)
			return [...this.game.players].sort((a, b) => {
				if (a.score !== null && b.score !== null) {
					return a.score - b.score;
				}
				if (a.score !== null) {
					return -1;
				}
				if (b.score !== null) {
					return 1;
				}
				return b.questionCount - a.questionCount;
			});
		},
	},
	methods: {
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
		formatTime(timestamp) {
			return dayjs(timestamp).format('HH:mm:ss');
		},
		togglePlayerLog(userId) {
			if (this.expandedPlayers.has(userId)) {
				this.expandedPlayers.delete(userId);
			} else {
				this.expandedPlayers.add(userId);
			}
			// Force reactivity
			this.expandedPlayers = new Set(this.expandedPlayers);
		},
		getRank(player) {
			const correctPlayers = this.sortedPlayers.filter((p) => p.score !== null);
			return correctPlayers.findIndex((p) => p.userId === player.userId) + 1;
		},
		getLastAnswer(player) {
			if (!player.questions || player.questions.length === 0) {
				return '';
			}
			// isAnswerAttemptがtrueのものだけを抽出
			const answerAttempts = player.questions.filter((q) => q.isAnswerAttempt);
			if (answerAttempts.length === 0) {
				return '';
			}
			// 最後の回答を取得
			const lastAnswer = answerAttempts[answerAttempts.length - 1];
			const question = lastAnswer.question || '';
			// 先頭の「答え: 」を除去
			return question.replace(/^答え:\s*/, '');
		},
		getAnswerTagStyle(answer) {
			// Map different answers to custom colors
			const answerColorMap = {
				はい: {backgroundColor: '#48c774', color: '#fff'},
				いいえ: {backgroundColor: '#f14668', color: '#fff'},
				どちらかと言えばはい: {backgroundColor: '#a3e5b6', color: '#000'},
				どちらかと言えばいいえ: {backgroundColor: '#f9a7b8', color: '#000'},
				どちらともいえない: {backgroundColor: '#ffe08a', color: '#000'},
				わかりません: {backgroundColor: '#3e8ed0', color: '#fff'},
				答えられません: {backgroundColor: '#363636', color: '#fff'},
				'正解！': {backgroundColor: '#00aa17', color: '#fff'},
				不正解: {backgroundColor: '#ca0000', color: '#fff'},
			};
			return answerColorMap[answer] || {backgroundColor: '#f5f5f5', color: '#000'};
		},
	},
};
</script>

<style scoped>
.TwentyQuestionsGame .player-icon {
	vertical-align: text-bottom;
	margin-right: 0.25em;
}

.TwentyQuestionsGame .players-section {
	margin-top: 1.5rem;
}

.TwentyQuestionsGame .players-table {
	min-width: 40rem;
}

.TwentyQuestionsGame .players-table tr td:nth-child(1) {
	width: 8%;
}

.TwentyQuestionsGame .players-table tr td:nth-child(2) {
	width: 35%;
}

.TwentyQuestionsGame .players-table tr td:nth-child(3) {
	width: 10%;
}

.TwentyQuestionsGame .players-table tr td:nth-child(4) {
	width: 30%;
}

.TwentyQuestionsGame .game-details .card-header {
	cursor: pointer;
}

.TwentyQuestionsGame .topic-description {
	white-space: pre-wrap;
	word-break: break-word;
	padding: 1rem;
	border-radius: 4px;
	border: 1px solid currentColor;
	opacity: 0.6;
}

.TwentyQuestionsGame .player-log-cell {
	padding: 0 !important;
}

.TwentyQuestionsGame .player-log {
	padding: 1rem;
	border-top: 2px solid;
	opacity: 0.8;
}

.TwentyQuestionsGame .questions-list {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.TwentyQuestionsGame .question-item {
	display: flex;
	gap: 0.5rem;
	align-items: baseline;
	font-size: 0.875rem;
	flex-wrap: wrap;
}

.TwentyQuestionsGame .question-label {
	font-weight: bold;
	min-width: 2rem;
	flex-shrink: 0;
}

.TwentyQuestionsGame .question-time {
	opacity: 0.6;
	font-size: 0.75rem;
	min-width: 4rem;
	flex-shrink: 0;
}

.TwentyQuestionsGame .question-text {
	font-weight: 600;
	flex: 1;
	min-width: 200px;
}

.TwentyQuestionsGame .question-answer {
	font-weight: 600;
	flex: 1;
	min-width: 200px;
}

.TwentyQuestionsGame .not-answered {
	color: #333;
}

.TwentyQuestionsGame .last-answer {
	margin-left: 0.5rem;
	font-size: 0.875rem;
	font-weight: 600;
	opacity: 0.8;
	display: inline-flex;
	align-items: center;
	gap: 0.25rem;
	vertical-align: middle;
}

.TwentyQuestionsGame .last-answer-icon {
	flex-shrink: 0;
}

.TwentyQuestionsGame .last-answer-icon :deep(svg) {
	display: block;
	fill: #ff3860;
}
</style>
