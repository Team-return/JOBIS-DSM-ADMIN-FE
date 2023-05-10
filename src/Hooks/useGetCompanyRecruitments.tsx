import { useQuery } from 'react-query';
import { dataType } from '../Apis/Companies/request';
import { getAllCompanyRecruitment } from '../Apis/Companies';

export const useGetCompanyRecruitments = (searchQueryString: dataType) =>
	useQuery(['getCompanyRecruitments'], () => getAllCompanyRecruitment(searchQueryString), {
		refetchOnWindowFocus: true,
	});
