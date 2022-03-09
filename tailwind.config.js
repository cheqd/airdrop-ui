module.exports = {
	important: true,
	mode: 'jit',
	content: [
		'./assets/**/*.{vue,js,css}',
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
}
