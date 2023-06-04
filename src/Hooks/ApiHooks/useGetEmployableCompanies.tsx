import { useQuery } from 'react-query';
import { EmployableCompaniesPropsType } from '../../Apis/Companies/request';
import { getEmployableCompanies } from '../../Apis/Companies';

/** 학생 페이지에서 기업들을 조회하는 api입니다. */
export function useGetEmployableCompanies(searchString: EmployableCompaniesPropsType) {
	return useQuery(['getEmployableCompanies', searchString], () => getEmployableCompanies(searchString), {
		refetchOnWindowFocus: true,
	});
}
