<template>
	<client-only>
	<div class="h-full min-h-[100vh] w-full flex flex-col justify-start items-center 2xl:justify-center">
		<Hero />
	</div>
	</client-only>
</template>

<script setup lang="ts" type="module">
// @ts-ignore
import Hero from '../components/hero.vue';
</script>

<style>

</style>
