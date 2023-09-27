import { useQueries, useQuery } from 'react-query';
import {
	getAllRecruitmentForm,
	getAllRecruitmentFormPageNum,
	getRecruitmentFormDetail,
} from '../../Apis/Recruitments';
import { RecruitmentFormQueryStringType } from '../../Apis/Recruitments/request';

/** 모집의뢰서를 조회하는 api입니다. */
export function useGetRecruitmentForm(
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType
) {
	return useQueries([
		{
			queryKey: [
				'getAllRecruitmentForm',
				searchRecruitmentFormQueryString,
			],
			queryFn: () =>
				getAllRecruitmentForm(searchRecruitmentFormQueryString),
		},
		{
			queryKey: [
				'getAllRecruitmentFormPageNum',
				searchRecruitmentFormQueryString,
			],
			queryFn: () =>
				getAllRecruitmentFormPageNum(searchRecruitmentFormQueryString),
		},
	]);
}

/** 모집의뢰서를 조회하는 api입니다. */
export function useGetRecruitmentFormDetail(recruitmentId: string) {
	return useQuery(
		['getAllRecruitmentForm', recruitmentId],
		() => getRecruitmentFormDetail(recruitmentId),
		{
			refetchOnWindowFocus: true,
		}
	);
}
