import { MutationOptions, useMutation, useQuery } from 'react-query';
import { instance } from '../axios';
import { CombinedStudentListResponse } from './response';

const router = '/acceptances';

/** 현장실습생, 근로계약생 조회 */
export const useGetCombinedStudentList = (company_id: number) => {
	return useQuery(
		['getCombinedStudentList', company_id],
		async () => {
			const { data } = await instance.get<CombinedStudentListResponse>(
				`${router}/${company_id}`
			);
			return data;
		},
		{
			refetchOnWindowFocus: true,
			enabled: company_id !== 0,
		}
	);
};

/** 현장실습생 삭제 */
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

/** 근로계약일자 변경 */
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

/** 근로계약 전환 */
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

/** 현장실습생 전환 */
export const useChangeStudentFieldTrain = (
	application_ids: number[],
	start_date: string,
	end_date: string,
	options: MutationOptions
) => {
	const data = {
		application_ids,
		start_date,
		end_date,
	};
	return useMutation(
		async () => instance.patch(`${router}/field-train`, data),
		{
			...options,
		}
	);
};
