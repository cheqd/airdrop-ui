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
					<span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>
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
					class="inline-block relative w-[95%] lg:w-1/2 text-center container max-w-6xl overflow-hidden align-middle transition-all transform shadow-xl rounded-2xl"
				>
				<slot />
			  </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  </client-only>
</template>

<script>
	export default {
		name: "GenericModal",
	}
</script>

<script setup>
	import { defineProps } from 'vue'

	// @ts-ignore
	import {
		TransitionRoot,
		TransitionChild,
		Dialog,
		DialogOverlay,
		DialogTitle,
	} from '@headlessui/vue'

	defineProps({
		title: String,
		isOpen: Boolean,
		closeModal: Function,
	})
</script>

