import { instance } from '../axios';
import { CodeType } from './request';
import { CodeResponse } from './response';

const router = '/codes';

export const getAllCode = async (type: CodeType) => {
	const { data } = await instance.get<Promise<CodeResponse>>(`${router}?type=${type}`);
	return data;
};
