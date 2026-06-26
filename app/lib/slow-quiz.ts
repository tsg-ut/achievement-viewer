interface SlowQuizGame {
	question: string;
	answer: string;
	ruby: string;
	hint: string | null;
	genre: string;
	author: string;
	startDate: number;
	registrationDate: number;
	finishDate: number;
	correctAnswers: Array<{
		user: string;
		progress: number;
		date?: number;
		days?: number;
	}>;
	wrongAnswers: Array<{
		user: string;
		answer: string;
		date?: number;
		days?: number;
	}>;
	comments: Array<{user: string; answer: string; date?: number; days?: number}>;
}

interface VisibleQuestionTextResult {
	text: string;
	invisibleCharacters: number;
}

const getVisibleQuestionText = (
	game: SlowQuizGame,
	gameProgress: number,
): VisibleQuestionTextResult => {
	if (game.question.split('/').length >= 5) {
		return {text: '', invisibleCharacters: 0};
	}

	const characters = Array.from(game.question);
	let text = '';
	let progress = 0;
	let isInParenthesis = false;
	let invisibleCharacters = 0;
	for (const character of characters) {
		if (progress >= gameProgress) {
			progress++;
			invisibleCharacters++;
		} else {
			text += character;
			if (isInParenthesis) {
				if (character === '】') {
					isInParenthesis = false;
				}
			} else {
				if (character === '【') {
					isInParenthesis = true;
				} else {
					progress++;
				}
			}
		}
	}

	return {text, invisibleCharacters};
};

export const getQuestionText = (
	game: SlowQuizGame,
	gameProgress: number,
): string => {
	if (game.question.split('/').length >= 5) {
		const tokens = game.question.split('/');

		const visibleTokens = tokens.slice(0, gameProgress);
		const invisibleTokens = tokens.slice(gameProgress);

		const visibleText = visibleTokens.join('');
		const invisibleText = invisibleTokens
			.map((token, i) =>
				Array.from(token)
					.map((char, j, tokenChars) => {
						if (
							i === invisibleTokens.length - 1 &&
							j === tokenChars.length - 1 &&
							['。', '？', '?'].includes(char)
						) {
							return char;
						}
						return '◯';
					})
					.join('​'),
			)
			.join('/');

		return `${visibleText}​${invisibleText}`;
	}

	const characters = Array.from(game.question);
	const lastCharacter = characters[characters.length - 1];
	const {text, invisibleCharacters} = getVisibleQuestionText(
		game,
		gameProgress,
	);
	const invisibleText = Array(invisibleCharacters)
		.fill('')
		.map((_, i) => {
			if (
				i === invisibleCharacters - 1 &&
				['。', '？', '?'].includes(lastCharacter ?? '')
			) {
				return lastCharacter;
			}
			return '◯';
		})
		.join('​');

	return `${text}​${invisibleText}`;
};

export const getMaxProgress = (game: SlowQuizGame): number => {
	if (game.question.split('/').length >= 5) {
		const tokens = game.question.split('/');
		return tokens.length;
	}

	const normalizedQuestion = game.question.replaceAll(/【.*?】/g, '');
	return Array.from(normalizedQuestion).length;
};

export type {SlowQuizGame};
