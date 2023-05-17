import { useQuery } from 'react-query';
import { getAllReviewSubmission } from '../../Apis/Reviews';

/** 특정 회사 후기 리스트를 조회하는 api입니다. */
export function useGetReviewSubmission(company_id: string) {
	return useQuery(['getReviewSubmission', company_id], () => getAllReviewSubmission(company_id), {
		refetchOnWindowFocus: true,
	});
}
