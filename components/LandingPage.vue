<template>
  <client-only>
    <div class="h-full min-h-[100vh] max-h-max w-full flex flex-col justify-start items-center 2xl:justify-center">
    <div class="py-4">
      <label class="text-5xl font-bold text-gray-100 2xl:text-6xl">CHEQ Airdrop</label>
      {{scope}}
    </div>
    <div :class="minWindowHeightPx" class="2xl:h-2/3 py-4 lg:py-8 w-5/6 bg-purple-200 bg-opacity-20 flex flex-col justify-center items-center border-1 border-gray-300 rounded-2xl"
      >
      <div class="flex flex-col text-center ">
        <span class="text-md lg:text-lg text-gray-200 mt-2 lg:mt-4 2xl:text-2xl">
        Connect your Keplr Wallet extension or enter your wallet address to calculate your rewards
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
            Connect Keplr Wallet
            </span>
          </button>
          <label class="hidden lg:block px-4 font-semibold text-gray-100 2xl:text-xl">Or</label>
          <button :class="!showClaimForm ? 'mb-10' : ''" @click="toggleCheqdAddr"
            class="rounded-lg w-5/6 bg-cheqd-dark-purple gap-2 hover:bg-opacity-60 max-w-md h-16 px-4 inline-flex justify-center items-center 2xl:h-20 2xl:w-3/5">
            <CreditCardIcon class="fill-inherit text-gray-100 h-8 w-8" />
            <span class="font-semibold text-gray-100 2xl:text-xl">
            Manually enter wallet address
            </span>
          </button>
        </div>
        <div class="w-full pt-4 h-full" v-if="showClaimForm">
          <div class="h-full w-full pt-4 lg:py-4">
            <div class="w-full flex px-4 justify-center">
              <form class="w-full lg:w-96 text-center" @submit.prevent ref="submit">
                <div class="text-center px-2">
                  <label for={label} class="block text-md text-gray-300">{{label}}</label>
                </div>
                <input 
                  class="block h-12 w-full px-4 py-2 text-gray-800 bg-white border rounded-md focus:border-purple-600 focus:outline-purple-300 focus:ring-purple-70 text-ellipsis"
                  placeholder="cheqd1... or cosmos1... or juno1... or osmo1..."
                  v-model="address"
                  name="address"
                  @input="validateAddress"
                  />
                <span v-if="!!calculateState.formError" class="capitalize font-semibold text-red-400"> {{calculateState.formError}} </span>
                <div class="flex justify-center py-4">
                  <button
                    :disabled="!!calculateState.formError || address == ''"
                    @click="calculateRewards(address)"
                    class="disabled:opacity-100 disabled:cursor-not-allowed cursor-pointer inline-flex items-center justify-center w-5/6 lg:w-3/5 x-2 py-3 text-lg max-w-md text-white bg-cheqd-dark-purple rounded-md hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                    <svg 
                      :class="calculateState.inProgress ? 'animate-spin' : ''"
                      v-if="calculateState.inProgress"
                      class="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-200" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                      >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                    Check Eligibility
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <CalculateModal 
          :toggleModal="toggleCalculateModal"
          :isOpen="calculateState.isModalOpen"
          :address="address"
          :calculatedRewards="calculateState.rewards" 
          />
        <StatusModal
          :isOpen="calculateState.isStatusModalOpen"
          :address="address"
          :message="calculateState.message"
          :toggleModal="toggleStatusModal"
          :success="calculateState.success"
		  :withdrawn="calculateState.withdrawn"
          />
      </div>
      <div class="lg:pt-10 pt-4 flex flex-col justify-center text-center gap-0 lg:gap-2 items-center w-full">
        <Footer />
      </div>
    </div>
  </client-only>
</template>

<script lang="ts" type="module">
import DefaultLayout from '../layouts/default.vue';
import CalculateModal from './calculateModal.vue';
import StatusModal from './statusModal.vue';
import { CreditCardIcon } from '@heroicons/vue/outline'

export default {
	components: {
		DefaultLayout,
		CalculateModal,
		CreditCardIcon,
		StatusModal,
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

const terms_conditions = <string> 'http://cheqd.link/airdrop-terms'
const block_explorer = <string> 'https://explorer.cheqd.io'

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
	const { data, error } = await keplr.getAddressFromLocalStorage();
	if (data) {
		address.value = data;
		return
	}
})

const handleWalletConnect = async () => {
	const { error } = await keplr.connect()
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

		calculateState.formError = ''
		address.value = data;
		initalClaimDone.value = false;
		showClaimForm.value = true
		return
	}

}

const toggleCalculateModal = () => {
	calculateState.isModalOpen = !calculateState.isModalOpen
}

const toggleStatusModal = () => {
	calculateState.isStatusModalOpen = !calculateState.isStatusModalOpen
}

const calculateState = reactive({
	isModalOpen: false,
	inProgress: false,
	success: false,
	withdrawn: false,
	isStatusModalOpen: false,
	formError: '',
	message: '',
	rewards: {},
})

const calculateRewards = async (addr: string) => {
	if (calculateState.formError) {
		calculateState.isModalOpen = false
		return
	}

	calculateState.inProgress = true;
	// error handling is done on server side
	// if there's an error in this api call, user will be taken to an error page
	const { valid, data } = await cheqdRest.checkAirdropEligibility(addr)
	if (!valid) {
		calculateState.message = `The wallet address provided is ineligible to receive CHEQ token rewards. This is either because you have submitted an invalid address, did not meet the qualification criteria for this airdrop, or due to a violation of <a class="font-semibold underline" href="${terms_conditions}">our airdrop terms & conditions</a>.`
		calculateState.inProgress = false
		calculateState.success = false
		calculateState.withdrawn = false
		calculateState.isStatusModalOpen = true
		return
	}

	if( valid && data.breakdown.total === 0 ) {
			calculateState.message = `Our records indicate that you've already submitted a claim for CHEQ tokens for all associated wallet addresses. Please note that due to the volume of distributions being carried out, it might take a few hours for the CHEQ tokens to be in your wallet. You can check the <a class="font-semibold underline" href="${block_explorer}/accounts/${address.value}">balance of your wallet on our block explorer</a>.`
			calculateState.inProgress = false
			calculateState.success = true
			calculateState.withdrawn = true
			calculateState.isStatusModalOpen = true
			return
		}

	calculateState.rewards = data
	calculateState.inProgress = false

	toggleCalculateModal();
}

const validateAddress = async (e: any) => {
	if ( e.target.value === '' ) {
		calculateState.formError =  ''
		return
	}

	try {
		const { data } = await keplr.validateCosmosNetowrkAddress(e.target.value);
		address.value = e.target.value;
		calculateState.formError = '';
	} catch (err) {
		calculateState.formError = 'Invalid address'
	}
}

</script>
