import { useQuery } from 'react-query';
import {
	getAllRecruitmentForm,
	getRecruitmentFormDetail,
} from '../../Apis/Recruitments';
import { RecruitmentFormQueryStringType } from '../../Apis/Recruitments/request';

/** 모집의뢰서를 조회하는 api입니다. */
export function useGetRecruitmentForm(
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType
) {
	return useQuery(
		['getAllRecruitmentForm', searchRecruitmentFormQueryString],
		() => getAllRecruitmentForm(searchRecruitmentFormQueryString),
		{
			refetchOnWindowFocus: true,
		}
	);
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
