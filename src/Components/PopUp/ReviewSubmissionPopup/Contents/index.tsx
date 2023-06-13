import { ReviewSubmissioDetailnResponse } from '../../../../Apis/Reviews/response';
import * as _ from './style';

interface PropsType {
	reviewSubmissionDetail: ReviewSubmissioDetailnResponse;
	reviewSubmissionDetailIsLoading: boolean;
}

export function ReviewSubmissionContents({
	reviewSubmissionDetail,
	reviewSubmissionDetailIsLoading,
}: PropsType) {
	return (
		<>
			{reviewSubmissionDetail ? (
				<_.Container>
					<_.TextWrapper>
						<_.ChoiceText>선택 :</_.ChoiceText>
						<_.StudentText>
							{reviewSubmissionDetail?.writer}
						</_.StudentText>
					</_.TextWrapper>
					<_.ContentsBox>
						{reviewSubmissionDetail?.qna_responses.map((qna, i) => {
							return (
								<div key={i}>
									<_.TitleWrapper>
										<_.Title>{qna.question}</_.Title>
										<_.Business>{qna.area}</_.Business>
									</_.TitleWrapper>
									<_.Contents>{qna.answer}</_.Contents>
								</div>
							);
						})}
					</_.ContentsBox>
				</_.Container>
			) : (
				<_.Container>
					<_.TextWrapper>
						<_.ChoiceText>선택 :</_.ChoiceText>
						<_.StudentText>선택된 학생이 없습니다</_.StudentText>
					</_.TextWrapper>
					<_.NottingBox>선택된 학생이 없습니다</_.NottingBox>
				</_.Container>
			)}
		</>
	);
}
