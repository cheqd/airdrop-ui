<template>
	<client-only>
	<div class="h-full min-h-[100vh] max-h-max w-full flex flex-col justify-start items-center 2xl:justify-center">
		<div class="py-4">
			<label class="text-5xl font-bold text-gray-100 2xl:text-6xl">CHEQ Airdrop</label>
			{{scope}}
		</div>

		<div :class="minWindowHeightPx" class="2xl:h-1/3 py-4 lg:py-8 w-5/6 bg-purple-200 bg-opacity-20 flex flex-col justify-center items-center border-1 border-gray-300 rounded-2xl"
		>
			<div class="flex flex-col text-center ">
				<label class="text-3xl font-semibold text-gray-200 2xl:text-5xl">Claim Airdrop</label>
				<span class="text-md lg:text-lg text-gray-200 mt-2 lg:mt-4 2xl:text-2xl">
					Connect your wallet using Keplr Extension or enter your wallet to calculate your rewards
				</span>
			</div>

			<div class="h-6 lg:h-16" />

			<div class="flex justify-center items-center w-full flex-col gap-4">
				  <button @click="handleWalletConnect"
					  class="hidden lg:inline-flex rounded-lg w-5/6 bg-cheqd-dark-purple gap-2 hover:bg-opacity-60 max-w-md h-16 px-4 justify-center items-center 2xl:h-20 2xl:w-3/5">
					  <svg class="h-8 w-8 fill-inherit text-gray-100" viewBox="0 0 32 32" fill="none">
						  <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
													  d="M6.4 0H25.6C29.1347 0 32 2.86539 32 6.4V25.6C32 29.1347 29.1347 32 25.6 32H6.4C2.86539 32 0 29.1347 0 25.6V6.4C0 2.86539 2.86539 0 6.4 0ZM11.264 17.28V27.2H7.04004V4.8H11.264V14.272L19.776 4.8H25.024V4.928L15.072 15.648L25.856 26.944V27.2H20.64L11.264 17.28Z"/>
					  </svg>
					  <span class="font-semibold text-gray-100 2xl:text-xl">
						  Connect Keplr
					  </span>
				  </button>
				  <label class="hidden lg:block px-4 font-semibold text-gray-100 2xl:text-xl">Or</label>
				  <button :class="!showClaimForm ? 'mb-10' : ''" @click="toggleCheqdAddr"
					  class="rounded-lg w-5/6 bg-cheqd-dark-purple gap-2 hover:bg-opacity-60 max-w-md h-16 px-4 inline-flex justify-center items-center 2xl:h-20 2xl:w-3/5">
					  <img class="w-8 h-8" src="https://aryteric.sirv.com/Images/cheqd-icon-logo.png" alt="">
					  <span class="font-semibold text-gray-100 2xl:text-xl">
						  Continue with your wallet address
					  </span>
				  </button>
			</div>
			<div class="w-full pt-4 h-full" v-if="showClaimForm">
				<InitialClaim label="Enter your cheq, cosmos, juno or osmo address" :address="address" />
			</div>
		</div>
		<div class="lg:pt-10 pt-4 flex flex-col justify-center text-center gap-0 lg:gap-2 items-center w-full">
			<Footer />
		</div>

	</div>
	</client-only>
</template>


<script lang="ts" type="module">
import DefaultLayout from '../layouts/default.vue';
import InitialClaim from './initalClaim.vue';

export default {
	components: {
		InitialClaim,
		DefaultLayout,
	}
}
</script>

<script setup lang="ts" type="module">
	import {onBeforeMount, ref} from 'vue';

	import {Keplr} from '../server/api/keplr';
	import {CheqdRest} from '../server/api/cheqd';
	const keplr = new Keplr();
	const cheqdRest = new CheqdRest();
	
	let minWindowHeight = ref('')
	let minWindowHeightPx = ref('min-h-[300px]')

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
		minWindowHeight.value = `min-h-[${window.screen.availHeight}px]`;
		minWindowHeightPx.value = `min-h-[${Math.ceil(window.screen.availHeight*0.3)}px]`;
		console.log('minWindowHeight: ', minWindowHeightPx.value)
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

<style>

</style>
