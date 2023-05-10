import { useMutation, MutationOptions } from 'react-query';
import { instance } from '../axios';
import { ApplicantInfoQueryStringType } from './request';
import { ApplicationResponse } from './response';

const router = '/applications';

export const getApplicantInfo = async (applicationQueryString: ApplicantInfoQueryStringType) => {
	const { application_status, student_name, company_id } = applicationQueryString;
	const studentName = student_name ? `&student_name=${student_name}` : '';
	const queryString = application_status || student_name || company_id ? `?application_status=${application_status}&company_id=${company_id}${studentName}` : '';
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