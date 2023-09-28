import { useQueries, useQuery } from 'react-query';
import { QueryStringDataType } from '../../Apis/Companies/request';
import {
	getAllCompanyRecruitment,
	getAllCompanyRecruitmentPageNum,
	getCompanyDetail,
	getEmployableCompaniesPageNum,
} from '../../Apis/Companies';
import { EmployableCompaniesPropsType } from '../../Apis/Companies/request';
import { getEmployableCompanies } from '../../Apis/Companies';

/** 회사 리스트를 조회하는 api입니다. */
export function useGetCompanyRecruitments(searchQueryString: QueryStringDataType) {
	return useQueries([
		{
			queryKey: ['getCompanyRecruitments', searchQueryString],
			queryFn: () => getAllCompanyRecruitment(searchQueryString),
		},
		{
			queryKey: ['getCompanyRecruitmentsPageNum', searchQueryString],
			queryFn: () => getAllCompanyRecruitmentPageNum(searchQueryString),
		},
	]);
}

/** 학생 페이지에서 기업들을 조회하는 api입니다. */
export function useGetEmployableCompanies(
	searchString: EmployableCompaniesPropsType,
	page: number
) {
	return useQueries([
		{
			queryKey: ['getEmployableCompanies', searchString, page],
			queryFn: () => getEmployableCompanies(searchString, page),
		},
		{
			queryKey: ['getCompanyRecruitmentsPageNum', searchString, page],
			queryFn: () => getEmployableCompaniesPageNum(searchString, page),
		},
	]);
}

/** 기업 페이지에서 기업의 상세정보를 조회하는 api입니다. */
export function useGetCompanyDetail(companyId: string) {
	return useQuery(
		['getCompanyDetail', companyId],
		() => getCompanyDetail(companyId),
		{
			refetchOnWindowFocus: true,
		}
	);
}
