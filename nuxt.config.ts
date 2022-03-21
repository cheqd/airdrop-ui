import { AxiosError } from 'axios'
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
	errorHandler: (error: AxiosError, context: any) => {
		clearError({redirect: '/error'})
	},
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


