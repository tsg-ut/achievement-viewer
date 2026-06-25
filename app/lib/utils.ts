import randomcolor from 'randomcolor';
import type {SlackUser} from '@/types/store.js';

const categoryColors = new Map<string, string>([
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

export const getUserName = (user: SlackUser | undefined): string => {
	const name = user?.profile?.display_name || user?.real_name || '匿名ユーザー';
	return `@${name}`;
};

export const getUserIcon = (user: SlackUser | undefined): string =>
	user?.profile?.image_24 ?? '/images/anonymous-icon_24.png';

export const getUserIcon2x = (user: SlackUser | undefined): string =>
	user?.profile?.image_48 ?? '/images/anonymous-icon_48.png';

export const getUserIcon3x = (user: SlackUser | undefined): string =>
	user?.profile?.image_72 ?? '/images/anonymous-icon_72.png';

export const getCategoryColor = (category: string): string => {
	if (categoryColors.has(category)) {
		return categoryColors.get(category)!;
	}

	return randomcolor({
		luminosity: 'bright',
		seed: category,
	});
};
