<template>
  <GenericModal :closeModal="toggleModal" :isOpen="isOpen">
    <div class="h-full w-full bg-[#140e2d] py-10 px-10 border-1 rounded-2xl border-gray-100">
      <div class="flex flex-col justify-center items-center w-full h-full">
        <div v-if="success && !withdrawn" class="mt-4 mb-4">
          <label class="lg:text-2xl text-xl text-gray-300 font-semibold">
	          🥳 Congratulations! Your CHEQ token rewards are on the way!
          </label>
        </div>
        <div v-if="!success" class="mt-4 mb-4">
          <label class="lg:text-2xl text-xl text-gray-300 font-semibold">
			      😭 Sorry! Your wallet address is ineligible.
          </label>
        </div>
        <div v-if="success && withdrawn && ( breakdown?.pending + breakdown?.withdrawn >= breakdown?.total )" class="mt-4 mb-4">
          <label class="lg:text-2xl text-xl text-gray-300 font-semibold">
	          🤗 Oops! You've already claimed your reward.
          </label>
        </div>
        <div v-if="success && withdrawn && ( breakdown?.pending + breakdown?.withdrawn >= breakdown?.total )">
          <div class="w-full flex flex-col lg:flex-row justify-around items-center px-0 mx-0">
            <div class="flex justify-center flex-col items-center text-center">
              <label class="flex items-center text-gray-300 text-xl font-semibold">
              Total Rewards
              </label>
              <label class="flex items-center text-gray-300 text-lg font-light">
              {{breakdown.total}} CHEQ
              </label>
            </div>
          </div>
          <div class="w-full flex flex-col lg:flex-row justify-around items-center px-0 mx-0">
            <div class="flex justify-center flex-col items-center text-center">
              <label class="flex items-center text-gray-300 text-xl font-semibold">
              Withdrawn
              </label>
              <label class="flex items-center text-gray-300 text-lg font-light">
              {{breakdown.withdrawn}} CHEQ
              </label>
            </div>
          </div>
          <div class="w-full flex flex-col lg:flex-row justify-around items-center px-0 mx-0">
            <div class="flex justify-center flex-col items-center text-center">
              <label class="flex items-center text-gray-300 text-xl font-semibold">
              In Progress
              </label>
              <label class="flex items-center text-gray-300 text-lg font-light">
              {{breakdown.pending}} CHEQ
              </label>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <label v-html="message" class="lg:text-base text-lg text-gray-300 font-light">
          </label>
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
        </div>
      </div>
    </div>
  </GenericModal>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';

	const gotoExplorer = (addr: string) => {
		window.open(`https://explorer.cheqd.io/accounts/${addr}`)
	}
	const props = defineProps({
		isOpen: Boolean,
		success: Boolean,
		withdrawn: Boolean,
		message: String,
		address: String,
		toggleModal: Function,
    breakdown: Object
	})
</script>


<script lang="ts">
import { XIcon, }from '@heroicons/vue/outline'
export default {
	name: "StatusModal",
	components: {
		XIcon,
	}
}
</script>

<style>

</style>
