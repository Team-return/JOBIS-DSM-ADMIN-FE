import {
	MutationOptions,
	useMutation,
	useQueries,
	useQuery,
} from 'react-query';
import { useParams } from 'react-router-dom';
import { instance } from '../axios';
import {
	EmployableCompaniesPropsType,
	QueryStringDataType,
	CompanyInfoEditType,
} from './request';
import {
	CompanyDetailResponse,
	CompanyRecruitmentResponse,
	EmployableCompaniesResponse,
} from './response';

const router = '/companies';

/** 회사 리스트를 조회하는 api입니다. */
export const useGetCompanyRecruitments = (
	searchQueryString: QueryStringDataType
) => {
	return useQueries([
		{
			queryKey: ['getCompanyRecruitments', searchQueryString],
			queryFn: async () => {
				const { page, company_type, region, company_name, industry } =
					searchQueryString;
				const business_area = industry
					? `&business_area=${industry}`
					: '';
				const { data } = await instance.get<CompanyRecruitmentResponse>(
					`${router}/teacher?page=${page}&type=${company_type}&name=${company_name}&region=${region}${business_area}`
				);
				return data;
			},
		},
		{
			queryKey: ['getCompanyRecruitmentsPageNum', searchQueryString],
			queryFn: async () => {
				const { page, company_type, region, company_name, industry } =
					searchQueryString;
				const business_area = industry
					? `&business_area=${industry}`
					: '';
				const { data } = await instance.get<{
					total_page_count: number;
				}>(
					`${router}/teacher/count?page=${page}&type=${company_type}&name=${company_name}&region=${region}${business_area}`
				);
				return data;
			},
		},
	]);
};

/** 학생 페이지에서 기업들을 조회하는 api입니다. */
export const useGetEmployableCompanies = (
	searchString: EmployableCompaniesPropsType,
	page: number
) => {
	return useQueries([
		{
			queryKey: ['getEmployableCompanies', searchString, page],
			queryFn: async () => {
				const { company_name, company_type, year } = searchString;
				const companyType = company_type
					? `&company_type=${company_type}`
					: '';
				const companyName = company_name
					? `&company_name=${company_name}`
					: '';
				const { data } =
					await instance.get<EmployableCompaniesResponse>(
						`${router}/employment?year=${year}${companyName}${companyType}&page=${page}`
					);
				return data;
			},
		},
		{
			queryKey: ['getCompanyRecruitmentsPageNum', searchString, page],
			queryFn: async () => {
				const { company_name, company_type, year } = searchString;
				const companyType = company_type
					? `&company_type=${company_type}`
					: '';
				const companyName = company_name
					? `&company_name=${company_name}`
					: '';
				const { data } = await instance.get<{
					total_page_count: number;
				}>(
					`${router}/employment/count?year=${year}${companyName}${companyType}&page=${page}`
				);
				return data;
			},
		},
	]);
};

/** 기업 페이지에서 기업의 상세정보를 조회하는 api입니다. */
export const useGetCompanyDetail = (companyId: string) => {
	return useQuery(
		['getCompanyDetail', companyId],
		async () => {
			const { data } = await instance.get<CompanyDetailResponse>(
				`${router}/${companyId}`
			);
			return data;
		},
		{
			refetchOnWindowFocus: true,
		}
	);
};

/** 기업 구분 변경 */
export const useChangeCompanyStatus = (
	status: string,
	company_ids: number[],
	options: MutationOptions
) => {
	const data = {
		company_ids,
		company_type: status,
	};

	return useMutation(async () => instance.patch(`${router}/type`, data), {
		...options,
	});
};

/** 협약 여부 변경 */
export const useChangeContractCompany = (
	company_ids: number[],
	options: MutationOptions
) => {
	return useMutation(
		async () => instance.patch(`${router}/mou`, { company_ids }),
		{
			...options,
		}
	);
};

/** 협약 여부 변경 */
export const useChangeCompanyInfo = (
	info: CompanyInfoEditType,
	options: MutationOptions
) => {
	const params = useParams();
	return useMutation(
		async () => instance.patch(`${router}/${params.id}`, info),
		{
			...options,
		}
	);
};
