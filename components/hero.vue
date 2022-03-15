<template>
	<div class="flex overflow-x-hidden overflow-y-auto flex-col items-center justify-center min-h-[90vh] sm:items-center sm:pt-0 2xl:justify-start 2xl:mt-8">
		<div class="h-full w-full flex justify-center relative items-center mt-2">
			<div class="w-4/6 py-2 h-full max-w-2xl sm:px-6 rounded-lg drop-shadow-lg xl:max-w-4xl">
				<div class="z-10 w-full flex justify-center items-center my-2">
					<button @click="cheqdio" class="border-orange-400 border-opacity-80 border-2 px-4 font-semibold py-2 mx-2 rounded-md bg-orange-100 hover:bg-orange-200 2xl:py-4 2xl:my-6 2xl:px-6 2xl:text-lg 2xl:mx-4">
						About Cheqd
					</button>
					<button @click="omniflix" class="border-orange-400 border-2 px-4 border-opacity-80 font-semibold py-2 mx-2 my-2 rounded-md bg-orange-100 hover:bg-orange-200 2xl:py-4 2xl:my-6 2xl:px-6 2xl:text-lg 2xl:mx-4">
						Delegate & Vote
					</button>
					<button @click="osmosis" class="border-orange-400 border-2 border-opacity-80 px-4 font-semibold py-2 mx-2 my-2 rounded-md bg-orange-100 hover:bg-orange-200 2xl:py-4 2xl:my-6 2xl:px-6 2xl:text-lg 2xl:mx-4">
						Liquidity Pools
					</button>
				</div>
				<div class="bg-orange-200 flex flex-col overflow-hidden shadow sm:rounded-lg p-4">
					<h2 class="text-2xl text-gray-900 py-2 text-center leading-7 font-bold 2xl:text-4xl">
						Mission 2 - Stage two
					</h2>
					<div class="bg-orange-200 -mx-4 -mb-4">
					<div class="flex flex-col w-full py-4 pb-6 h-full items-center justify-center">
						<Mission
						v-for="(mission,i) in missions"
						v-bind:key="i" 
						:toggleModal="toggleModal"
						v-bind:detail="mission.detail"
						v-bind:label="mission.label"
						:nextFunc="mission.nextFunc"
						/>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">

import {ref, } from 'vue';
// @ts-ignore
import Mission from './mission.vue';
// @ts-ignore
import Modal from './modal.vue';
// @ts-ignore
import Faq from './faq.vue';

let isCalculateLoading = false;
let isClaimLoading = false;

const showModal = ref(false);
const missions = [
	{ 
		label:  "#1 - Stake at least 100 $CHEQ",
		detail: "You can do it on any validator, with any amount, just make sure that the total amount staked is a 100 $CHEQ or more",
		nextFunc: () => {
			window.open("https://cheqd.omniflix.co/stake")
		},

	},
	{ 
		label:  "#2 - Provide Liquidity on Osmosis: OSMO/CHEQ",
		detail: "Add at least 250 $CHEQ and the equivalent in OSMO on Liquidity Pool 602 (i.e. CHEQ:OSMO with a 50/50 balance)",
		nextFunc: () => {
			window.open("https://app.osmosis.zone/pool/602")
		},
	},
	{ 
		label:  "#3 - Provide Liquidity on Osmosis: ATOM/CHEQ",
		detail: "Add at least 250 $CHEQ and the equivalent in ATOM on Liquidity Pool 617 (i.e. CHEQ:ATOM with a 50/50 balance)",
		nextFunc: () => {
			window.open("https://app.osmosis.zone/pool/617")
		},
	},
]

export default {
	name: 'CheqdHero',
	layout: 'default',
	components: {
		Mission,
		Modal,
	},
	setup() {
		return {
			missions,
			showModal,
		}
	},
	data() {
		return {
			showModal,
		}
	},
	methods: {
		fetchRewards: () => {
			isCalculateLoading = true;
			setTimeout(()=> {
				isCalculateLoading = !isCalculateLoading
			}, 2000)
		},
		claimRewards: () => {
			isClaimLoading = true
			setTimeout(()=> {
				isClaimLoading = !isClaimLoading
			}, 2000)
		},
		toggleModal() {
			this.showModal = !this.showModal
		},
		osmosis() {
			window.open("https://app.osmosis.zone/pool/602", "_blank")
		},
		omniflix() {
			window.open("https://cheqd.omniflix.co", "_blank")
		},
		cheqdio() {
			window.open("https://cheqd.io", "_blank")
		},
	}
}
</script>

<style>
</style>
