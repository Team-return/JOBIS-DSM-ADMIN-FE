import { useQuery } from 'react-query';
import { instance } from '../axios';
import { CodeType } from './request';
import { CodeResponse } from './response';

const router = '/codes';

/** 직업, 기술, 비지니스 코드를 조회하는 api입니다. */
export const useGetCode = (type: CodeType) => {
	return useQuery(
		['getCode', type],
		async () => {
			const { data } = await instance.get<CodeResponse>(
				`${router}?type=${type}`
			);
			return data;
		},
		{
			refetchOnWindowFocus: true,
		}
	);
};
