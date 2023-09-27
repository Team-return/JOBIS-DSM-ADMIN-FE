import { instance } from '../axios';
import {
	EditAreasType,
	EditRecruitmentRequest,
	RecruitmentFormQueryStringType,
} from './request';
import {
	RecruitmentFormDetailResponse,
	RecruitmentFormResponse,
} from './response';
import { useMutation, MutationOptions } from 'react-query';

const router = '/recruitments';

/** 모집의뢰서 상세 조회 */
export const getRecruitmentFormDetail = async (recruitmentId: string) => {
	const { data } = await instance.get<RecruitmentFormDetailResponse>(
		`${router}/${recruitmentId}`
	);
	return data;
};

/** 선생님 모집의뢰 리스트 조회 */
export const getAllRecruitmentForm = async (
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType
) => {
	const { year, page, company_name, start, end, status } =
		searchRecruitmentFormQueryString;
	const { data } = await instance.get<RecruitmentFormResponse>(
		`${router}/teacher?year=${year}&page=${page}&company_name=${company_name}&start=${start}&end=${end}&status=${
			status === '전체' || status === undefined ? '' : status
		}`
	);
	return data;
};

/** 선생님 모집의뢰 상태 변경 */
export const useChangeRecruitmentsStatus = (
	status: string,
	recruitmentIds: string[],
	options: MutationOptions
) => {
	const data = {
		recruitmentIds,
		status,
	};

	return useMutation(async () => instance.patch(`${router}/status`, data), {
		...options,
	});
};

/** 모집 분야 삭제 */
export const useDeleteArea = (areaIds: number, options: MutationOptions) => {
	return useMutation(
		async () => instance.delete(`${router}/area/${areaIds}`),
		{
			...options,
		}
	);
};

/** 모집 분야 수정 */
export const useEditArea = (
	areaIds: number,
	area: EditAreasType,
	options: MutationOptions
) => {
	return useMutation(
		async () => instance.patch(`${router}/area/${areaIds}`, area),
		{
			...options,
		}
	);
};

/** 모집 분야 추가 */
export const useAddArea = (
	recruitmentId: string,
	area: EditAreasType,
	options: MutationOptions
) => {
	return useMutation(
		async () => instance.post(`${router}/${recruitmentId}/area`, area),
		{
			...options,
		}
	);
};

/** 모집 의뢰 수정 */
export const useEditRecruitment = (
	recruitmentId: string,
	recruitmentData: EditRecruitmentRequest,
	options: MutationOptions
) => {
	return useMutation(
		async () =>
			instance.patch(`${router}/${recruitmentId}`, recruitmentData),
		{
			...options,
		}
	);
};
