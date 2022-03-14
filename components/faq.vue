
<template>
	<div class="w-full mx-4">
		<h2 class="text-2xl pt-2 text-orange-900 text-center font-bold">FAQ</h2>
		<div v-for="(faq,i) in faqs" :key="i" class="text-center cursor-pointer w-full max-w-lg bg-orange-100 p-2 my-2 mx-auto rounded-md">
			<span class="text-sm">{{faq.title}}</span>
		</div>
  </div>
</template>

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
