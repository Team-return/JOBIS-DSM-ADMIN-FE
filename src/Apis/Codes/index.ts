import { instance } from '../axios';
import { CodeType } from './request';
import { CodeResponse } from './response';

const router = '/codes';

/** 코드 조회 */
export const getAllCode = async (type: CodeType) => {
	const { data } = await instance.get<CodeResponse>(
		`${router}?type=${type}`
	);
	return data;
};
