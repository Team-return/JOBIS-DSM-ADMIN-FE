import { useQuery } from 'react-query';
import { getAllReviewSubmission } from '../../Apis/Reviews';
import { getAllReviewSubmissionDetail } from '../../Apis/Reviews';

/** 특정 회사 후기 리스트를 조회하는 api입니다. */
export function useGetReviewSubmission(company_id: string) {
	return useQuery(
		['getReviewSubmission', company_id],
		() => getAllReviewSubmission(company_id),
		{
			refetchOnWindowFocus: true,
		}
	);
}

/** 특정 회사 후기 리스트에서 특정 인물의 후기를 조회하는 api입니다. */
export function useGetReviewSubmissionDetail(review_id: string) {
	return useQuery(
		['getReviewSubmissionDetail', review_id],
		() => getAllReviewSubmissionDetail(review_id),
		{
			refetchOnWindowFocus: true,
			enabled: review_id !== '',
		}
	);
}
