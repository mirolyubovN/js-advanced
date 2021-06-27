module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		babelOptions: {
			configFile: './babel.config.json'
		}
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ['graph-base'],
	rules : {
		'class-methods-use-this' : 0,
		'no-unused-vars': 0
	}
};
