import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
	{
		languageOptions: {
			globals: globals.browser,
		},
	},
	pluginJs.configs.recommended,
	{
		files: ['src/*.js'],
		rules: {
			'no-duplicate-imports': 'error',
			'dot-notation': 'warn',
		},
	},
	{
		ignores: [
			'dist',
			'node_modules',
			'webpack.common.js',
			'webpack.dev.js',
			'webpack.prod.js',
		],
	},
];
