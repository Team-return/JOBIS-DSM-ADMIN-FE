import { useQuery } from 'react-query';
import { getAllCode } from '../../Apis/Codes';
import { CodeType } from '../../Apis/Codes/request';

/** 직업, 기술, 비지니스 코드를 조회하는 api입니다. */
export function useGetCode(type: CodeType) {
	return useQuery(['getCode', type], () => getAllCode(type), {
		refetchOnWindowFocus: true,
	});
}
