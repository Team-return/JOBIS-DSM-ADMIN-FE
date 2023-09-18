import axios from 'axios';
import { AuthorizationRefreshResponse } from './response';

const router = '/auth';

/** 토큰 재발급 */
export const reIssueToken = async (refreshToken: string) => {
	const response = await axios.put<AuthorizationRefreshResponse>(
		`${process.env.REACT_APP_BASE_URL}${router}/reissue`,
		null,
		{
			headers: {
				'X-Refresh-Token': `${refreshToken}`,
			},
		}
	);
	return response.data;
};
