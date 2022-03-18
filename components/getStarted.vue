<template>
	<div class="h-full min-h-screen w-full flex-col items-center flex justify-start px-4 rounded-lg xl:mx-8" >
		<div class="w-full h-full mx-4">
			<div class="flex items-center justify-center px-4">
				<label class="text-4xl font-bold text-gray-100 text-center">CHEQ Community Airdrop</label>
			</div>

			<div class="h-1/3 px-8  w-full flex flex-col items-center justify-center sm:items-center sm:pt-0 2xl:justify-start 2xl:items-center 2xl:mt-8">
				<div 
					class="h-full w-2/3 bg-gray-900 bg-opacity-60 flex flex-col justify-center items-center 
					border-2 border-gray-300 rounded-2xl">
				<div class="py-4 px-8">
					<label class="font-semibold text-center text-3xl text-gray-100">Claim Airdrop</label>
				</div>
				<div class="h-full w-full px-8 text-center flex justify-center items-center">
				  <span class="text-lg text-gray-100">
					  Connect your wallet using Keplr Extension or enter your wallet to calculate your rewards
				  </span>
				</div>
				<div class="h-full w-full flex-col pt-2 gap-2 flex items-center">
				  <button @click="handleWalletConnect" class="rounded-lg w-96 bg-gray-600 gap-2 hover:bg-gray-800 max-w-md py-3 px-4 inline-flex justify-center items-center">
					  <svg class="h-8 w-8 fill-inherit text-gray-100" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						  <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
													  d="M6.4 0H25.6C29.1347 0 32 2.86539 32 6.4V25.6C32 29.1347 29.1347 32 25.6 32H6.4C2.86539 32 0 29.1347 0 25.6V6.4C0 2.86539 2.86539 0 6.4 0ZM11.264 17.28V27.2H7.04004V4.8H11.264V14.272L19.776 4.8H25.024V4.928L15.072 15.648L25.856 26.944V27.2H20.64L11.264 17.28Z"/>
					  </svg>
					  <span class="font-semibold text-gray-100">
						  Connect Keplr
					  </span>
				  </button>
				  <label class="px-4 font-semibold text-gray-100">Or</label>
				  <button :class="!showClaimForm ? 'mb-10' : ''" @click="toggleCheqdAddr" class="rounded-lg w-96 gap-2 bg-gray-600 border-cheqd-dark-purple hover:bg-gray-800 border-2 border-solid max-w-md py-3 px-4 inline-flex justify-center items-center">
					  <img class="w-8 h-8" src="https://aryteric.sirv.com/Images/cheqd-logo-light.png" alt="">
					  <span class="font-semibold text-gray-100">
						  Continue with your CHEQ Address
					  </span>
				  </button>
			  </div>
			  <div class="w-full h-full" v-if="showClaimForm">
				  <InitialClaim :address="address" />
			  </div>
		  </div>
	  </div>
  </div>
	</div>
</template>


<script lang="ts" type="module">
import DefaultLayout from '../layouts/default.vue';
import InitialClaim from './initalClaim.vue';

export default {
	layout: DefaultLayout,
	components: {
		InitialClaim,
	}
}
</script>

<script setup lang="ts" type="module">
	import {onBeforeMount, ref} from 'vue';

	import {Keplr} from '../server/api/keplr';
	import {CheqdRest} from '../server/api/cheqd';
	const keplr = new Keplr();
	const cheqdRest = new CheqdRest();
	

	import { useToast } from "vue-toastification";
    const toast = useToast();
	const showToast = (msg: string, options?:any) => toast(msg, options);
	let initalClaimDone = ref(true);
	let showClaimForm = ref(false);
	let address = ref('');

	const toggleCheqdAddr = async () => {
		const claimed = await cheqdRest.getInitalClaimInfo();
		if (!claimed) {
			initalClaimDone.value = false;
		}
		showClaimForm.value = !showClaimForm.value
	}

	const getWalletAddress = async () => {
		const {data, error } = await keplr.getCheqAddress()
		if (data) {
			return data;
		}

		throw error;

	}

	onBeforeMount(async () => {
		const { data, error } = await keplr.getAddressFromLocalStorage();
		if (data) {
			address.value = data;
			return
		}

		console.error('onBeforeMount - getStarted: ', error)

	})

	const handleWalletConnect = async () => {
		const { error } = await keplr.keplrSuggestChain()
		if (error) {
			showToast(error, { type: "error" })
			return
		}

		const claimed = await cheqdRest.getInitalClaimInfo();
		if (!claimed) {
			const {data, error } = await keplr.getCheqAddress()
			if (error) {
				showToast(error, {type: "error"})
				return
			}

			address.value = data;
			console.log('addrss: ', data)
			initalClaimDone.value = false;
			showClaimForm.value = true
			return
		}

		window.location.href="/stage-2"
	}
</script>

<style>

</style>
