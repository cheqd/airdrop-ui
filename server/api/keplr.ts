import type { Keplr as KeplrIface, ChainInfo } from '@keplr-wallet/types';
import { bech32, bech32m } from 'bech32';
import HttpClient from './httpClient';

export type KeplrResponse = {
	data?: any;
	error?: string;
}

export class Keplr extends HttpClient {
    public constructor() {
        super('cheqd-mainnet-1', '')
    }

	private response = (resp: KeplrResponse): Promise<KeplrResponse> => {
		if (resp.error) {
			return Promise.reject(resp)
		}

		return Promise.resolve(resp)
	}

	public connect = async () => {
		let resp: KeplrResponse = {}

		// @ts-ignore: Keplr Check is valid here
		if (!window?.keplr) {
			resp.error = "Please install Keplr Extension"
			return this.response(resp);
		}

		// @ts-ignore: Keplr Check is valid here
		await window.keplr.experimentalSuggestChain(this.cheqdChainInfo)
		const {data, error} = await this.getCheqAddress()
		if (error) {
			resp.error = error;
			return this.response(resp)
		}

		// @ts-ignore
		await window.keplr.enable(['cosmoshub-4', 'juno-1', 'osmosis-1'])

		resp.data = data;
		return this.response(resp);
	}

	public keplrSuggestChain = async () => {
		let resp: KeplrResponse = {}

		// @ts-ignore: Keplr Check is valid here
		if (!window?.keplr) {
			resp.error = "Please install Keplr Extension"
			return this.response(resp);
		}

		// @ts-ignore: Keplr Check is valid here
		await window.keplr.experimentalSuggestChain(this.cheqdChainInfo)
		const {data, error} = await this.getCheqAddress()
		if (error) {
			resp.error = error;
			return this.response(resp)
		}

		resp.data = data;
		return this.response(resp);
	}

	public getCheqAddress = async () => {
		let resp: KeplrResponse = {}
		// @ts-ignore: keplr has getOfflineSigner
		if (window.keplr && window.getOfflineSigner) {
			// @ts-ignore
			let keplrOfflineSigner = window.getOfflineSigner(this.NetworkId)
			const walletList = await keplrOfflineSigner.getAccounts()
			resp.data = walletList[0].address;
			return this.response(resp)
		}

		resp.error = "Unable to connect to Keplr Wallet"

		return this.response(resp);
	}
	
	public getAllCosmosNetworkWallet = async (addr: string, prefix: string) => {
		const raw = bech32.decode(addr)
		return bech32.encode(prefix, raw.words)
	}

	public validateCosmosNetowrkAddress = (addr: string) => {
		let resp: KeplrResponse = {}

		try {
			// resp.data = cosmosEnc.fromBech32(addr)
			resp.data = bech32.decode(addr)
		} catch (e) {
			e = e as TypeError
			resp.error = e.message
		}

		const promise = this.response(resp);
		return promise
	}

	public storeAddressLocally = async (address: string) => {
		let resp: KeplrResponse = {}

		if (!address) {
			resp.error = "Address can not be empty"
			return this.response(resp)
		}

		localStorage.setItem(this.LocalStorageAddrKey, address)
		resp.data = "Address stored successfully"
		return this.response(resp);
	}

	public getAddressFromLocalStorage = async () => {
		let resp: KeplrResponse = {}
		const address = localStorage.getItem(this.LocalStorageAddrKey)
		if (!address) {
			resp.error = "Address not found";
			return this.response(resp)
		}

		resp.data = address;
		return this.response(resp)
	}

	public disconnect = async () => {
		let resp: KeplrResponse = {}
		localStorage.removeItem(this.LocalStorageAddrKey)
		resp.data = "Wallet disconnected successfully"
		return this.response(resp);
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
			low: 25,
			average: 30,
			high: 50,
		},
		features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx'],
		explorerUrlToTx: 'https://explorer.cheqd.io/transactions/{txHash}',
	}

	protected LocalStorageAddrKey: string = "cheqd_address";
}
 
