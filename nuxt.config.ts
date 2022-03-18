import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
	routes: {
		'/*': { prerender: true },
	},
	build: {
		postcss: {
			postcssOptions: {
				plugins: {
					tailwindcss: {},
					autoprefixer: {},
				},
			},
		},
	},
	css: [
		"~/assets/css/main.css"
	],
	nitro: {
		preset: 'cloudflare'
	}
})
