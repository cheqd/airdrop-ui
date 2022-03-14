<template>
	<div class="flex justify-center py-8 px-4">
		<label class="text-6xl font-bold text-center">CHEQ Community Airdrop</label>
	</div>
	<div class="h-full p-8 w-full flex flex-col items-center justify-center min-h-[30vh] sm:items-center sm:pt-0 2xl:justify-start 2xl:items-center 2xl:mt-8">
		<div class="h-full w-2/3 bg-opacity-75 bg-orange-200 flex flex-col py-4 justify-center items-center border-4 border-orange-400 rounded-2xl">
		<div class="py-4 px-8">
			<label class="font-semibold text-center text-4xl text-gray-700">Claim Airdrop</label>
		</div>
			<div class="h-full w-full pb-8 px-4 flex justify-center items-center">
				<span class="text-lg font-semibold">Connect your wallet using Keplr Extension or enter your wallet to calculate your rewards</span>
			</div>
			<div class="h-full w-full flex-col pt-2 gap-2 flex items-center">
				<button @click="handleWalletConnect" class="rounded-lg w-96 gap-2 bg-orange-100 border-orange-400 hover:bg-orange-50 border-2 border-solid max-w-md py-3 px-4 inline-flex justify-center items-center">
					<svg class="h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
							d="M6.4 0H25.6C29.1347 0 32 2.86539 32 6.4V25.6C32 29.1347 29.1347 32 25.6 32H6.4C2.86539 32 0 29.1347 0 25.6V6.4C0 2.86539 2.86539 0 6.4 0ZM11.264 17.28V27.2H7.04004V4.8H11.264V14.272L19.776 4.8H25.024V4.928L15.072 15.648L25.856 26.944V27.2H20.64L11.264 17.28Z"/>
					</svg>
					<span class="font-semibold">
						Connect Keplr
					</span>
				</button>
				<label class="px-4 font-semibold ">Or</label>
				<button :class="!showClaimForm ? 'mb-10' : ''" @click="toggleCheqdAddr" class="rounded-lg w-96 gap-2 bg-orange-100 border-orange-400 hover:bg-orange-50 border-2 border-solid max-w-md py-3 px-4 inline-flex justify-center items-center">
					<img class="w-8 h-8" src="assets/images/cheqd-icon-logo.png" alt="">
					<span class="font-semibold">
						Continue with your CHEQ Address
					</span>
				</button>
			</div>
			<div class="w-full h-full" v-if="showClaimForm">
				<InitialClaim />
			</div>
		</div>
	</div>
</template>


<script lang="ts">
import DefaultLayout from '../layouts/default.vue';
import InitialClaim from './initalClaim.vue';

export default {
	layout: DefaultLayout,
	components: {
		InitialClaim,
	}
}
</script>

<script setup lang="ts">
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
			const {error, data} = await getWalletAddress();
			if (error) {
				showToast(error, {type: "error"})
				return
			}

			address.value = data;
			initalClaimDone.value = false;
			showClaimForm.value = true
			return
		}

		window.location.href="/claim"
	}
</script>

<style>

</style>
