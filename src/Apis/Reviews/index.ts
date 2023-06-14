import { instance } from '../axios';
import {
	ReviewSubmissioDetailnResponse,
	ReviewSubmissionResponse,
} from './response';

const router = '/reviews';

export const getAllReviewSubmission = async (company_id: string) => {
	const { data } = await instance.get<Promise<ReviewSubmissionResponse>>(
		`${router}/${company_id}`
	);
	return data;
};

export const getAllReviewSubmissionDetail = async (review_id: string) => {
	const { data } = await instance.get<
		Promise<ReviewSubmissioDetailnResponse>
	>(`${router}/details/${review_id}`);
	return data;
};
