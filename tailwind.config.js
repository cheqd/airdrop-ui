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
		extend: {
			backgroundImage: {
				'main-bg-orange': "url('assets/images/main-bg-orange.png')",
				'main-bg-orange-veritcal': "url('assets/images/main-bg-orange-vertical.png')",
				'modal-bg-orange': "url('assets/images/modal-bg-red.png')",
			}
		},
	},
	plugins: [],
}
