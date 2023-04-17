import { useQuery } from 'react-query';
import { getAllRecruitmentForm } from '../apis/RecruitmentForm';
import { RecruitmentFormQueryStringType } from '../apis/RecruitmentForm/request';

export const useRecruitmentForm = (searchRecruitmentFormQueryString: RecruitmentFormQueryStringType) =>
	useQuery(['getAllRecruitmentForm'], () => getAllRecruitmentForm(searchRecruitmentFormQueryString), {
		refetchOnWindowFocus: true,
	});
