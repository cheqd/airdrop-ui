<template>
	<div class="flex flex-col gap-3 justify-center items-center w-1/5 2xl:gap-10">
		<!-- Need to add some padding at the top of Cheqd Logo -->
		<div class="h-5"/>

		<picture>
			<img class="pl-5 w-56 2xl:w-64" src="assets/images/cheqd-logo-wordmark-black.png" />
		</picture>
		<div class="mt-4">
			<Menu :v-slot="{ open }" as="div" class="relative inline-block text-left">
				<div  class="max-w-md">
					<MenuButton @click="handleDropdownMenu"
						class="cursor-pointer inline-flex justify-center w-full px-5 py-4 text-sm font-medium text-white bg-cheqd-dark-purple rounded-md hover:bg-opacity-60 :outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
						<label class="cursor-pointer" v-show="!walletAddress">Connect Keplr Wallet</label>
						<label class="cursor-pointer truncate max-w-[15rem]" :v-show="walletAddress">{{walletAddress}}</label>
						<ChevronDownIcon v-show="walletAddress" class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100" aria-hidden="true" />
					</MenuButton>
				</div>
				<transition
					enter-active-class="transition duration-100 ease-out"
					enter-from-class="transform scale-95 opacity-0"
					enter-to-class="transform scale-100 opacity-100"
					leave-active-class="transition duration-75 ease-in"
					leave-from-class="transform scale-100 opacity-100"
					leave-to-class="transform scale-95 opacity-0"
				>
					<div v-show="open">
						<MenuItems static
							class="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<div class="px-1 py-1 bg-gray-100">
								<MenuItem v-slot="{ active }">
									<button @click="copyAddrToClipboard"
										:class="[
										active ? 'bg-blue-200 text-black' : 'text-gray-700',
										'group flex rounded-md items-center w-full px-2 py-2 text-sm',
										]"
									>
										Copy Address
									</button>
								</MenuItem>
								<MenuItem v-slot="{ active }">
									<button @click="disconnectKeplr"
										:class="[ active ? 'bg-blue-200 text-black' : 'text-gray-700',
										'group flex rounded-md items-center w-full px-2 py-2 text-sm', ]"
									>
										Disconnect
									</button>
								</MenuItem>
							</div>
						</MenuItems>
					</div>
				</transition>
			</Menu>
		</div>
	<div>
    <Faq />
  </div>
</div>
</template>

<script >
</script>

<script setup lang="ts" type="module">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import {ref, onBeforeMount} from 'vue';
import {Keplr} from '../server/api/keplr';
import { useToast, } from "vue-toastification";
const toast = useToast();
const showToast = (msg: string, options?:any) => toast(msg, options);

const keplr = new Keplr();

let walletAddress = ref('');
let open = ref(false);

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
