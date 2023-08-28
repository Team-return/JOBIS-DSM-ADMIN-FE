import { noneTokenInstance } from '../axios';
import { AuthorizationRefreshResponse } from './response';

const router = '/auth';

/** 토큰 재발급 */
export const reIssueToken = async (refreshToken: string) => {
	const response = await noneTokenInstance.put<AuthorizationRefreshResponse>(
		`${router}/reissue`,
		null,
		{
			headers: {
				'X-Refresh-Token': `${refreshToken}`,
			},
		}
	);
	return response.data;
};
