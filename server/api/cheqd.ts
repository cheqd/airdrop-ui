import HttpClient from './httpClient';

export type ClaimTier = {
  min_amount: number
  reward: number
  description: string
  type: string
}

export type CalculateRewards = {
  valid: boolean
  breakdown: Breakdown
}

export type Breakdown = {
  tier_1: number
  tier_2: number
  tier_3: number
  tier_4: number
  tier_5: number
  tier_6: number
  total: number
}


export class CheqdRest extends HttpClient {
    public constructor() {
        super('cheqd-mainnet-1', 'http://localhost:5000/auth')
    }


	public getInitalClaimInfo = async () => {
		return Promise.resolve(false);
	}

	public claimRewards = async (addr: string) => {
		const resp = await this.http.get( `https://claim-transactions.cheqd.workers.dev/claim/${addr}`)
		return resp;
	}

	public checkAirdropEligibility = async (addr: string) => {
		const resp = await this.http.get(`https://claim-transactions.cheqd.workers.dev/calculate/${addr}`)
		return resp;
	}

	public checkClaimProgress = async (addr: string) => {
		const resp = await this.http.get(`https://claim-transactions.cheqd.workers.dev/progress/${addr}`)
		return resp;
	}
}
 
