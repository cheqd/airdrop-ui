<template>
	<div class="h-full w-full pt-4 lg:py-4">
		<div class="w-full flex px-4 justify-center">
			<form class="w-full lg:w-96" @submit.prevent action="submit">
					<div class="text-center px-2">
						<label for={label} class="block text-md text-gray-300">{{label}}</label>
					</div>
					<input 
						class="block h-12 w-full px-4 py-2 text-gray-800 bg-white border rounded-md focus:border-purple-600 focus:outline-purple-300 focus:ring-purple-70 text-ellipsis"
						placeholder="cheqd1..."
						v-model="address"
						@input="handleAddressInput"
   />
					<span v-if="showFormError" class="text-red-400"> {{formError}} </span>
					<div class="flex justify-center py-4">
					<button
						@click="calculateRewards"
						class="cursor-pointer inline-flex justify-center w-5/6 lg:w-2/5 x-2 py-3 text-lg max-w-md text-white bg-cheqd-dark-purple rounded-md hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
					>
						Check Eligibility
					</button>
					</div>
			</form>
			<GenericModal :closeModal="toggleModal" :isOpen="isOpen">
			<div class="h-full w-full bg-[#140e2d] py-4 border-1 rounded-2xl border-gray-100">
				<div class="flex flex-col justify-center items-center w-full h-full">
					<div class="mt-4">
						<label class="text-2xl text-gray-300 font-semibold">Airdrop - Calculate Rewards</label>
						<p class="text-sm font-light py-4 text-gray-300">
							{{address}}
						</p>

						<div class="w-full flex justify-around items-center px-0 mx-0">
							<div class="flex justify-center flex-col items-center text-center">
								<label class="flex items-center text-gray-300 text-lg font-semibold">
									Total Rewards
								</label>
								<label class="flex items-center text-gray-300 text-lg font-semibold">
									100 CHEQ
								</label>
							</div>
							<div class="flex items-start flex-col">
								<label class="flex items-center gap-1 py-2 text-gray-300 text-lg font-semibold">
									<CheckIcon class="text-green-600 h-6 w-6" />
									Cosmos - 40 CHEQ
								</label>
								<label class="flex items-center gap-1 py-2 text-gray-300 text-lg font-semibold">
									<XIcon class="text-red-600 h-6 w-6" />
									Osmosis - 0 CHEQ
								</label>
								<label class="flex items-center gap-1 py-2 text-gray-300 text-lg font-semibold">
									<CheckIcon class="text-green-600 h-6 w-6" />
									Juno - 60 CHEQ
								</label>
							</div>
						</div>
						<div class="py-4">
							<span class="text-lg text-gray-300">
								Congratulations!! You're eligible for the airdrop.
							</span>
						</div>
					</div>

					<div class="mt-4 px-4 flex w-full justify-center gap-4">
						<button @click="toggleModal" 
							class="inline-flex justify-center px-4 py-2 text-md font-medium bg-cheqd-purple-light border border-gray-100 rounded-md hover:bg-cheqd-purple-light focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cheqd-purple-light-500 bg-opacity-20"
						>
							<XIcon class="w-6 h-6 fill-inherit text-gray-200" />
							<span class="text-gray-200">
								Close
							</span>
						</button>
						<button type="button"
							@click="() => claimInitalRewards(address)"
							class="inline-flex justify-center px-4 py-2 text-md font-medium bg-cheqd-purple-light border border-gray-100 rounded-md hover:bg-cheqd-purple-light focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cheqd-purple-light-500"
	 >
							<svg 
								:class="claimInProgress ? 'animate-spin' : ''"
								v-if="claimInProgress"
								class="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-200" 
								xmlns="http://www.w3.org/2000/svg" 
								fill="none" 
								viewBox="0 0 24 24"
							>
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
									</path>
							</svg>
							<BeakerIcon v-if="!claimInProgress" class="w-6 h-6 fill-inherit text-gray-200" />
							<span class="text-gray-200">
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
	import {Keplr} from '../server/api/keplr';
	let isOpen = ref(false);
	let claimInProgress = ref(false);
	let showFormError = ref(false);
	let formError = ref('');
	const keplr = new Keplr()

	/*
	const handleAddressInput = (e) => {
		try {
			keplr.validateCosmosNetowrkAddress(e.target.value)
		}
		catch (e) {
			showFormError.value = true;
			formError.value = e
			console.log('formerror: ', e)
			return
		}

		showFormError.value = false;
		formError.value = '';
	}
	*/

	const toggleModal = () => {
		isOpen.value = !isOpen.value
	}

	const calculateRewards = () => {
		toggleModal();
	}

	const claimInitalRewards = async (addr) => {
		const { error } = keplr.validateCosmosNetowrkAddress(addr)
		if (error) {
			showFormError.value = true;
			formError = error
			return
		}

		claimInProgress.value = true
		setTimeout(() => {
			window.location.href = "/stage-2"
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
