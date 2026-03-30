import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { Cookies } from 'react-cookie';
import { reIssueToken } from './Auth';
import { AuthorizationRefreshResponse } from './Auth/response';

type ErrorResponseData = {
	message?: string;
	status?: number;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
	_retry?: boolean;
};

export const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: 10000,
});

const cookie = new Cookies();

const clearAuthCookies = () => {
	cookie.remove('access_token', { path: '/' });
	cookie.remove('refresh_token', { path: '/' });
	cookie.remove('authority', { path: '/' });
};

const redirectTo = (path: string) => {
	if (typeof window === 'undefined') {
		return;
	}

	if (window.location.pathname !== path) {
		window.location.href = path;
	}
};

const getTokenExpiresAt = (
	tokenResponse: AuthorizationRefreshResponse,
	type: 'access' | 'refresh'
) => {
	if (type === 'access') {
		return (
			tokenResponse.access_expires_at ?? tokenResponse.access_token_expired_at
		);
	}

	return (
		tokenResponse.refresh_expires_at ??
		tokenResponse.refresh_token_expired_at
	);
};

instance.interceptors.request.use(
	(config) => {
		const accessToken = cookie.get('access_token');
		const returnConfig = { ...config };

		returnConfig.headers = new AxiosHeaders(returnConfig.headers);

		if (accessToken) {
			returnConfig.headers.set('Authorization', `Bearer ${accessToken}`);
		}

		return returnConfig;
	},
	(error: AxiosError) => {
		throw error;
	}
);

instance.interceptors.response.use(
	async (response) => response,
	async (error: AxiosError<ErrorResponseData>) => {
		console.error(error);

		if (!axios.isAxiosError(error) || !error.response) {
			throw error;
		}

		const { config, response } = error;
		const refreshToken = cookie.get('refresh_token');
		const status = response.status ?? response.data?.status;
		const responseMessage = response.data?.message;
		const originalRequest = config as RetryableRequestConfig | undefined;
		const isReissueRequest = originalRequest?.url?.includes('/auth/reissue');
		const isAuthError =
			status === 401 ||
			status === 403 ||
			responseMessage === 'Invalid Token' ||
			responseMessage === 'Token Expired';

		if (!isAuthError) {
			throw error;
		}

		if (!originalRequest || originalRequest._retry || isReissueRequest) {
			clearAuthCookies();
			redirectTo('/login');
			throw error;
		}

		if (!refreshToken) {
			clearAuthCookies();
			redirectTo('/login');
			throw error;
		}

		originalRequest._retry = true;
		cookie.remove('access_token', { path: '/' });

		try {
			const res = await reIssueToken(refreshToken);
			const accessExpiresAt = getTokenExpiresAt(res, 'access');
			const refreshExpiresAt = getTokenExpiresAt(res, 'refresh');

			if (!accessExpiresAt || !refreshExpiresAt) {
				throw new Error('Token expiration date is missing');
			}

			cookie.set('access_token', res.access_token, {
				expires: new Date(accessExpiresAt),
				path: '/',
			});
			cookie.set('refresh_token', res.refresh_token, {
				expires: new Date(refreshExpiresAt),
				path: '/',
			});
			cookie.set('authority', res.authority, { path: '/' });

			originalRequest.headers = new AxiosHeaders(originalRequest.headers);
			originalRequest.headers.set(
				'Authorization',
				`Bearer ${res.access_token}`
			);

			return instance(originalRequest);
		} catch (reissueError) {
			const reissueAxiosError = reissueError as AxiosError<ErrorResponseData>;
			const reissueStatus =
				reissueAxiosError.response?.status ??
				reissueAxiosError.response?.data?.status;

			if (
				reissueStatus === 404 ||
				reissueStatus === 401 ||
				reissueStatus === 403
			) {
				clearAuthCookies();
				redirectTo('/login');
			}

			throw reissueError;
		}
	}
);
