import type { Keplr as KeplrIface, ChainInfo } from '@keplr-wallet/types';
import HttpClient from './httpClient';

export class Keplr extends HttpClient {
    public constructor() {
        super('cheqd-mainnet-1', 'http://localhost:5000/auth')
    }

	public keplrSuggestChain = async () => {
		// @ts-ignore: Keplr Check is valid here
		if (!window?.keplr) {
			return Promise.reject('Please Install Keplr Extension');
		}

		// @ts-ignore: Keplr Check is valid here
		const keplr:KeplrIface = window.keplr;
		await keplr.experimentalSuggestChain(this.cheqdChainInfo)
		return Promise.resolve('keplr extension connected successfully')
	}

	public getCheqAddress = async () => {
		// @ts-ignore: keplr has getOfflineSigner
		if (window.getOfflineSigner) {
			// @ts-ignore
			let keplrOfflineSigner = window.getOfflineSigner(this.NetworkId)
			const walletList = await keplrOfflineSigner.getAccounts()
			return Promise.resolve(walletList[0].address)
		}

		return Promise.reject('Keplr Extension has not been connected')
	}

	public storeAddressLocally = async (address: string) => {
		if (!address) {
			return Promise.reject('address can not be empty');
		}

		localStorage.setItem(this.LocalStorageAddrKey, address)
		return Promise.resolve('success')
	}

	public getAddressFromLocalStorage = async () => {
		const address = localStorage.getItem(this.LocalStorageAddrKey)
		if (!address) {
			return Promise.reject('Address not found');
		}

		return Promise.resolve(address)
	}

	public disconnect = () => {
		localStorage.removeItem(this.LocalStorageAddrKey)
		return Promise.resolve('success')
	}

	protected cheqdChainInfo: ChainInfo = {
		chainId: this.NetworkId,
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

	protected LocalStorageAddrKey: string = "cheqd_address";
}
 
