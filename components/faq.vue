<template>
	<div class="h-full my-4 flex-col items-center w-1/5 flex justify-start mt-8 py-2 rounded-lg xl:mx-4" >
		<picture>
			<img class="opacity-80" src="assets/images/cheqd-logo-wordmark-black.png" />
		</picture>
		<div class="w-full min-h-max pt-8">
			<h2 class="text-2xl pt-2 px-2 text-gray-200 text-left">FAQ</h2>
			<div v-for="(faq,i) in faqs" :key="i" 
				:class="i===0 ? border-t : 'border-t-0'"
				class="text-left border-2 border-r-0 border-l-0 border-b-red-200 cursor-pointer w-full py-2 my-2 mx-auto">
				<span class="text-sm text-gray-100 w-full">{{faq.title}}</span>
			</div>
		</div>
  </div>
</template>

<script>
import DefaultLayout from '../layouts/default.vue';

export default {
	layout: DefaultLayout,
}
</script>

<script setup>

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
