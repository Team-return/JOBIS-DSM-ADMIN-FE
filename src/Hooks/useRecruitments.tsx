import { useQuery } from 'react-query';
import { getAllRecruitmentForm } from '../apis/Recruitments';
import { RecruitmentFormQueryStringType } from '../apis/Recruitments/request';

export const useRecruitmentForm = (searchRecruitmentFormQueryString: RecruitmentFormQueryStringType) =>
	useQuery(['getAllRecruitmentForm'], () => getAllRecruitmentForm(searchRecruitmentFormQueryString), {
		refetchOnWindowFocus: true,
	});
