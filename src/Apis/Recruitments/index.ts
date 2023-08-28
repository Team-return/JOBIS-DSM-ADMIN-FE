import { instance } from '../axios';
import { RecruitmentFormQueryStringType } from './request';
import {
	RecruitmentFormDetailResponse,
	RecruitmentFormResponse,
} from './response';
import { useMutation, MutationOptions } from 'react-query';

const router = '/recruitments';

/** 모집의뢰서 상세 조회 */
export const getRecruitmentFormDetail = async (recruitmentId: string) => {
	const { data } = await instance.get<Promise<RecruitmentFormDetailResponse>>(
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
	const { data } = await instance.get<Promise<RecruitmentFormResponse>>(
		`${router}/teacher?year=${year}&page=${page}&company_name=${company_name}&start=${start}&end=${end}&status=${
			status === '전체' || status === undefined ? '' : status
		}`
	);
	return data;
};

/** 선생님 모집의뢰 상태 변경 */
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
