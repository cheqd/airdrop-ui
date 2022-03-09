<template>
	<client-only>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="overflow-y-auto fixed inset-0 z-10">
      <div class="fixed inset-0 z-10 overflow-y-auto min-h-screen">
        <div class="min-h-screen px-4 w-full h-full text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black opacity-40" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block bg-white w-2/3 max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-2xl font-semibold text-center leading-6 text-black"
              >
				{{title}}
              </DialogTitle>
				  <div class="-mx-6 -mt-12">
					  <picture>
						  <img src="assets/images/colored-mission-1.png" alt="mission-1" />
					  </picture>
				  </div>

			  <div class="flex flex-col justify-center items-center w-full h-full">
              <div class="mt-4">
                <p class="text-lg text-gray-500">
					You can manage your CHEQ Tokens by <a href="https://cheqd.omniflix.co" target="_blank" class="border-none focus:border-none font-semibold text-blue-500">Omniflix</a>
You can use your CHEQ tokens to publish dids on chain, trade in exchanges, stake to earn reward, vote to participate in governance, and reward creators.
                </p>
              </div>

              <div class="mt-4 flex w-full justify-end gap-4">
                <button
                  type="button"
                  class="inline-flex justify-center px-8 py-2 text-md font-medium text-orange-900 bg-orange-100 border border-transparent rounded-md hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  @click="closeModal"
                >
				Close
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center px-8 py-2 text-md font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
				  @click="nextFunc"
                >
				Next
                </button>
              </div>
			  </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  </client-only>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogOverlay,
	DialogTitle,
} from '@headlessui/vue'

const props = defineProps({
	isOpen: Boolean,
	title: String,
	closeModal: Function,
	nextFunc: Function,
})

</script>

