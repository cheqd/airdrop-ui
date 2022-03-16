<template>
	<client-only>
	<div :class="minWindowHeight" class="h-full flex bg-img-dark flex-col">
		<!-- sidebar + dynamic content -->
		<div class="grid gap-2 grid-tmpl-col w-full h-full">
			<!-- Sidebar -->
			<div class="h-full p-4 bg-purple-200 bg-opacity-20">
				<SideBarComponent />
			</div>

			<!-- Slot -->
			<div class="w-full h-full p-4 bg-purple-200 bg-opacity-20">
				<slot />
			</div>

		</div>


		<!-- footer -->
		<!-- <div class="min-h-[8vh] h-[8vh]"> -->
		<!-- 	<Footer /> -->
		<!-- </div> -->
	</div>
	</client-only>
</template>

<script>
		import SideBarComponent from '../components/sb.vue';
export default {
	name: "Default",
	components: {
		SideBarComponent,
	},
	setup () {
		useMeta({
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
			],
		})
	},
}
</script>

<script setup>
	import {ref, onBeforeMount} from 'vue';
	import { provideToast } from "vue-toastification";
	import "vue-toastification/dist/index.css";
	provideToast({maxToasts: 5});
	let minWindowHeight = ref('1000px')
	onBeforeMount(()=> {
		minWindowHeight.value = `min-h-[${window.screen.availHeight}px]`;
		console.log('minWindowHeight: ', minWindowHeight.value)
	})
</script>

<style>
	.grid-tmpl-col {
		grid-template-columns: 25% 75%;
		grid-auto-columns: minmax(100vh, auto);
	}
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
		background-image: url("assets/images/main-bg-red.png");
		background-repeat: 100% 100%;
		background-size: cover;
		height: 100%;
		width: 100%;
		z-index: 0;
	}
</style>
