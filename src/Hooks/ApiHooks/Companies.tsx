import { useQuery } from 'react-query';
import { dataType } from '../../Apis/Companies/request';
import { getAllCompanyRecruitment, getCompanyDetail } from '../../Apis/Companies';
import { EmployableCompaniesPropsType } from '../../Apis/Companies/request';
import { getEmployableCompanies } from '../../Apis/Companies';

/** 회사 리스트를 조회하는 api입니다. */
export function useGetCompanyRecruitments(searchQueryString: dataType) {
	return useQuery(
		['getCompanyRecruitments', searchQueryString],
		() => getAllCompanyRecruitment(searchQueryString),
		{
			refetchOnWindowFocus: true,
		}
	);
}

/** 학생 페이지에서 기업들을 조회하는 api입니다. */
export function useGetEmployableCompanies(
	searchString: EmployableCompaniesPropsType
) {
	return useQuery(
		['getEmployableCompanies', searchString],
		() => getEmployableCompanies(searchString),
		{
			refetchOnWindowFocus: true,
		}
	);
}

/** 기업 페이지에서 기업의 상세정보를 조회하는 api입니다. */
export function useGetCompanyDetail(
	companyId: string
) {
	return useQuery(
		['getCompanyDetail', companyId],
		() => getCompanyDetail(companyId),
		{
			refetchOnWindowFocus: true,
		}
	);
}