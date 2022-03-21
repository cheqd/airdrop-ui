import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

declare module 'axios' {
	interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClient {
	protected readonly http: AxiosInstance;
	public NetworkId: string;

	 protected constructor(networkId: string, baseURL: string, headers?: any) {
		 this.NetworkId = networkId;
		this.http = axios.create({
			baseURL,
			headers,
		});
		this._responseInterceptor();
		this._requestInterceptor();
	}

	private _requestInterceptor = () => {
		this.http.interceptors.request.use(req => {
			return req;
		})
	}

	private _responseInterceptor = async () => {
		this.http.interceptors.response.use(
			this._handleResponse,
			this._handleError,
		);
	}

	private _handleResponse = ({ data, status, headers }: AxiosResponse) => {
		if (!data.valid) {
			return {
				error: data.message,
				valid: data.valid,
			}
		}

		return {
			data: data, 
			status: status, 
			headers: headers,
			valid: data.valid,
		}
	};

	protected _handleError = (err: AxiosError) => {
		if (err?.response.status > 399) {
			return throwError(err)
		}

		return {
			error: err?.response,
			status: err?.response.status,
			Headers: err?.response.headers,
		}
	}
}

export default HttpClient;
