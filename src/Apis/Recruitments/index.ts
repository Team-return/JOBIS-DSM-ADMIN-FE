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
			enabled: false,
		},
		{
			queryKey: [
				'getAllRecruitmentFormPageNum',
				searchRecruitmentFormQueryString,
			],
			queryFn: async () => {
				const {
					year,
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
				const { data } = await instance.get<{
					total_page_count: number;
				}>(
					`${router}/teacher/count?year=${year}${winterIntern}&company_name=${company_name}&start=${start}&end=${end}&status=${
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
	recruitmentData: Omit<EditRecruitmentRequest, 'start_time' | 'end_time'>,
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

/**모집의뢰서 총 개수 조회 */
export const useRecruitmentCount = () => {
	return useQuery(['RecruitmentCount'], async () => {
		const { data } = await instance.get(`${router}/count`);
		return data;
	});
};


export const useRecruitmentExcel = (options: MutationOptions) => {
	return useMutation(async () => {
		const { data } = await instance.get(`${router}/file`, {
			responseType: 'blob',
		});
		const url = window.URL.createObjectURL(new Blob([data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', '모집기업의뢰서.xlsx');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, options);
};
