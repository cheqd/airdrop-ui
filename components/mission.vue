<template>
	<div  v-on:click="toggleModal" class="w-5/6 h-full cursor-pointer flex items-center bg-cheqd-dark-purple justify-center rounded-md hover:bg-opacity-60 py-4 my-2 2xl:py-8 2xl:my-4">
		<div class="flex justify-center text-center items-center">
			<label for="mission-1-modal" class="cursor-pointer text-md font-semibold text-gray-200 xl:text-2xl xl:my-4">
				{{label}}
			</label>
		</div>
		<Modal 
			:title="label" 
			:detail="detail"
			:closeModal="toggleModal"
			:nextFunc="nextFunc" 
			:isOpen="showModal" 
			:bgImgPath="bgImgPath"
		/>
	</div>
</template>

<script setup lang="ts">
	import {ref, defineProps} from 'vue';

	let showModal = ref(false);

	function toggleModal() {
		showModal.value = !showModal.value
	}

	defineProps({
		label: String,
		detail: String,
		bgImgPath: String,
		nextFunc: Function,
	})
</script>

<style>

</style>
