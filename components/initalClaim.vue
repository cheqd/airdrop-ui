<template>
	<div class="h-full w-full py-4">
		<div class="w-full flex px-4 justify-center">
			<form class="w-96" action="submit">
					<div class="flex items-center px-2">
						<label for={label} class="block text-md text-gray-800">{{label}}</label>
					</div>
					<input 
						class="block h-14 w-full px-4 py-2 text-gray-800 bg-white border rounded-md focus:border-orange-600 focus:outline-orange-300 focus:ring-orange-700"
						placeholder="cosmos address"
   />
					<span class="text-red-400">{{error}}</span>
					<div class="flex justify-center gap-4 py-4">
					<button
						class="cursor-pointer inline-flex justify-center w-1/3 x-2 py-2 text-lg max-w-md font-medium
						text-white bg-orange-400 rounded-md hover:bg-orange-500 focus:outline-none
						focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
						>
						Calculate
						</button>
					<button
						class="cursor-pointer inline-flex justify-center w-1/3 px-2 py-2 text-lg max-w-md font-medium
						text-white bg-orange-400 rounded-md hover:bg-orange-500 focus:outline-none
						focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
						>
						Claim
						</button>
					</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: "InitalClaim",
}
</script>

<script setup>
import {defineProps} from 'vue';

defineProps({
	error: String,
	label: String,
})
</script>

<style>

</style>
