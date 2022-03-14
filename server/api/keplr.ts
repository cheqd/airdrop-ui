import type { Keplr as KeplrIface, ChainInfo } from '@keplr-wallet/types';
import { bech32 } from 'bech32';
import HttpClient from './httpClient';

export type KeplrResponse = {
	data?: any;
	error?: string;
}

export class Keplr extends HttpClient {
	protected readonly keplr:KeplrIface;

    public constructor() {
        super('cheqd-mainnet-1', 'http://localhost:5000/auth')
    }

	private response = (resp: KeplrResponse): Promise<KeplrResponse> => {
		if (resp.error) {
			return Promise.reject(resp)
		}

		return Promise.resolve(resp)
	}

	public keplrSuggestChain = async () => {
		let resp: KeplrResponse = {}

		// @ts-ignore: Keplr Check is valid here
		if (!window?.keplr) {
			resp.error = "Please Install Keplr Extension"
			return this.response(resp);
		}

		// @ts-ignore: Keplr Check is valid here
		await keplr.experimentalSuggestChain(this.cheqdChainInfo)
		const {data, error} = await this.getCheqAddress()
		if (error) {
			resp.error = error;
			return this.response(resp)
		}

		this.storeAddressLocally(data)
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

		resp.error = "Keplr Extension has not been connected"

		return this.response(resp);
	}
	
	public getAllCosmosNetworkWallet = async (addr: string, prefix: string) => {
		const raw = bech32.decode(addr)
		return bech32.encode(prefix, raw.words)
	}

	public storeAddressLocally = async (address: string) => {
		let resp: KeplrResponse = {
			data: undefined,
			error: undefined,
		}

		if (!address) {
			resp.error = "address can not be empty"
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
			low: 0.000000025,
			average: 0.00000005,
			high: 0.0000001,
		},
	}

	protected LocalStorageAddrKey: string = "cheqd_address";
}
 
