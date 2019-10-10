import randomcolor from 'randomcolor';

const categoryColors = new Map([
	['basic', '#BDBDBD'],
	['reactions', '#FF8F00'],
	['sushi-bot', '#D32F2F'],
	['tashibot', '#9C27B0'],
	['dajare', '#42A5F5'],
	['tahoiya', '#1B5E20'],
	['mahjong', '#F57F17'],
	['shogi', '#5D4037'],
	['prime', '#1565C0'],
	['achievements', '#558B2F'],
	['manual', '#424242'],
	['pocky', '#176BEF'],
	['ricochet-robots', '#BF360C'],
	['atcoder', '#78909C'],
	['voiperrobot', '#0097A7'],
	['ahokusa', '#E57373'],
	['anime', '#004D40'],
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
