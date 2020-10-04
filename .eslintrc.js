module.exports = {
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended-with-formatting',
	],
	env: {
		browser: true,
	},
	rules: {
		camelcase: [ 'error', {
			allow: [
				'in_category',
				'in_tag',
			],
		} ],
	},
};
