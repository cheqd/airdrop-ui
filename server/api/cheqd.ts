import HttpClient from './httpClient';

export class CheqdRest extends HttpClient {
    public constructor() {
        super('cheqd-mainnet-1', 'http://localhost:5000/auth')
    }


	public getInitalClaimInfo = async () => {
		return Promise.resolve(false);
	}
}
 
