<template>
	<client-only>
	<div class="h-full min-h-[100vh] w-full flex flex-col justify-center items-center">
		<div class="py-4">
			<label class="text-5xl font-bold text-gray-100 2xl:text-6xl">CHEQ Airdrop</label>
			{{scope}}
		</div>

		<div class="h-full py-8 w-5/6 bg-gray-900 bg-opacity-60 flex flex-col justify-center items-center border-2
			border-gray-300 rounded-2xl"
		>
			<div class="flex flex-col text-center ">
				<label class="text-3xl font-semibold text-gray-200 2xl:text-5xl">Claim Airdrop</label>
				<span class="text-lg text-gray-200 mt-2 2xl:mt-4 2xl:text-2xl">
					Connect your wallet using Keplr Extension or enter your wallet to calculate your rewards
				</span>
			</div>

			<div class="h-16" />

			<div class="flex justify-center items-center w-full flex-col gap-4">
				  <button @click="handleWalletConnect"
					  class="rounded-lg w-96 bg-gray-600 gap-2 hover:bg-gray-800 max-w-md h-16 px-4 inline-flex justify-center items-center 2xl:h-20 2xl:w-3/5">
					  <svg class="h-8 w-8 fill-inherit text-gray-100" viewBox="0 0 32 32" fill="none">
						  <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
													  d="M6.4 0H25.6C29.1347 0 32 2.86539 32 6.4V25.6C32 29.1347 29.1347 32 25.6 32H6.4C2.86539 32 0 29.1347 0 25.6V6.4C0 2.86539 2.86539 0 6.4 0ZM11.264 17.28V27.2H7.04004V4.8H11.264V14.272L19.776 4.8H25.024V4.928L15.072 15.648L25.856 26.944V27.2H20.64L11.264 17.28Z"/>
					  </svg>
					  <span class="font-semibold text-gray-100 2xl:text-xl">
						  Connect Keplr
					  </span>
				  </button>
				  <label class="px-4 font-semibold text-gray-100 2xl:text-xl">Or</label>
				  <button :class="!showClaimForm ? 'mb-10' : ''" @click="toggleCheqdAddr"
					  class="rounded-lg w-96 bg-gray-600 gap-2 hover:bg-gray-800 max-w-md h-16 px-4 inline-flex justify-center items-center 2xl:h-20 2xl:w-3/5">
					  <img class="w-8 h-8" src="assets/images/cheqd-icon-logo.png" alt="">
					  <span class="font-semibold text-gray-100 2xl:text-xl">
						  Continue with your CHEQ Address
					  </span>
				  </button>
			</div>
		</div>
		<div>
			<Footer />
		</div>

	</div>
	</client-only>
</template>

<script>
	export default {}
</script>

<script setup>
	import { ref } from 'vue';
	let minWindowHeight = ref('1000px')

	onBeforeMount(()=> {
		minWindowHeight.value = `min-h-[${window.screen.availHeight}px]`;
		console.log('minWindowHeight: ', minWindowHeight.value)
	})

</script>

<style>

</style>
