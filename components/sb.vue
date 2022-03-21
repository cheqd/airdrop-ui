<template>
	<client-only>
	<div class="h-full min-h-[70vh] lg:min-h-screen w-full flex flex-col justify-start items-center">
		<div class="hidden lg:block pt-2">
			<a href="/">
				<img class="w-56 2xl:w-64" src="https://aryteric.sirv.com/Images/cheqd-logo-light.png" />
			</a>
		</div>

		<div>
		<div class="w-full h-full pt-8">
			<div
				class="text-left divide-y divide-gray-500 cursor-pointer w-full py-2 mx-auto">
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
			<div class="flex justify-center items-center">
				<a 
					href="https://support.cheqd.io/support/home"
					target="_blank"
					class="px-4 bg-cheqd-dark-purple cursor-pointer hover:bg-opacity-60 py-2 rounded-md text-lg
						text-gray-200 border border-gray-400"
				>
				Learn More
				</a>
			</div>
		</div>
		</div>
	</div>
	</client-only>
</template>

<script lang="ts" type="module">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { BeakerIcon } from '@heroicons/vue/outline'
import { ChevronDownIcon } from '@heroicons/vue/solid'
export default {
	name: "SideBarComponent",
	components: {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		BeakerIcon,
		ChevronDownIcon,
	}
}
</script>

<script setup lang="ts" type="module">
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
