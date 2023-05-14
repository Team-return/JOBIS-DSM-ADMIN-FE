import { useQuery } from 'react-query';
import { dataType } from '../Apis/Companies/request';
import { getAllCompanyRecruitment } from '../Apis/Companies';

/** 회사 리스트를 조회하는 api입니다. */
export function useGetCompanyRecruitments(searchQueryString: dataType) {
	return useQuery(['getCompanyRecruitments'], () => getAllCompanyRecruitment(searchQueryString), {
		refetchOnWindowFocus: true,
	});
}
