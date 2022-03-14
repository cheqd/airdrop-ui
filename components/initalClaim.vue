<template>
	<div class="h-full w-full py-4">
		<div class="w-full flex px-4 justify-center">
			<form class="w-96" @submit.prevent action="submit">
					<div class="flex items-center px-2">
						<label for={label} class="block text-md text-gray-800">{{label}}</label>
					</div>
					<input 
						class="block h-14 w-full px-4 py-2 text-gray-800 bg-white border rounded-md focus:border-orange-600 focus:outline-orange-300 focus:ring-orange-70 text-ellipsis"
						placeholder="cosmos address"
						v-model="address"
   />
					<span class="text-red-400">{{error}}</span>
					<div class="flex justify-center gap-4 py-4">
					<button
						@click="calculateRewards"
						class="cursor-pointer inline-flex justify-center w-1/3 x-2 py-2 text-lg max-w-md font-medium
						text-white bg-orange-400 rounded-md hover:bg-orange-500 focus:outline-none
						focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
						>
						Claim
					</button>
					<!-- <button -->
					<!-- 	class="cursor-pointer inline-flex justify-center w-1/3 px-2 py-2 text-lg max-w-md font-medium -->
					<!-- 	text-white bg-orange-400 rounded-md hover:bg-orange-500 focus:outline-none -->
					<!-- 	focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" -->
					<!-- 	> -->
					<!-- 	Claim -->
					<!-- </button> -->
					</div>
			</form>
			<GenericModal :closeModal="toggleModal" :isOpen="isOpen">
			<div class="h-full w-full bg-orange-100 p-4">
				<div class="flex flex-col justify-center items-center w-full h-full">
					<div class="mt-4">
						<label class="text-2xl text-gray-700 font-semibold">Airdrop - Calculate Rewards</label>
						<p class="text-md font-semibold py-4 text-gray-500">
							{{address}}
						</p>

						<div class="w-full flex justify-around items-center px-0 mx-0">
							<div>
								<label class="flex items-center gap-1 py-2 text-gray-600 text-lg font-semibold">
									100 CHEQ
								</label>
							</div>
							<div class="flex items-start flex-col">
								<label class="flex items-center gap-1 py-2 text-gray-600 text-lg font-semibold">
									<CheckIcon class="text-green-600 h-6 w-6" />
									Cosmos
								</label>
								<label class="flex items-center gap-1 py-2 text-gray-600 text-lg font-semibold">
									<XIcon class="text-red-600 h-6 w-6" />
									Osmosis
								</label>
								<label class="flex items-center gap-1 py-2 text-gray-600 text-lg font-semibold">
									<CheckIcon class="text-green-600 h-6 w-6" />
									Juno
								</label>
							</div>
						</div>
						<div class="py-4">
							<span class="text-lg text-gray-600">
								Congratulations!! You're eligible for the airdrop.
							</span>
						</div>
					</div>

					<div class="mt-4 px-4 flex w-full justify-center gap-4">
						<button @click="toggleModal" 
							class="inline-flex justify-center px-4 py-1 text-md font-medium text-orange-900 bg-orange-50 border-2 border-orange-900 rounded-md hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
						>
							<XIcon class="w-6 h-6" />
							<span class="font-semibold">
								Close
							</span>
						</button>
						<button type="button"
							@click="claimInitalRewards"
							class="inline-flex justify-center px-4 py-1 text-md font-medium border-orange-900 border-2 text-orange-900 bg-orange-50 rounded-md hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
	 >
							<svg 
								:class="claimInProgress ? 'animate-spin' : ''"
								v-if="claimInProgress"
								class="animate-spin -ml-1 mr-3 h-6 w-6 text-orange-900" 
								xmlns="http://www.w3.org/2000/svg" 
								fill="none" 
								viewBox="0 0 24 24"
							>
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
									</path>
							</svg>
							<BeakerIcon v-if="!claimInProgress" class="w-6 h-6" />
							<span class="font-semibold">
								Claim
							</span>
						</button>
					</div>
				</div>
			</div>
			</GenericModal>
		</div>
	</div>
</template>

<script>
export default {
	name: "InitalClaim",
}
</script>

<script setup>
	import {defineProps,ref} from 'vue';
	import { CheckIcon, XIcon, BeakerIcon } from '@heroicons/vue/outline'
	import GenericModal from './genericModal.vue';
	let isOpen = ref(false);
	let claimInProgress = ref(false);

	const toggleModal = () => {
		isOpen.value = !isOpen.value
	}

	const calculateRewards = () => {
		toggleModal()
	}

	const claimInitalRewards = ()=> {
		claimInProgress.value = true
		setTimeout(() => {
			window.location.href = "/claim"
		}, 5000)
	}

defineProps({
	error: String,
	label: String,
	address: String,
})
</script>

<style>

</style>
