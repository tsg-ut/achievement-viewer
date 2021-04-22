
export default {
	mode: 'spa',

	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: process.env.npm_package_description || ''},
		],
		link: [
			{rel: 'icon', type: 'image/png', href: 'https://img.icons8.com/flat_round/512/trophy'},
		],
		htmlAttrs: {
			lang: 'ja',
		},
	},

	loading: {color: '#fff'},

	css: [
		'bulma-o-steps/bulma-steps.css',
	],

	plugins: [
	],

	modules: [
		'@nuxtjs/bulma',
		'@nuxtjs/axios',
	],

	build: {
		postcss: {
			preset: {
				features: {
					customProperties: false,
				},
			},
		},
	},

	generate: {
		fallback: '404.html',
	},

	components: ['~/components'],
};
