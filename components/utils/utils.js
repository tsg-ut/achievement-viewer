import randomcolor from 'randomcolor';

const categoryColors = new Map([
	['basic', '#689F38'],
	['reactions', '#FF8F00'],
	['sushi-bot', '#D32F2F'],
	['tashibot', '#9C27B0'],
	['dajare', '#42A5F5'],
	['tahoiya', '#558B2F'],
	['mahjong', '#F57F17'],
	['shogi', '#5D4037'],
	['prime', '#1565C0'],
	['achievements', '#558B2F'],
	['manual', '#424242'],
]);

export const getCategoryColor = (category) => {
	if (categoryColors.has(category)) {
		return categoryColors.get(category);
	}

	return randomcolor({
		luminosity: 'bright',
		seed: category,
	});
};
