import {
	useMutation,
	MutationOptions,
	useQuery,
} from 'react-query';
import { instance } from '../axios';
import { ApplicantInfoQueryStringType } from './request';
import { ApplicationResponse, InternshipStudentResponse } from './response';

const router = '/applications';

/** 지원서를 조회하는 api입니다. */
export const useGetApplicantInfo = (
	applicationQueryString: ApplicantInfoQueryStringType
) => {
	return useQuery({
		queryKey: ['getApplicantInfo', applicationQueryString],
		queryFn: async () => {
			const { page, application_status, student_name, recruitment_id, year } =
				applicationQueryString;
			const pageNum = page ? `&page=${page}` : '';
			const studentName = student_name
				? `&student_name=${student_name}`
				: '';
			const companyId = recruitment_id
				? `&recruitment_id=${recruitment_id}`
				: '';
			const queryString =
				application_status || student_name || recruitment_id || page
					? `&application_status=${
							application_status ? application_status : ''
					  }${companyId}${studentName}${pageNum}`
					: '';
			const { data } = await instance.get<ApplicationResponse>(
				`${router}?year=${year}${queryString}`
			);
			return data;
		},
		enabled: false,
	});
};

/** 현장실습생 전환시 학생 조회 */
export const useGetInternshipStudent = (company_id: number) => {
	return useQuery(['getInternshipStudent', company_id], async () => {
		const { data } = await instance.get<InternshipStudentResponse>(
			`${router}/pass/${company_id}`
		);
		return data;
	});
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
			instance.patch(`${router}/rejection/${id}`, { reason: reason }),
		{
			...options,
		}
	);
};

/**지원서 총 개수 조회 */
export const useApplicationCnt = () => {
	return useQuery(['applicationCnt'], async () => {
		const data = await instance.get<CntType>(`${router}/teacher/count`);
		return data.data;
	});
};
