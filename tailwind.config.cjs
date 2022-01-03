const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			boxShadow: {
				md: '0px 4px 30px rgba(0, 0, 0, 0.05)',
				lg: '0px 4px 30px rgba(0, 0, 0, 0.08)',
				xl: '0px 4px 60px rgba(0, 0, 0, 0.1)'
			},
			colors: {
				primary: '#182552'
			}
		}
	},

	plugins: [typography, forms]
};

module.exports = config;
