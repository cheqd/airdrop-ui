<template>
	<client-only>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="overflow-y-auto fixed inset-1 z-10">
      <div class="fixed inset-0 z-10 overflow-y-auto min-h-screen">
        <div class="min-h-screen px-2 w-full h-full text-center">
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
              class="inline-block relative p-5 bg-white w-1/2 text-center container max-w-5xl overflow-hidden align-middle transition-all transform shadow-xl rounded-2xl"
            >
			<div class="-mx-5 z-0 -mt-8">
				<picture>
					<img class="-z-10" src="assets/images/modal-bg-red.png" alt="mission-1" />
				</picture>
			</div>
              <DialogTitle
                as="h3"
                class="text-2xl w-full -mt-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute font-bold text-center leading-6 z-50 text-orange-200"
              >
				{{title}}
              </DialogTitle>

			  <div class="flex flex-col justify-center items-center w-full h-full">
              <div class="mt-4">
                <p class="text-lg font-semibold text-gray-600">
					{{detail}}
                </p>
              </div>

              <div class="mt-4 px-4 flex w-full justify-end gap-4">
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-1 text-md font-medium text-orange-900 bg-red-200 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  @click="closeModal"
                >
					Close
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-1 text-md font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
	detail: String,
	closeModal: Function,
	nextFunc: Function,
})

</script>

