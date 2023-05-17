import { useQuery } from 'react-query';
import { getAllBusinessCode } from '../../Apis/Codes';

/** 사업분야 코드를 조회하는 api입니다. */
export function useGetBusinessCode() {
	return useQuery(['getBusinessCode'], () => getAllBusinessCode('BUSINESS_AREA'), {
		refetchOnWindowFocus: true,
	});
}
