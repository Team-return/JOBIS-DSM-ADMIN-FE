import { useQuery } from 'react-query';
import { getAllRecruitmentForm } from '../../Apis/Recruitments';
import { RecruitmentFormQueryStringType } from '../../Apis/Recruitments/request';

/** 모집의뢰서를 조회하는 api입니다. */
export function useRecruitmentForm(searchRecruitmentFormQueryString: RecruitmentFormQueryStringType) {
	return useQuery(['getAllRecruitmentForm'], () => getAllRecruitmentForm(searchRecruitmentFormQueryString), {
		refetchOnWindowFocus: true,
	});
}
