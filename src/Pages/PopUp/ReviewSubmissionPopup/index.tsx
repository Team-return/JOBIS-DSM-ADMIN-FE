import * as _ from './style';
import { Button } from '@team-return/design-system';
import { useGetReviewSubmission, useGetReviewSubmissionDetail } from '../../../Hooks/ApiHooks/Reviews';
import { ReviewSubmissionTable } from '../../../Components/PopUp/ReviewSubmissionPopup/Table';
import { useState } from 'react';
import { ReviewSubmissionContents } from '../../../Components/PopUp/ReviewSubmissionPopup/Contents';

export function ReviewSubmissionPopup() {
	const companyId = new URLSearchParams(window.location.search).get('company_id');
	const [reviewId, setReviewId] = useState('');

	const { data: reviewSubmission, isLoading: reviewSubmissionIsLoading } = useGetReviewSubmission(companyId!);
	const { data: reviewSubmissionDetail, refetch: refetchReviewSubmissionDetail, isLoading: reviewSubmissionDetailIsLoading } = useGetReviewSubmissionDetail(reviewId);

	return (
		<>
			<ReviewSubmissionTable
				reviewSubmission={reviewSubmission!}
				reviewSubmissionIsLoading={reviewSubmissionIsLoading}
				setReviewId={setReviewId}
				refetchReviewSubmissionDetail={refetchReviewSubmissionDetail}
			/>
			<ReviewSubmissionContents reviewSubmissionDetail={reviewSubmissionDetail!} reviewSubmissionDetailIsLoading={reviewSubmissionDetailIsLoading} />
			<_.BtnWrapper>
				<Button onClick={() => window.close()}>닫기</Button>
			</_.BtnWrapper>
		</>
	);
}
