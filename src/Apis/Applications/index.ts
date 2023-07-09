import { useMutation, MutationOptions } from 'react-query';
import { instance } from '../axios';
import { ApplicantInfoQueryStringType } from './request';
import { ApplicationResponse, InternshipStudentResponse } from './response';

const router = '/applications';

/** 지원서 리스트 조회 */
export const getApplicantInfo = async (
	applicationQueryString: ApplicantInfoQueryStringType
) => {
	const { page, application_status, student_name, company_id } =
		applicationQueryString;
	const pageNum = page ? `&page=${page}` : '';
	const studentName = student_name ? `&student_name=${student_name}` : '';
	const companyId = company_id ? `&company_id=${company_id}` : '';
	const queryString =
		application_status || student_name || company_id || page
			? `?application_status=${
					application_status ? application_status : ''
			  }${companyId}${studentName}${pageNum}`
			: '';
	const { data } = await instance.get<Promise<ApplicationResponse>>(
		`${router}${queryString}`
	);
	return data;
};

/** 현장실습생 전환시 학생 조회 */
export const getInternshipStudent = async (company_id: number) => {
	const { data } = await instance.get<Promise<InternshipStudentResponse>>(
		`${router}/pass/${company_id}`
	);
	return data;
};

/** 지원상태 변경 */
export const useChangeRequestStatus = (
	id: number[],
	status: string,
	options: MutationOptions
) => {
	const data = {
		application_ids: id,
		status: status,
	};

	return useMutation(async () => instance.patch(`${router}/status`, data), {
		...options,
	});
};

/** 현장실습 일자 변경 */
export const useChangeTrainDate = (
	application_ids: number[],
	start_date: Date | string,
	end_date: Date | string,
	options: MutationOptions
) => {
	const data = {
		application_ids,
		start_date,
		end_date,
	};

	return useMutation(
		async () => instance.patch(`${router}/train-date`, data),
		{
			...options,
		}
	);
};

/** 지원서 반려 */
export const useRejectApplication = (
	id: number,
	reason: string,
	options: MutationOptions
) => {
	return useMutation(
		async () =>
			instance.patch(`${router}/reject/${id}`, { reason: reason }),
		{
			...options,
		}
	);
};
