<template>
	<div>
		<Modal :title="label" :detail="detail" :closeModal="toggleModal" :nextFunc="nextFunc" :isOpen="showModal" />
	</div>
</template>

<script setup lang="ts">
	import {defineProps} from 'vue';

	const label = "Airdrop Checker"

	defineProps({
		address: String,
	})
</script>

<style>

</style>
