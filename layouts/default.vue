<template>
	<Navbar />
	<div class="bg-img w-full overflow-x-hidden overflow-y-hidden">
		<slot />
	</div>
	<Footer />
</template>

<script>
export default {
	name: "Default",
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
	.bg-img {
		background-image: url("assets/images/main-bg-orange-hr.png");
		background-repeat: 100% 100%;
		background-size: cover;
		height: 100%;
		width: 100%;
		z-index: 0;
	}
</style>
