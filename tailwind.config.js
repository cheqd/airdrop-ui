module.exports = {
	important: true,
	mode: 'jit',
	purge: [
		'./assets/**/*.{vue,js,css}',
		"./components/**/*.{js,vue,ts}",
		"./components/*.{vue}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./*.{vue,js,ts}",
		"./nuxt.config.{js,ts}",
	],
	content: [
		'./assets/**/*.{vue,js,css}',
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
	],
	theme: {
		extend: {
			colors: {
				'cheqd-dark-purple': "#201747",
				'cheqd-dark-blue': "#2c4655",
				'cheqd-purple-light': "#473a76",
				'cheqd-blue': "#003b5c",
				'cheqd-light-blue': "#0095cb",
				'cheqd-dark-gray': "#888b8d",
				'cheqd-grad-100': "#002a42",
				'cheqd-grad-200': "#132b4a",
				'cheqd-grad-300': "#2c244a",
				'cheqd-grad-50': "#da1884",
				'cheqd-grad-400': "#221c45",
			},
			backgroundImage: {
				'main-bg-orange': "url('assets/images/main-bg-orange.png')",
				'main-bg-orange-veritcal': "url('assets/images/main-bg-orange-vertical.png')",
				'modal-bg-orange': "url('assets/images/modal-bg-red.png')",
			}
		},
	},
	plugins: [],
}
