import { instance } from '../axios';
import {
	ReviewSubmissioDetailnResponse,
	ReviewSubmissionResponse,
} from './response';

const router = '/reviews';

/** 리뷰 후기 리스트 조회 */
export const getAllReviewSubmission = async (company_id: string) => {
	const { data } = await instance.get<Promise<ReviewSubmissionResponse>>(
		`${router}/${company_id}`
	);
	return data;
};

/** 리뷰 후기 상세 조회 */
export const getAllReviewSubmissionDetail = async (review_id: string) => {
	const { data } = await instance.get<
		Promise<ReviewSubmissioDetailnResponse>
	>(`${router}/details/${review_id}`);
	return data;
};
