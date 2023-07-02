import { instance } from '../axios';
import { RecruitmentFormQueryStringType } from './request';
import { RecruitmentFormResponse } from './response';
import { useMutation, MutationOptions } from 'react-query';

const router = '/recruitments';

export const getAllRecruitmentForm = async (
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType
) => {
	const { year, page, company_name, start, end, status } =
		searchRecruitmentFormQueryString;
	const { data } = await instance.get<Promise<RecruitmentFormResponse>>(
		`${router}/teacher?year=${year}&page=${page}&company_name=${company_name}&start=${start}&end=${end}&status=${
			status === '전체' || status === undefined ? '' : status
		}`
	);
	return data;
};

export const useChangeRecruitmentsStatus = (
	status: string,
	recruitment_ids: string[],
	options: MutationOptions
) => {
	const data = {
		recruitment_ids,
		status,
	};

	return useMutation(async () => instance.patch(`${router}/status`, data), {
		...options,
	});
};
