import { instance } from '../axios';
import { AuthorizationRefreshResponse } from './response';

const router = '/auth';

export const reIssueToken = async (refreshToken: string) => {
	const response = await instance.put<AuthorizationRefreshResponse>(
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
