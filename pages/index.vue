<template>
	<div class="h-full w-full min-h-screen overflow-y-hidden overflow-x-hidden">
		<GetStarted />
	</div>
</template>

<script setup lang="ts">
	// @ts-ignore
	import GetStarted from '../components/getStarted.vue';

	import { provideToast } from "vue-toastification";
	import "vue-toastification/dist/index.css";

	provideToast({maxToasts: 5});
</script>

<style>

</style>
