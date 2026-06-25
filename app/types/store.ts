export interface AchievementData {
	id: string;
	title: string;
	condition: string;
	difficulty: 'baby' | 'easy' | 'medium' | 'hard' | 'professional';
	category: string;
	counter: string | null;
	value: number;
	count?: number;
}

export interface Achievement {
	id: string;
	name: string;
	user: string;
	date: {seconds: number};
}

export interface AchievementStat {
	id: string;
	count: number;
}

export interface SlackUser {
	id: string;
	real_name?: string;
	profile?: {
		display_name?: string;
		image_24?: string;
		image_48?: string;
		image_72?: string;
		image_192?: string;
	};
	[counterName: string]: unknown;
}

export interface TopicMessage {
	message: {
		ts: string;
		text?: string;
		user?: string;
		username?: string;
		icons?: {image_48?: string};
		reactions?: Array<{name: string; count: number}>;
	};
	likes: unknown[];
	isLiked?: boolean;
	randomSortKey?: number;
}

export interface OneiromancyMessage {
	id: string;
	message: {
		ts: string;
		text?: string;
		[key: string]: unknown;
	};
	originalMessage: {
		username?: string;
		user?: string;
		text?: string;
		[key: string]: unknown;
	};
	summary: {
		criteria: Array<{
			name: string;
			point: number;
		}>;
		luckyItem: string | null;
		messageTs: string;
		point: number | null;
	};
}

export interface OneiromancyCriterion {
	id: string;
	name: string;
	point: number;
	ts: string;
}

export interface TwentyQuestionsPlayer {
	userId: string;
	score: number | null;
	questionCount: number;
	questions: Array<{
		question: string;
		answer: string;
		timestamp: number;
		isAnswerAttempt: boolean;
		isCorrect: boolean;
	}>;
}

export interface TwentyQuestionsGame {
	id: string;
	topic: string;
	topicRuby: string;
	topicDescription: string;
	startedAt: {toDate(): Date};
	finishedAt: {toDate(): Date};
	players: TwentyQuestionsPlayer[];
}
