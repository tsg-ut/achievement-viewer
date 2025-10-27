// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,

	app: {
		head: {
			title: 'achievement-viewer',
			meta: [
				{charset: 'utf-8'},
				{name: 'viewport', content: 'width=device-width, initial-scale=1'},
				{name: 'description', content: 'TSGerが集めた実績を見られるページ'},
			],
			link: [
				{rel: 'icon', type: 'image/png', href: 'https://img.icons8.com/flat_round/512/trophy'},
			],
			htmlAttrs: {
				lang: 'ja',
			},
		},
	},

	css: [
		'bulma',
		'bulma-o-steps/bulma-steps.css',
		'bulma-timeline/dist/css/bulma-timeline.min.css',
		'remixicon/fonts/remixicon.css',
	],

	postcss: {
		plugins: {
			'postcss-preset-env': {
				features: {
					'custom-properties': false,
				},
			},
		},
	},

	nitro: {
		prerender: {
			failOnError: false,
		},
	},

	compatibilityDate: '2025-10-25',
});
