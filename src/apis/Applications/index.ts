import { instance } from '../axios';
import { ApplicantInfoQueryStringType } from './request';

const router = '/applications';

export const getApplicantInfo = async (applicationQueryString: ApplicantInfoQueryStringType) => {
	const { application_status, student_name, company_id } = applicationQueryString;
	const queryString = application_status && student_name && company_id ? `?application_status=${application_status}&student_name=${student_name}company_id=${company_id}` : '';
	const { data } = await instance.get<Promise<ApplicantInfoQueryStringType>>(`${router}/teacher${queryString}`);
	return data;
};
