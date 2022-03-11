<template>
	<div class="flex justify-center py-8 px-4">
		<label class="text-6xl font-bold text-center">CHEQ Community Airdrop</label>
	</div>
	<div class="h-full p-8 w-full flex flex-col items-center justify-center min-h-[30vh] sm:items-center sm:pt-0 2xl:justify-start 2xl:items-center 2xl:mt-8">
		<div class="h-full w-full bg-orange-200 flex flex-col py-4 justify-center items-center border-4 border-orange-400 rounded-2xl">
		<div class="self-start px-8">
			<label class="font-semibold text-3xl text-gray-700">Claim Airdrop</label>
		</div>
			<div class="h-full w-full flex justify-center items-center">
				<button @click="handleWalletConnect" class="rounded-lg gap-2 bg-orange-100 border-orange-400 hover:bg-orange-50 border-2 border-solid max-w-md py-3 px-4 inline-flex items-center">
					<svg class="h-8 w-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
							d="M6.4 0H25.6C29.1347 0 32 2.86539 32 6.4V25.6C32 29.1347 29.1347 32 25.6 32H6.4C2.86539 32 0 29.1347 0 25.6V6.4C0 2.86539 2.86539 0 6.4 0ZM11.264 17.28V27.2H7.04004V4.8H11.264V14.272L19.776 4.8H25.024V4.928L15.072 15.648L25.856 26.944V27.2H20.64L11.264 17.28Z"/>
					</svg>
					<span class="font-semibold">
						Connect Keplr
					</span>
				</button>
				<label class="px-4 font-semibold ">Or</label>
				<button class="rounded-lg gap-2 bg-orange-100 border-orange-400 hover:bg-orange-50 border-2 border-solid max-w-md py-3 px-4 inline-flex items-center">
					<img class="w-8 h-8" src="assets/images/cheqd-icon-logo.png" alt="">
					<span class="font-semibold">
						Continue with your CHEQ Address
					</span>
				</button>
			</div>
			<div class="h-full w-full py-4 px-4 flex justify-center items-center">
				<span class="text-lg font-semibold">Connect your wallet using Keplr Extension or enter your wallet to calculate your rewards</span>
			</div>
		</div>
	</div>
</template>


<script lang="ts">
import DefaultLayout from '../layouts/default.vue';

export default {
	layout: DefaultLayout,
}
</script>

<script setup lang="ts">
	import {ref, onBeforeMount} from 'vue';

	import {Keplr} from '../server/api/keplr';
	const keplr = new Keplr();
	import { useToast, TYPE as toastType } from "vue-toastification";
    const toast = useToast();
	const showToast = (msg: string, options?:any) => toast(msg, options);

	onBeforeMount(async () => {
		try {
			const address = await keplr.getCheqAddress()
			window.location.href = "/claim"
		} catch (err) {
			showToast(err, {type: 'error'})
		}
	})

	const handleWalletConnect = () => {
		keplr.keplrSuggestChain().then(async data => {
			const addr = await keplr.getCheqAddress()
			keplr.storeAddressLocally(addr);
			window.location.href="/claim"
		}).catch(err => {
			showToast(err, { type: "error" })
		})
	}
</script>

<style>

</style>
