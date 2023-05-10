import axios, { AxiosError } from 'axios';
import { useCookies } from 'react-cookie';
import { reIssueToken } from './Auth';

export const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: 10000,
});

instance.interceptors.request.use(
	(config) => {
		const [cookie] = useCookies();
		const accessToken = cookie.access_token;
		const returnConfig = {
			...config,
		};
		if (accessToken) {
			returnConfig.headers!['Authorization'] = `Bearer ${accessToken}`;
		}
		return returnConfig;
	},
	(error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
	(response) => response,
	(error: AxiosError<AxiosError>) => {
		if (axios.isAxiosError(error) && error.response) {
			const { config } = error;
			const [cookie, setCookie, removeCookie] = useCookies();
			const refreshToken = cookie.refresh_token;
			if (error.response.data.message === 'Invalid Token' || error.response.data.message === 'Token Expired') {
				if (refreshToken) {
					removeCookie('access_token');
					reIssueToken(refreshToken)
						.then((res) => {
							const accessExpired = new Date(res.access_token_expired_at);
							const refreshExpired = new Date(res.refresh_token_expired_at);
							setCookie('access_token', res.access_token, {
								expires: accessExpired,
							});
							setCookie('refresh_token', res.refresh_token, {
								expires: refreshExpired,
							});
							if (config!.headers) config!.headers['Authorization'] = `Bearer ${res.access_token}`;
							return axios(config!);
						})
						.catch(() => {
							removeCookie('access_token');
							removeCookie('refresh_token');
							window.location.href = '/login';
						});
				} else {
					window.location.href = '/login';
				}
			} else return Promise.reject(error);
		}
	}
);
