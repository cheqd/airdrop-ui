<template>
	<div class="flex flex-col items-center justify-center min-h-[90vh] sm:items-center sm:pt-0 2xl:justify-start 2xl:mt-8">
		<div>
			<button class="border-orange-200 border-2 px-4 font-semibold py-3 mx-2 my-2 rounded-md bg-orange-100 hover:bg-orange-200
			2xl:py-4 2xl:my-6 2xl:px-6 2xl:text-lg 2xl:mx-4">
				About Cheqd
			</button>
			<button class="border-orange-200 border-2 px-4  font-semibold py-3 mx-2 my-2 rounded-md bg-orange-100 hover:bg-orange-200
			2xl:py-4 2xl:my-6 2xl:px-6 2xl:text-lg 2xl:mx-4">
				Delegate & Vote
			</button>
			<button class="border-orange-200 border-2 px-4  font-semibold py-3 mx-2 my-2 rounded-md bg-orange-100 hover:bg-orange-200
			2xl:py-4 2xl:my-6 2xl:px-6 2xl:text-lg 2xl:mx-4">
				Liquidity Pools
			</button>
		</div>
		<div class="h-full w-full flex justify-center items-center mt-8">
			<div class="flex-[2] my-2 mx-2 py-2 max-w-lg bg-white drop-shadow-lg flex flex-col justify-center items-center rounded-lg h-full 2xl:max-w-xl">
				<Faq />
			</div>
			<div class="flex-[4] py-2 h-full max-w-2xl sm:px-6 rounded-lg drop-shadow-lg 2xl:max-w-4xl">
				<div class="bg-white flex flex-col overflow-hidden shadow sm:rounded-lg p-6">
					<h2 class="text-2xl text-gray-900 py-2 leading-7 font-semibold 2xl:text-4xl">
						Cheqd Community Airdrop
					</h2>
					<div class="w-full">
						<label class="text-lg font-semibold text-gray-700 2xl:text-2xl">Claim Progress: 70%</label>
							<progress class="rounded-lg w-5/6 bg-white h-2" value="10" max="100">
						</progress>
					</div>
					<label class="justify-self-start text-2xl font-semibold text-gray-700 2xl:text-3xl">Missions</label>
					<div class="flex flex-col w-full h-full items-center justify-center">
						<Mission v-for="(mission,i) in missions" v-bind:key="i" :toggleModal="toggleModal" v-bind:label="mission.label" />
						<Modal title="sometitle" :closeModal="toggleModal" :isOpen="showModal" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">

import {ref} from 'vue';
import Mission from './mission.vue';
import Modal from './modal.vue';
import Faq from './faq.vue';

let isCalculateLoading = false;
let isClaimLoading = false;

const showModal = ref(false);
const missions = [
	{ label:  "#1 OSMO/CHEQ Liquidity Providers"},
	{ label:  "#2 ATOM/CHEQ Liquidity Providers"},
	{ label:  "#3 Juno Stakers"},
	{ label:  "#4 JunoSwap LPers"},
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
			console.log('called toggle', this.showModal)
		},
	}
}
</script>
