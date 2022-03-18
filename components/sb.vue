<template>
	<client-only>
	<div class="h-full min-h-[70vh] lg:min-h-screen w-full flex flex-col justify-start items-center">
		<div class="hidden lg:block pt-2">
			<a href="/">
				<img class="w-56 2xl:w-64" src="https://aryteric.sirv.com/Images/cheqd-logo-light.png" />
			</a>
		</div>

		<!-- Button + Dropdown Menu -->
		<!-- <div class="hidden lg:block py-4"> -->
		<!-- 	<Menu :v-slot="{ open }" as="div" class="relative inline-block text-left"> -->
		<!-- 		<div  class="max-w-md"> -->
		<!-- 			<MenuButton @click="handleDropdownMenu" -->
		<!-- 				class="cursor-pointer inline-flex justify-center px-4 w-64 2xl:w-80 2xl:py-6 py-4 text-sm font-medium text-white bg-cheqd-dark-purple rounded-lg hover:bg-opacity-60 :outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"> -->
		<!-- 				<label class="cursor-pointer 2xl:text-lg" v-show="!walletAddress">Connect Keplr Wallet</label> -->
		<!-- 				<label class="cursor-pointer truncate max-w-[15rem]" :v-show="walletAddress">{{walletAddress}}</label> -->
		<!-- 				<ChevronDownIcon v-show="walletAddress" class="w-8 2xl:w-6 ml-2 -mr-1 text-gray-100 hover:text-violet-100" aria-hidden="true" /> -->
		<!-- 			</MenuButton> -->
		<!-- 		</div> -->
		<!-- 		<transition -->
		<!-- 			enter-active-class="transition duration-100 ease-out" -->
		<!-- 			enter-from-class="transform scale-95 opacity-0" -->
		<!-- 			enter-to-class="transform scale-100 opacity-100" -->
		<!-- 			leave-active-class="transition duration-75 ease-in" -->
		<!-- 			leave-from-class="transform scale-100 opacity-100" -->
		<!-- 			leave-to-class="transform scale-95 opacity-0" -->
		<!-- 		> -->
		<!-- 			<div v-show="open"> -->
		<!-- 				<MenuItems static -->
		<!-- 					class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" -->
		<!-- 				> -->
		<!-- 					<div class="px-1 py-1 bg-gray-100"> -->
		<!-- 						<MenuItem v-slot="{ active }"> -->
		<!-- 							<button @click="copyAddrToClipboard" -->
		<!-- 								:class="[ -->
		<!-- 								active ? 'bg-blue-200 text-black' : 'text-gray-700', -->
		<!-- 								'group flex rounded-md items-center w-full px-2 py-2 text-sm', -->
		<!-- 								]" -->
		<!-- 							> -->
		<!-- 								Copy Address -->
		<!-- 							</button> -->
		<!-- 						</MenuItem> -->
		<!-- 						<MenuItem v-slot="{ active }"> -->
		<!-- 							<button @click="disconnectKeplr" -->
		<!-- 								:class="[ active ? 'bg-blue-200 text-black' : 'text-gray-700', -->
		<!-- 								'group flex rounded-md items-center w-full px-2 py-2 text-sm', ]" -->
		<!-- 							> -->
		<!-- 								Disconnect -->
		<!-- 							</button> -->
		<!-- 						</MenuItem> -->
		<!-- 					</div> -->
		<!-- 				</MenuItems> -->
		<!-- 			</div> -->
		<!-- 		</transition> -->
		<!-- 	</Menu> -->
		<!-- </div> -->
		<!-- Button + Dropdown Menu End -->

		<div>
		<div class="w-full h-full pt-8">
			<div
				class="text-left divide-y divide-gray-500 cursor-pointer w-full py-2 mb-20 mx-auto">
				<h2 class="text-2xl py-2 px-2 text-gray-200 text-left">FAQ</h2>

				<p @click="openLink(0)" class="text-sm inline-flex gap-3 items-center text-gray-300 h-28 w-full 2xl:text-lg">
					<BeakerIcon class="w-8 h-8"/>
					What is Mission Two of the cheqd community airdrop?
				</p>
				<p @click="openLink(1)" class="text-sm inline-flex gap-3 items-center text-gray-300 h-28 w-full 2xl:text-lg">
					<BeakerIcon class="w-8 h-8"/>
					Am I eligible for the Mission 2, Stage 1? (staking ATOM, OSMO, JUNO)
				</p>
				<p @click="openLink(2)" class="text-sm inline-flex gap-3 items-center text-gray-300 h-28 w-full 2xl:text-lg">
					<BeakerIcon class="w-8 h-8"/>
					Am I eligible for Mission 2, Stage 2? (staking and LPing CHEQ)
				</p>
			</div>
		</div>
		</div>
	</div>
	</client-only>
</template>

<script lang="ts" type="module">
export default {
	name: "SideBarComponent",
}
</script>

<script setup lang="ts" type="module">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { BeakerIcon } from '@heroicons/vue/outline'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import {ref, onBeforeMount} from 'vue';
import {Keplr} from '../server/api/keplr';
import { useToast, } from "vue-toastification";
const toast = useToast();
const showToast = (msg: string, options?:any) => toast(msg, options);

const keplr = new Keplr();

let walletAddress = ref('');
let open = ref(false);


const openLink = (id: number) => {
	switch (id) {
		case 0: {
			window.open( 'https://support.cheqd.io/support/solutions/articles/101000384269-what-is-mission-two-of-the-cheqd-community-airdrop')
			break
		}
		case 1: {
			window.open( 'https://support.cheqd.io/support/solutions/articles/101000384272-eligibility-criteria-for-atom-osmo-and-juno-stakers ')
			break
		}
		case 2: {
			window.open( 'https://support.cheqd.io/support/solutions/articles/101000384781-eligibility-criteria-for-cheq-staking-dex-liquidity-pools')
			break
		}
	}
}

onBeforeMount(async () => {
	const {error, data } = await keplr.getAddressFromLocalStorage()
	if (error) {
		console.error(error)
		return
	}
	walletAddress.value =data
})

const disconnectKeplr = async () => {
	walletAddress.value = undefined;
	keplr.disconnect();
	window.location.href="/"
	toggleDropDown()
}

const copyAddrToClipboard = () => {
	navigator.clipboard.writeText(walletAddress.value);
	toggleDropDown()
}

const toggleDropDown =() => {
	open.value = !open.value
}

const handleDropdownMenu = async () => {
	if (!walletAddress.value || walletAddress.value === '') {
		const {error} = await keplr.keplrSuggestChain()
		if (error) {
			showToast(error, { type: "error" })
			return
		}

		const resp = await keplr.getCheqAddress()
		if (resp.error) {
			showToast(resp.error, { type: "error" })
			return
		}
		walletAddress.value = resp.data;
		return
	}

	toggleDropDown();
}
</script>


<style>

</style>
