import { MutationOptions, useMutation } from 'react-query';
import { instance } from '../axios';
import { CombinedStudentListResponse } from './response';
import { DateProps } from './request';

const router = '/acceptances';

export const getCombinedStudentList = async (company_id: number) => {
	const { data } = await instance.get<Promise<CombinedStudentListResponse>>(
		`${router}/${company_id}`
	);
	return data;
};

export const useDeleteInternshipStudent = (
	application_ids: number[],
	options: MutationOptions
) => {
	return useMutation(
		async () => instance.delete(`${router}`, { data: { application_ids } }),
		{
			...options,
		}
	);
};

export const useChangeStudentContractDate = (
	acceptance_ids: number[],
	contract_date: string,
	options: MutationOptions
) => {
	const data = {
		acceptance_ids,
		contract_date,
	};
	return useMutation(
		async () => instance.patch(`${router}/contract-date`, data),
		{
			...options,
		}
	);
};

export const useChangeEmployment = (
	code_keywords: string[],
	application_ids: number[],
	options: MutationOptions
) => {
	const data = {
		code_keywords,
		application_ids,
	};
	return useMutation(
		async () => instance.post(`${router}/employment`, data),
		{
			...options,
		}
	);
};

export const useChangeStudentFieldTrain = (
	application_ids: number[],
	date: DateProps,
	options: MutationOptions
) => {
	const data = {
		application_ids,
		start_date: date.start_date,
		end_date: date.end_date,
	};
	return useMutation(
		async () => instance.patch(`${router}/field-train`, data),
		{
			...options,
		}
	);
};
