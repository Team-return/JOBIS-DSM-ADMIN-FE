import { instance } from '../axios';
import { BusinessCodeResponse } from './response';

const router = '/code';

export const getAllBusinessCode = async () => {
	const { data } = await instance.get<Promise<BusinessCodeResponse>>(`${router}/business-area`);
	return data;
};
