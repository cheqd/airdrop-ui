<template>
	<client-only>
	<div class="flex w-full overflow-x-hidden overflow-y-auto flex-col items-center justify-center h-full lg:min-h-[100vh] sm:items-center sm:pt-0 2xl:justify-center 2xl:mt-8">
		<!-- everyday hacks -->
		<div class="2xl:h-20" />
		<div class="cursor-pointer w-full flex justify-center lg:hidden">
			<a href="/">
			<img class="p-0 m-0 w-40 2xl:w-64" src="https://aryteric.sirv.com/Images/cheqd-logo-light.png" />
			</a>
		</div>
		<div class="h-full w-full flex justify-center relative items-center">
			<div class="w-full py-2 h-full max-w-2xl sm:px-6 rounded-lg drop-shadow-lg xl:max-w-4xl">
				<div class="w-full pt-10">
					<Footer />
				</div>
			</div>
		</div>
	</div>
	</client-only>
</template>

<script lang="ts" type="module">

import {ref, } from 'vue';
// @ts-ignore
import Modal from './modal.vue';
// @ts-ignore
import Faq from './faq.vue';

let isCalculateLoading = false;
let isClaimLoading = false;

const gotoHome = () => {
	window.location.href="/"
}

const showModal = ref(false);

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
		cheqdio() {
			window.open("https://cheqd.io", "_blank")
		},
	}
}
</script>

<style>
</style>
