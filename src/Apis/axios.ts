import axios, { AxiosError } from 'axios';
import { Cookies } from 'react-cookie';
import { reIssueToken } from './Auth';

export const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: 10000,
});

const cookies = new Cookies();
let isRefreshing = false;

instance.interceptors.request.use(
	(config) => {
		const accessToken = cookies.get('access_token');
		const returnConfig = { ...config };
		if (accessToken) {
			returnConfig.headers!['Authorization'] = `Bearer ${accessToken}`;
		}
		return returnConfig;
	},
	(error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<AxiosError>) => {
		if (axios.isAxiosError(error) && error.response) {
			const { config } = error;
			const refreshToken = cookies.get('refresh_token');
			if (
				(error.response.data.message === 'Invalid Token' ||
					error.response.data.message === 'Token Expired' ||
					!cookies.get('access_token')) &&
				refreshToken
			) {
				if (!isRefreshing) {
					cookies.remove('access_token');
					isRefreshing = true;
					reIssueToken(refreshToken)
						.then((res) => {
							isRefreshing = false;
							cookies.remove('refresh_token');
							const accessExpired = new Date(
								res.access_token_expired_at
							);
							const refreshExpired = new Date(
								res.refresh_token_expired_at
							);
							cookies.set('access_token', res.access_token, {
								expires: accessExpired,
							});
							cookies.set('refresh_token', res.refresh_token, {
								expires: refreshExpired,
							});
							if (config!.headers) {
								config!.headers[
									'Authorization'
								] = `Bearer ${res.access_token}`;
							}
							return axios(config!);
						})
						.catch(() => {
							isRefreshing = false;
							cookies.remove('access_token');
							cookies.remove('refresh_token');
						});
				}
			} else {
				alert("개발자에게 문의해주세요.")
			}
		}
		return Promise.reject(error);
	}
);
