<template>
	<div class="bg-img-dark">
		<div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
			<div class="px-4 lg:px-8 bg-purple-200 bg-opacity-20 backdrop-blur-sm shadow overflow-hidden sm:rounded-lg pb-8">
				<div class="text-center pt-8">
					<h1 class="text-7xl  font-bold text-purple-400">
						Error Code: {{ error.statusCode ? error.statusCode : error.response.status}}
					</h1>
					<h1 v-if="error.response.data" class="text-6xl text-gray-200 font-medium py-8">{{error.response?.data.error}}</h1>
					<h1 v-else class="text-6xl text-gray-200 font-medium py-8">{{error.message}}</h1>
					<p v-if="error.statusCode == 404 || error.response.status === 404" class="text-2xl pb-8 text-gray-300 px-12 font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
					<p v-else-if="error.description == ''" class="text-2xl pb-8 text-gray-300 px-12 font-medium">
						{{error.message}}
					</p>
					<button @click="gotoHome" class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
						HOME
					</button>
					<button @click="copyErrorToClipboard(error)" class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
						Copy Full Error
					</button>
					<button class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
						Contact Us
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';
	const gotoHome = () => {
		clearError({redirect: '/'})
	}

	const copyErrorToClipboard = (err: any) => {
		if (err.response) {
			navigator.clipboard.writeText(JSON.stringify(err.response))
			return
		}

		navigator.clipboard.writeText(JSON.stringify(err))
}


defineProps({
	error: Object,
})
</script>

<style type="text/css">
	.bg-img-dark {
		background-image: url("assets/images/main-bg-dark-violet.png");
		background-repeat: 100% 100%;
		background-size: cover;
		height: 100%;
		width: 100%;
		z-index: 0;
	}
.text-9xl{
	font-size: 14rem;
}
@media(max-width: 645px){
	.text-9xl{
		font-size: 5.75rem;
	}
	.text-6xl{
		font-size: 1.75rem;
	}
	.text-2xl {
		font-size: 1rem;
		line-height: 1.2rem;
	}
	.py-8 {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	.px-6 {
		padding-left: 1.2rem;
		padding-right: 1.2rem;
	}
	.mr-6{
		margin-right: 0.5rem;
	}
	.px-12 {
		padding-left: 1rem;
		padding-right: 1rem;
	}
}
</style>
