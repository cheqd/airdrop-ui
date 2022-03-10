
<template>
  <div class="w-full mx-4">
	  <h2 class="text-2xl pt-2 text-orange-900 text-center font-bold">FAQ</h2>
    <div class="w-full max-w-lg p-2 mx-auto rounded-2xl">
		<Disclosure v-for="(faq, i) in faqs" :key="i" v-slot="{open}">
        <DisclosureButton
          class="flex justify-between w-full px-2 py-3 text-xs font-medium text-left text-orange-900 bg-white rounded-lg hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 2xl:px-6 2xl:text-lg"
        >
		<span>{{faq.title}}</span>
          <ChevronUpIcon
            :class="open ? 'transform rotate-180' : ''"
            class="w-5 h-5 text-orange-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-700">
		{{faq.desc}}
        </DisclosurePanel>
		<hr class="bg-orange-100 text-orange-100"/>
      </Disclosure>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/solid'

const faqs = [
	{title: "Am I eligible for the CHEQ Airdrop?", desc: "s unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architect"},
	{title: "What is CHEQ?", desc: " nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qu"},
	{title: "How do I claim the CHEQ Airdrop?", desc: " nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qu"},
	{title: "How do I stake my CHEQ?", desc: " nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qu"},
	{title: "What is a Liquidity Pool and how do I take part?", desc: " nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qu"},
	{title: "ATOM:CHEQ Liquidity Pool - 617", desc: " nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qu"},
	{title: "ATOM:OSMO Liquidity Pool - 602", desc: " nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qu"},
]
</script>
