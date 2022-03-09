<template>
	<div  v-on:click="toggleModal" class="w-5/6 h-full cursor-pointer flex items-center bg-orange-100 justify-center rounded-lg border border-gray-300 py-2 my-2 2xl:py-4 2xl:my-4">
		<div class="flex justify-center items-center">
			<label for="mission-1-modal" class="cursor-pointer text-xl my-2 font-semibold text-gray-700
				2xl:text-2xl 2xl:my-4">
				{{label}}
			</label>
		</div>
		<Modal :title="label" :closeModal="toggleModal" :nextFunc="nextFunc" :isOpen="showModal" />
	</div>
</template>

<script setup lang="ts">
	import {ref, defineProps} from 'vue';

	let showModal = ref(false);

	function toggleModal() {
		showModal.value = !showModal.value
	}


	function nextFunc() {
		alert('not implemented');
	}

	const props = defineProps({
		label: String,
	})
</script>

<style>

</style>
