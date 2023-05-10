import { useQuery } from 'react-query';
import { dataType } from '../Apiss/Companies/request';
import { getAllCompanyRecruitment } from '../Apiss/Companies';

export const useGetCompanyRecruitments = (searchQueryString: dataType) =>
	useQuery(['getCompanyRecruitments'], () => getAllCompanyRecruitment(searchQueryString), {
		refetchOnWindowFocus: true,
	});
