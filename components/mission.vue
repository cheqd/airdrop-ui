<template>
	<div  v-on:click="toggleModal" class="w-5/6 h-full cursor-pointer flex items-center bg-orange-100 justify-center rounded-md border border-orange-300 hover:bg-orange-50 py-2 my-2 2xl:py-4 2xl:my-4">
		<div class="flex justify-center items-center">
			<label for="mission-1-modal" class="cursor-pointer text-md font-semibold text-gray-700
				xl:text-2xl xl:my-4">
				{{label}}
			</label>
		</div>
		<Modal 
			:title="label" 
			:detail="detail"
			:closeModal="toggleModal"
			:nextFunc="nextFunc" 
			:isOpen="showModal" 
		/>
	</div>
</template>

<script setup lang="ts">
	import {ref, defineProps} from 'vue';

	let showModal = ref(false);

	function toggleModal() {
		showModal.value = !showModal.value
	}

	const props = defineProps({
		label: String,
		detail: String,
		nextFunc: Function,
	})
</script>

<style>

</style>
