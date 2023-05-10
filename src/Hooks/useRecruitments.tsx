import { useQuery } from 'react-query';
import { getAllRecruitmentForm } from '../Apiss/Recruitments';
import { RecruitmentFormQueryStringType } from '../Apiss/Recruitments/request';

export const useRecruitmentForm = (searchRecruitmentFormQueryString: RecruitmentFormQueryStringType) =>
	useQuery(['getAllRecruitmentForm'], () => getAllRecruitmentForm(searchRecruitmentFormQueryString), {
		refetchOnWindowFocus: true,
	});
