import { useMutation, MutationOptions } from 'react-query';
import { instance } from '../axios';
import { ApplicantInfoQueryStringType } from './request';
import { ApplicationResponse } from './response';

const router = '/applications';

export const getApplicantInfo = async (applicationQueryString: ApplicantInfoQueryStringType) => {
	const { page, application_status, student_name, company_id } = applicationQueryString;
	const pageNum = page ? `&page=${page}` : '';
	const studentName = student_name ? `&student_name=${student_name}` : '';
	const companyId = company_id ? `&company_id=${company_id}` : '';
	const queryString = application_status || student_name || company_id || page ? `?application_status=${application_status}${companyId}${studentName}${pageNum}` : '';
	const { data } = await instance.get<Promise<ApplicationResponse>>(`${router}${queryString}`);
	return data;
};

export const useChangeRequestStatus = (id: number[], status: string, options: MutationOptions) => {
	const data = {
		application_ids: id,
		status: status,
	};

	return useMutation(async () => instance.patch(`${router}/status`, data), {
		...options,
	});
};

export const useChangeTrainDate = (id: number[], start_date: Date, end_date: Date, options: MutationOptions) => {
	const data = {
		student_ids: id,
		start_date: start_date,
		end_date: end_date,
	};

	return useMutation(async () => instance.patch(`${router}/train-date`, data), {
		...options,
	});
};

export const useRejectApplication = (id: number, reason: string, options: MutationOptions) => {
	return useMutation(async () => instance.patch(`${router}/reject/${id}`, { reason: reason }), {
		...options,
	});
};
