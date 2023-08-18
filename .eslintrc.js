module.exports = {
	root: true,
	env: {
	  browser: true,
	  es2022: true,
	},
	parserOptions: {
	  ecmaVersion: 12,
	  parser: '@typescript-eslint/parser',
	},
	extends: [
	  'plugin:vue/vue3-recommended',
	  'airbnb-base',
	  'plugin:prettier/recommended',
	],
	plugins: ['prettier'],
	settings: {
	  'import/resolver': {
		typescript: {},
	  },
	},
	globals: {
		ElMessage: "readonly",
		ElMessageBox: "readonly",
		ElLoading: "readonly",
	  },
	rules: {
	  'prettier/prettier': 'error',
	  'vue/multi-word-component-names': 'off',
	  'import/extensions': [
		2,
		'ignorePackages',
		{
		  js: 'never',
		  jsx: 'never',
		  ts: 'never',
		  tsx: 'never',
		},
	  ],
	  'import/no-extraneous-dependencies': 0,
	},
  };
  