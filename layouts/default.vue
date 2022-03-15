<template>
	<div class="h-full w-full bg-img-dark">
		<div class="flex h-screen w-full backdrop-blur-0 divide-x divide-gray-400 bg-purple-200 bg-opacity-20 items-center justify-center">
			<Faq />
			<slot />
		</div>
		<Footer />
	</div>
</template>

<script>
export default {
	name: "Default",
	setup () {
		useMeta({
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
			],
		})
	}
}
</script>

<script setup>
	import { provideToast } from "vue-toastification";
	import "vue-toastification/dist/index.css";
	provideToast({maxToasts: 5});
</script>

<style>
	.bg-img-vert {
		background-image: url("assets/images/main-bg-orange-vertical.png");
		background-repeat: 100% 100%;
		background-size: cover;
		height: 100%;
		width: 100%;
		z-index: 0;
	}
	.bg-img-dark {
		background-image: url("assets/images/main-bg-dark-violet.png");
		background-repeat: 100% 100%;
		background-size: cover;
		height: 100%;
		width: 100%;
		z-index: 0;
	}
	.bg-img {
		background-image: url("assets/images/main-bg-orange-hr.png");
		background-repeat: 100% 100%;
		background-size: cover;
		height: 100%;
		width: 100%;
		z-index: 0;
	}
</style>
