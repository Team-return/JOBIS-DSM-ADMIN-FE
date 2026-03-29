import axios, {
	AxiosError,
	AxiosHeaders,
	InternalAxiosRequestConfig,
} from 'axios';
import { Cookies } from 'react-cookie';
import { reIssueToken } from './Auth';
import { AuthorizationRefreshResponse } from './Auth/response';

export const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: 10000,
});

const cookies = new Cookies();
const LOGIN_PATH = '/login';
const COOKIE_OPTIONS = { path: '/' };

interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

let refreshPromise: Promise<AuthorizationRefreshResponse> | null = null;

const clearAuthCookies = () => {
	cookies.remove('access_token', COOKIE_OPTIONS);
	cookies.remove('refresh_token', COOKIE_OPTIONS);
};

const setAuthCookies = (tokenResponse: AuthorizationRefreshResponse) => {
	const accessExpired = new Date(tokenResponse.access_token_expired_at);
	const refreshExpired = new Date(tokenResponse.refresh_token_expired_at);

	cookies.set('access_token', tokenResponse.access_token, {
		expires: accessExpired,
		...COOKIE_OPTIONS,
	});
	cookies.set('refresh_token', tokenResponse.refresh_token, {
		expires: refreshExpired,
		...COOKIE_OPTIONS,
	});
};

const redirectToLogin = () => {
	if (window.location.pathname !== LOGIN_PATH) {
		window.location.replace(LOGIN_PATH);
	}
};

const refreshAccessToken = async (refreshToken: string) => {
	if (!refreshPromise) {
		refreshPromise = reIssueToken(refreshToken).finally(() => {
			refreshPromise = null;
		});
	}

	return refreshPromise;
};

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
	async (error: AxiosError) => {
		if (!axios.isAxiosError(error)) {
			return Promise.reject(error);
		}

		const originalRequest = error.config as
			| RetryableAxiosRequestConfig
			| undefined;
		const status = error.response?.status;

		if (!originalRequest || !status || ![401, 403].includes(status)) {
			return Promise.reject(error);
		}

		const refreshToken = cookies.get('refresh_token');

		if (!refreshToken || originalRequest._retry) {
			clearAuthCookies();
			redirectToLogin();
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		try {
			const tokenResponse = await refreshAccessToken(refreshToken);
			setAuthCookies(tokenResponse);
			originalRequest.headers = new AxiosHeaders(originalRequest.headers);
			originalRequest.headers.set(
				'Authorization',
				`Bearer ${tokenResponse.access_token}`
			);

			return instance(originalRequest);
		} catch (refreshError) {
			clearAuthCookies();
			redirectToLogin();
			return Promise.reject(refreshError);
		}
	}
);
