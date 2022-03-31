<template>
  <GenericModal :closeModal="toggleModal" :isOpen="isOpen">
    <div class="h-full w-full bg-[#140e2d] py-4 border-1 rounded-2xl border-gray-100">
      <div class="flex flex-col justify-center items-center w-full h-full">
        <div class="mt-4">
          <label class="lg:text-2xl text-xl text-gray-300 font-semibold">
          Congratulations! Your wallet address is eligible for the airdrop.
          </label>
          <p class="text-sm font-light py-4 text-gray-300">
            {{address}}
          </p>
          <div class="w-full flex flex-col lg:flex-row justify-around items-center px-0 mx-0">
            <div class="flex justify-center flex-col items-center text-center">
              <label class="flex items-center text-gray-300 text-xl font-semibold">
              Total Rewards
              </label>
              <label class="flex items-center text-gray-300 text-lg font-light">
              {{calculatedRewards.breakdown.total}} CHEQ
              </label>
            </div>
          </div>
          <div class="w-full flex flex-col lg:flex-row justify-around items-center px-0 mx-0">
            <div class="flex justify-center flex-col items-center text-center">
              <label class="flex items-center text-gray-300 text-xl font-semibold">
              Withdrawn
              </label>
              <label class="flex items-center text-gray-300 text-lg font-light">
              {{calculatedRewards.breakdown.withdrawn}} CHEQ
              </label>
            </div>
          </div>
          <div class="w-full flex flex-col lg:flex-row justify-around items-center px-0 mx-0">
            <div class="flex justify-center flex-col items-center text-center">
              <label class="flex items-center text-gray-300 text-xl font-semibold">
              Pending
              </label>
              <label class="flex items-center text-gray-300 text-lg font-light">
              {{calculatedRewards.breakdown.pending}} CHEQ
              </label>
            </div>
          </div>
          <div 
            v-if="calculatedRewards.breakdown.pending + calculatedRewards.breakdown.withdrawn < calculatedRewards.breakdown.total"
            class="w-full flex flex-col lg:flex-row justify-around items-center px-0 mx-0"
          >
            <div class="flex items-center lg:items-start flex-col">
              <label class="flex items-center gap-1 py-2 text-gray-300 text-md lg:text-lg font-semibold">
                <XIcon
					v-if="!calculatedRewards.breakdown.tier_1"
                  class="text-red-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                <CheckIcon
					v-if="!!calculatedRewards.breakdown.tier_1"
                  class="text-green-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                OSMO Staking - {{calculatedRewards.breakdown.tier_1}} CHEQ
              </label>
              <label class="flex items-center gap-1 py-2 text-gray-300 text-lg font-semibold">
                <XIcon
					v-if="!calculatedRewards.breakdown.tier_2"
                  class="text-red-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                <CheckIcon
					v-if="!!calculatedRewards.breakdown.tier_2"
                  class="text-green-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                ATOM Staking - {{calculatedRewards.breakdown.tier_2}} CHEQ
              </label>
              <label class="flex items-center gap-1 py-2 text-gray-300 text-md lg:text-lg font-semibold">
                <XIcon
					v-if="!calculatedRewards.breakdown.tier_3"
                  class="text-red-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                <CheckIcon
					v-if="!!calculatedRewards.breakdown.tier_3"
                  class="text-green-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                JUNO Staking - {{calculatedRewards.breakdown.tier_3}} CHEQ
              </label>
              <label class="flex items-center gap-1 py-2 text-gray-300 text-md lg:text-lg font-semibold">
                <XIcon
					v-if="!calculatedRewards.breakdown.tier_4"
                  class="text-red-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                <CheckIcon
					v-if="!!calculatedRewards.breakdown.tier_4"
                  class="text-green-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                CHEQ Staking - {{calculatedRewards.breakdown.tier_4}} CHEQ
              </label>
              <label class="flex items-center gap-1 py-2 text-gray-300 text-md lg:text-lg font-semibold">
                <XIcon
					v-if="!calculatedRewards.breakdown.tier_5"
                  class="text-red-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                <CheckIcon
					v-if="!!calculatedRewards.breakdown.tier_5"
                  class="text-green-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                Liquidity Pool 602 on Osmosis - {{calculatedRewards.breakdown.tier_5}} CHEQ
              </label>
              <label class="flex items-center gap-1 py-2 text-gray-300 text-md lg:text-lg font-semibold">
                <XIcon
					v-if="!calculatedRewards.breakdown.tier_6"
                  class="text-red-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                <CheckIcon
					v-if="!!calculatedRewards.breakdown.tier_6"
                  class="text-green-600 h-4 w-4 lg:h-6 lg:w-6"
                  />
                Liquidity Pool 617 on Osmosis - {{calculatedRewards.breakdown.tier_6}} CHEQ
              </label>
            </div>
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
            v-if="calculatedRewards.breakdown.pending + calculatedRewards.breakdown.withdrawn < calculatedRewards.breakdown.total"
            @click="claimRewards(address)"
            class="inline-flex justify-center px-4 py-2 text-md font-medium bg-cheqd-purple-light border border-gray-100 rounded-md hover:bg-cheqd-purple-light focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cheqd-purple-light-500"
            >
            <svg 
              :class="claimState.inProgress ? 'animate-spin' : ''"
              v-if="claimState.inProgress"
              class="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-200" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
              >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            <BeakerIcon v-if="!claimState.inProgress" class="w-6 h-6 fill-inherit text-gray-200" />
            <span class="text-gray-200">
            Claim
            </span>
          </button>
        </div>
      </div>
    </div>
  </GenericModal>
	<StatusModal
		:isOpen="claimState.isModalOpen"
		:address="address"
		:message="claimState.message"
		:toggleModal="toggleClaimModal"
		:success="claimState.success"
	/>
</template>

<script setup lang="ts">
	// @ts-ignore
	import { ref, defineProps, PropType, reactive } from 'vue';
	import {CheqdRest } from '../server/api/cheqd';
	import type { CalculateRewards } from '../server/api/cheqd';
	const cr = new CheqdRest();

	let claimInProgress = ref(false);

	let claimState = reactive({
		isModalOpen: false,
		success: false,
		inProgress: false,
		message: '',
	});

	const toggleClaimModal = () => {
		claimState.isModalOpen = !claimState.isModalOpen
	}

	const claimRewards = async (addr: string) => {
		claimState.inProgress = true
		// error handling is done on server side
		// if there's an error in this api call, user will be taken to an error page
		const { valid, data } = await cr.claimRewards(addr)
		if (!valid) {
			claimState.message = data.message
			claimState.success = false;
			claimState.inProgress = false;
			return
		}

		/*if (valid && data.withdrawn) {
			claimState.message = data.message
			claimState.success = true;
			claimState.inProgress = false;
			props.toggleModal()
			claimState.isModalOpen = true;
			return
		}*/

		claimState.success = true
		claimState.message = data.message;
		claimState.inProgress = false
	}


	const props = defineProps({
		toggleModal: Function,
		isOpen: Boolean,
		address: String,
		calculatedRewards: Object as PropType<CalculateRewards>
	})
</script>

<script lang="ts">
	import { CheckIcon, XIcon, BeakerIcon } from '@heroicons/vue/outline'
	import StatusModal from './statusModal.vue';
	export default {
		name: "CalculateModal",
		components: {
			CheckIcon,
			XIcon,
			BeakerIcon,
			StatusModal,
		}
	}
</script>
<style>

</style>
