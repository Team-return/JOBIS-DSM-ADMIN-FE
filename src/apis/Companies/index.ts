import { MutationOptions, useMutation } from 'react-query';
import { instance } from '../axios';
import { dataType } from './request';
import { CompanyRecruitmentResponse } from './response';

const router = '/companies';

export const getAllCompanyRecruitment = async (searchQueryString: dataType) => {
	const { page, company_type, region, company_name, industry } = searchQueryString;
	const business_area = industry ? `&business_area=${industry}` : '';
	const { data } = await instance.get<Promise<CompanyRecruitmentResponse>>(`${router}/teacher?page=${page}&type=${company_type}&name=${company_name}&region=${region}${business_area}`);
	return data;
};

export const useChangeCompanyStatus = (status: string, company_ids: number[], options: MutationOptions) => {
	const data = {
		company_ids,
		company_type: status,
	};

	return useMutation(async () => instance.patch(`${router}/type`, data), {
		...options,
	});
};
