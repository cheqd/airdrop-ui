<template>
  <div>
    <div class="bg-orange-100">
      <nav
        class=" container px-4 py-2 mx-auto md:flex md:justify-between md:items-center "
      >
        <div class="flex items-center justify-between">
          <router-link to="/" class=" text-xl font-bold text-gray-800 md:text-2xl " >
			  <picture>
				<img class="w-1/4 m-0 p-0" src="assets/images/cheqd-logo.png" alt="Cheqd Network"/>
			  </picture>
          </router-link>
        </div>

		<button @click="keplrSuggestChain" class="px-8 opacity-75 float-left py-4 text-lg font-medium leading-5 text-center text-gray-50 transition-colors duration-200 transform bg-orange-600 rounded-md md:w-auto no-underline desktop:ml-28 half:text-md half:font-normal half:px-4 half:py-4 half:-my-5">
			{{!walletAddress ? "Import your wallet from Keplr" : walletAddress}}
		</button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Keplr, ChainInfo } from '@keplr-wallet/types';
import {ref, onBeforeMount} from 'vue';

let walletAddress = ref('');

onBeforeMount(() => {
	keplrSuggestChain();
})

const keplrSuggestChain = async () => {
	if (!window?.keplr) {
		alert('please install keplr');
		return
	}

	const keplr:Keplr = window.keplr;

	const chainInfo: ChainInfo = {
		chainId: "cheqd-mainnet-1",
		chainName: "cheqd",
		rpc: "https://rpc.cheqd.net",
		rest: "https://api.cheqd.net",
		bip44: {
			coinType: 118,
		},
		bech32Config: {
			bech32PrefixAccAddr: "cheqd",
			bech32PrefixAccPub: "cheqd" + "pub",
			bech32PrefixValAddr: "cheqd" + "valoper",
			bech32PrefixValPub: "cheqd" + "valoperpub",
			bech32PrefixConsAddr: "cheqd" + "valcons",
			bech32PrefixConsPub: "cheqd" + "valconspub",
		},
		currencies: [ 
			{ 
				coinDenom: "CHEQ", 
				coinMinimalDenom: "ncheq", 
				coinDecimals: 9,
			}, 
		],
		feeCurrencies: [
			{
				coinDenom: "CHEQ",
				coinMinimalDenom: "ncheq",
				coinDecimals: 9,
			},
		],
		stakeCurrency: {
			coinDenom: "CHEQ",
			coinMinimalDenom: "ncheq",
			coinDecimals: 9,
		},
		coinType: 118,
		gasPriceStep: {
			low: 0.000000025,
			average: 0.00000005,
			high: 0.0000001,
		},
	}

	const conn = keplr.experimentalSuggestChain(chainInfo).then(async data => {
		console.log('conn: ', data)
		let keplrOfflineSigner = window.getOfflineSigner('cheqd-mainnet-1')
		console.log('account: ', await keplrOfflineSigner.getAccounts())

		const walletList = await keplrOfflineSigner.getAccounts()

		walletAddress.value = walletList[0].address
		console.log('addr: ', walletAddress)
	})
}
</script>
