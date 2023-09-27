import { MutationOptions, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { instance } from '../axios';
import {
	EmployableCompaniesPropsType,
	DataType,
	CompanyInfoEditType,
} from './request';
import {
	CompanyDetailResponse,
	CompanyRecruitmentResponse,
	EmployableCompaniesResponse,
} from './response';

const router = '/companies';

/** 회사 상세정보 조회 */
export const getCompanyDetail = async (companyId: string) => {
	const { data } = await instance.get<CompanyDetailResponse>(
		`${router}/${companyId}`
	);
	return data;
};

/** 선생님 회사 리스트 조회 */
export const getAllCompanyRecruitment = async (searchQueryString: DataType) => {
	const { page, company_type, region, company_name, industry } =
		searchQueryString;
	const business_area = industry ? `&business_area=${industry}` : '';
	const { data } = await instance.get<CompanyRecruitmentResponse>(
		`${router}/teacher?page=${page}&type=${company_type}&name=${company_name}&region=${region}${business_area}`
	);
	return data;
};

/** 취업 관리 페이지 회사 조회 */
export const getEmployableCompanies = async (
	searchQueryString: EmployableCompaniesPropsType,
	page: number
) => {
	const { company_name, company_type, year } = searchQueryString;
	const companyType = company_type ? `&company_type=${company_type}` : '';
	const companyName = company_name ? `&company_name=${company_name}` : '';
	const { data } = await instance.get<EmployableCompaniesResponse>(
		`${router}/employment?year=${year}${companyName}${companyType}&page=${page}`
	);
	return data;
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
