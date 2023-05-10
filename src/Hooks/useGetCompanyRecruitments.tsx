import { useQuery } from 'react-query';
import { dataType } from '../apis/Companies/request';
import { getAllCompanyRecruitment } from '../apis/Companies';

export const useGetCompanyRecruitments = (searchQueryString: dataType) =>
	useQuery(['getCompanyRecruitments'], () => getAllCompanyRecruitment(searchQueryString), {
		refetchOnWindowFocus: true,
	});
