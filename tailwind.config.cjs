const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			boxShadow: {
				lg: '0px 4px 40px rgba(0, 0, 0, 0.08)'
			}
		}
	},

	plugins: [typography, forms]
};

module.exports = config;
