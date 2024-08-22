import {
	MutationOptions,
	useMutation,
	useQueries,
	useQuery,
	useQueryClient,
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
			enabled: false,
		},
		{
			queryKey: ['getCompanyRecruitmentsPageNum', searchQueryString],
			queryFn: async () => {
				const { company_type, region, company_name, industry } =
					searchQueryString;
				const business_area = industry
					? `&business_area=${industry}`
					: '';
				const { data } = await instance.get<{
					total_page_count: number;
				}>(
					`${router}/teacher/count?&type=${company_type}&name=${company_name}&region=${region}${business_area}`
				);
				return data;
			},
			enabled: false,
		},
	]);
};

/** 학생 페이지에서 기업들을 조회하는 api입니다. */
export const useGetEmployableCompanies = (
	searchString: EmployableCompaniesPropsType
) => {
	return useQueries([
		{
			queryKey: ['getEmployableCompanies', searchString],
			queryFn: async () => {
				const { company_name, company_type, year, page } = searchString;
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
			enabled: false,
		},
		{
			queryKey: ['getCompanyRecruitmentsPageNum', searchString],
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
					`${router}/employment/count?year=${year}${companyName}${companyType}`
				);
				return data;
			},
			enabled: false,
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
			enabled: !!+companyId,
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

/**기업 총 개수 조회 */
export const useCompanyCount = () => {
	return useQuery(['CompanyCount'], async () => {
		const { data } = await instance.get(`${router}/count`);
		return data;
	});
};

export const useCompanyExcel = (options: MutationOptions) => {
	return useMutation(async () => {
		const { data } = await instance.get(`${router}/file`, {
			responseType: 'blob',
		});
		const url = window.URL.createObjectURL(new Blob([data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', '모집기업의뢰서.xlsx');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, options);
};
