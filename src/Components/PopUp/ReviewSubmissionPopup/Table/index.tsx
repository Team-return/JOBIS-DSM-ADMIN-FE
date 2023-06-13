import { Button, Input, RadioButton, Table } from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction, useState } from 'react';
import { ReviewSubmissionResponse } from '../../../../Apis/Reviews/response';
import { useForm } from '../../../../Hooks/useForm';

interface PropsType {
	reviewSubmission: ReviewSubmissionResponse;
	reviewSubmissionIsLoading: boolean;
	setReviewId: Dispatch<SetStateAction<string>>;
	refetchReviewSubmissionDetail: () => void;
}

export function ReviewSubmissionTable({
	reviewSubmission,
	reviewSubmissionIsLoading,
	setReviewId,
	refetchReviewSubmissionDetail,
}: PropsType) {
	const { form: searchInput, handleChange } = useForm({
		searchInputValue: '',
	});
	const [searchKeyword, setSearchKeyword] = useState('');

	const filteredReviews = reviewSubmission?.reviews.filter((review) =>
		review.writer.includes(searchKeyword)
	);
	const dataLength = filteredReviews?.length || 0;

	const loadingTableDataArray = Array.from({ length: 5 }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
	]);
	const emptyTableDataArray = Array.from({ length: 5 - dataLength }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
	]);
	const tableAllDatas: JSX.Element[][] = filteredReviews
		?.map((review) => {
			const ClickCheckBox = () => {
				setReviewId(review.review_id);
				refetchReviewSubmissionDetail();
			};

			return [
				<RadioButton name="review" onClick={ClickCheckBox} />,
				<_.ContentText>{review.year}</_.ContentText>, // 연도
				<_.ContentText>{review.writer}</_.ContentText>, // 작성자
				<_.ContentText>{review.created_date}</_.ContentText>, // 후기 작성일자
			];
		})
		.concat(emptyTableDataArray);

	const searchBtnClick = () => {
		setSearchKeyword(searchInput.searchInputValue);
	};

	const tableTitle: JSX.Element[] = [
		<RadioButton disabled={true} />,
		<_.TitleText>연도</_.TitleText>,
		<_.TitleText>작성자</_.TitleText>,
		<_.TitleText>후기 작성일자</_.TitleText>,
	];
	const tableWidth: number[] = [15, 25, 25, 35];

	return (
		<_.Container>
			<_.SearchWrapper>
				<_.InputWrapper>
					<_.CompanyText>작성자명</_.CompanyText>
					<Input
						margin={[0, 0, 0, 20]}
						iconName="Search"
						width={65}
						placeHolder="작성자명"
						name="searchInputValue"
						value={searchInput.searchInputValue}
						onChange={handleChange}
					/>
				</_.InputWrapper>
				<Button onClick={searchBtnClick}>조회</Button>
			</_.SearchWrapper>
			<_.TableWrapper>
				<Table
					tableData={
						reviewSubmissionIsLoading
							? loadingTableDataArray
							: tableAllDatas
					}
					title={tableTitle}
					width={tableWidth}
				/>
			</_.TableWrapper>
		</_.Container>
	);
}
