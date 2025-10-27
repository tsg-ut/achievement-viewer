import hakatashi from '@hakatashi/eslint-config';

export default [
	...hakatashi,
	{
		languageOptions: {
			globals: {
				defineNuxtConfig: 'readonly',
				defineNuxtPlugin: 'readonly',
				$fetch: 'readonly',
			},
		},
		rules: {
			'node/no-unsupported-features': 'off',
			'node/no-unsupported-features/es-syntax': 'off',
			'max-params': 'off',
			'vue/no-unused-vars': ['error', {
				ignorePattern: '^_',
			}],
			'vue/require-prop-comment': 'warn',
			'vue/require-prop-types': 'warn',
			'vue/multi-word-component-names': 'off',
			'vue/v-on-handler-style': 'warn', // Allow simple inline assignments
			'import/no-unresolved': 'off', // Nuxt auto-imports
			'import/no-namespace': 'off',
			'no-undef': 'off', // Covered by globals
			'no-unused-vars': 'warn',
		},
	},
	{
		ignores: [
			'.nuxt/',
			'.output/',
			'dist/',
			'node_modules/',
			'.cache/',
		],
	},
];
