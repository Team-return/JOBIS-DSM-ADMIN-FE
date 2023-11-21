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
import {
	useMutation,
	MutationOptions,
	useQueries,
	useQuery,
} from 'react-query';

const router = '/recruitments';

/** 모집의뢰서를 조회하는 api입니다. */
export const useGetRecruitmentForm = (
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType
) => {
	return useQueries([
		{
			queryKey: [
				'getAllRecruitmentForm',
				searchRecruitmentFormQueryString,
			],
			queryFn: async () => {
				const {
					year,
					page,
					company_name,
					start,
					end,
					status,
					winter_intern,
				} = searchRecruitmentFormQueryString;
				const winterIntern =
					winter_intern !== null
						? `&winter_intern=${winter_intern}`
						: '';
				const { data } = await instance.get<RecruitmentFormResponse>(
					`${router}/teacher?year=${year}&page=${page}${winterIntern}&company_name=${company_name}&start=${start}&end=${end}&status=${
						status === '전체' || status === undefined ? '' : status
					}`
				);
				return data;
			},
		},
		{
			queryKey: [
				'getAllRecruitmentFormPageNum',
				searchRecruitmentFormQueryString,
			],
			queryFn: async () => {
				const { year, company_name, start, end, status } =
					searchRecruitmentFormQueryString;
				const { data } = await instance.get<{
					total_page_count: number;
				}>(
					`${router}/teacher/count?year=${year}&company_name=${company_name}&start=${start}&end=${end}&status=${
						status === '전체' || status === undefined ? '' : status
					}`
				);
				return data;
			},
			enabled: false,
		},
	]);
};

/** 모집의뢰서를 상세 조회하는 api입니다. */
export const useGetRecruitmentFormDetail = (recruitmentId: string) => {
	return useQuery(
		['getAllRecruitmentForm', recruitmentId],
		async () => {
			const { data } = await instance.get<RecruitmentFormDetailResponse>(
				`${router}/${recruitmentId}`
			);
			return data;
		},
		{
			refetchOnWindowFocus: true,
		}
	);
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
