import { useQuery } from 'react-query';
import { instance } from '../axios';
import {
	ReviewSubmissionDetailResponse,
	ReviewSubmissionResponse,
} from './response';

const router = '/reviews';

/** 특정 회사 후기 리스트를 조회하는 api입니다. */
export const useGetReviewSubmission = (company_id: string) => {
	return useQuery(
		['getReviewSubmission', company_id],
		async () => {
			const { data } = await instance.get<ReviewSubmissionResponse>(
				`${router}/${company_id}`
			);
			return data;
		},
		{
			refetchOnWindowFocus: true,
		}
	);
};

/** 특정 회사 후기 리스트에서 특정 인물의 후기를 조회하는 api입니다. */
export const useGetReviewSubmissionDetail = (review_id: string) => {
	return useQuery(
		['getReviewSubmissionDetail', review_id],
		async () => {
			const { data } = await instance.get<
				Promise<ReviewSubmissionDetailResponse>
			>(`${router}/details/${review_id}`);
			return data;
		},
		{
			refetchOnWindowFocus: true,
			enabled: review_id !== '',
		}
	);
};
