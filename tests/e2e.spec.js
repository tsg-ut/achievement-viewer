const {test, expect} = require('@playwright/test');

test('has title', async ({page}) => {
	await page.goto('/');
	await expect(page).toHaveTitle('achievement-viewer');
});

test('charts.js canvas is rendered', async ({page}) => {
	await page.goto('/');

	const canvas = page.locator('canvas#doughnut-chart').first();
	await canvas.waitFor({state: 'visible'});

	expect(canvas).not.toBeNull();

	const renderedCanvas = await page.locator('canvas#doughnut-chart.chartjs-render-monitor').first();
	await renderedCanvas.waitFor({state: 'visible'});

	expect(renderedCanvas).not.toBeNull();
});

test('table is rendered', async ({page}) => {
	await page.goto('/');

	const h2 = page.getByRole('heading', {
		name: '最近のアクティビティ',
	});
	await h2.waitFor({state: 'visible'});

	expect(h2).not.toBeNull();

	const tr = page.locator('h2 + table tr').first();
	await tr.waitFor({state: 'visible'})

	const trCount = await h2.evaluateHandle((el) => ( 
		Array.from(
			el.nextElementSibling
			.querySelectorAll('tr')
		).length
	));

	expect(await trCount.jsonValue()).toBeGreaterThan(0);
});
