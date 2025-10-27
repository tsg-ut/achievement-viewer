const {test, expect} = require('@playwright/test');

test('has title', async ({page}) => {
	await page.goto('/');
	await expect(page).toHaveTitle('achievement-viewer');
});

test('charts.js canvas is rendered', async ({page}) => {
	await page.goto('/');

	// Wait for the statistics section to be visible
	await page.locator('h2:has-text("統計情報")').waitFor({state: 'visible'});

	// Wait for any canvas element to be visible
	const canvas = page.locator('canvas').first();
	await canvas.waitFor({state: 'visible', timeout: 10000});

	expect(canvas).not.toBeNull();
});

test('table is rendered', async ({page}) => {
	await page.goto('/');

	const h2 = page.getByRole('heading', {
		name: '最近のアクティビティ',
	});
	await h2.waitFor({state: 'visible'});

	expect(h2).not.toBeNull();

	const tr = page.locator('h2 + table tr').first();
	await tr.waitFor({state: 'visible'});

	const trCount = await h2.evaluateHandle((el) => (
		Array.from(
			el.nextElementSibling
				.querySelectorAll('tr'),
		).length
	));

	expect(await trCount.jsonValue()).toBeGreaterThan(0);
});
