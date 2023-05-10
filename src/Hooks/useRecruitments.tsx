import { useQuery } from 'react-query';
import { getAllRecruitmentForm } from '../Apis/Recruitments';
import { RecruitmentFormQueryStringType } from '../Apis/Recruitments/request';

export const useRecruitmentForm = (searchRecruitmentFormQueryString: RecruitmentFormQueryStringType) =>
	useQuery(['getAllRecruitmentForm'], () => getAllRecruitmentForm(searchRecruitmentFormQueryString), {
		refetchOnWindowFocus: true,
	});
