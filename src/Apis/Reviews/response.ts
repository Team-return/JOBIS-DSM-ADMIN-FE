export interface ReviewSubmissionResponse {
	reviews: ReviewSubmissionType[];
}

export interface ReviewSubmissionType {
	review_id: string;
	year: number;
	writer: string;
	date: string;
}

export interface ReviewSubmissionDetailResponse {
	year: number;
	answer: string;
	created_date: string;
	qna_responses: QnaResponsesType[];
}

export interface QnaResponsesType {
	question: string;
	answer: string;
	area: string;
}
