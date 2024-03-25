import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { useRecruitmentFormQueryString } from '../../../Store/State';
import { winterIntern } from '../../../Utils/Translation';
import { getValueByKey } from '../../../Utils/useGetPropertyKey';

interface PropsType {
	refetchRecruitmentForm: () => void;
}

export function RecruitmentFormSearch({ refetchRecruitmentForm }: PropsType) {
	const date = new Date(); // 현재 날짜 및 시간
	const iYear = date.getFullYear(); // 연도

	const {
		recruitmentFormQueryString,
		setDefaultRecruitmentFormQueryString,
		recruitmentFormQueryStringDropDown,
		recruitmentFormQueryStringHandler,
		setRecruitmentFormPage,
	} = useRecruitmentFormQueryString();

	/** 년도를 순서대로 배열로 만들어 저장합니다. */
	const yearData = Array.from({ length: 11 }, (_, i) =>
		(iYear - i).toString()
	);

	const search = () => {
		setRecruitmentFormPage();
		setTimeout(refetchRecruitmentForm);
	};

	return (
		<_.Container>
			<_.Wrapper>
				<_.TitleText>모집년도</_.TitleText>
				<_.ContentWrapper>
					<DropDown
						width={23}
						option={yearData}
						value={recruitmentFormQueryString.year}
						onChange={(yearData) =>
							recruitmentFormQueryStringDropDown('year', yearData)
						}
					/>
				</_.ContentWrapper>
				<_.TitleText>의뢰일자</_.TitleText>
				<_.ContentWrapper width={17} style={{ paddingRight: '15px' }}>
					<_.DateInput
						name="start"
						type="date"
						value={recruitmentFormQueryString.start}
						onChange={recruitmentFormQueryStringHandler}
						max={recruitmentFormQueryString.end}
					/>
					<div> ~ </div>
					<_.DateInput
						name="end"
						type="date"
						value={recruitmentFormQueryString.end}
						onChange={recruitmentFormQueryStringHandler}
						min={recruitmentFormQueryString.start}
					/>
				</_.ContentWrapper>
				<_.TitleText>모집구분</_.TitleText>
				<_.ContentWrapper width={12.3}>
					<DropDown
						width={86}
						option={['체험형', '채용형']}
						value={getValueByKey(
							winterIntern,
							recruitmentFormQueryString.winter_intern
						)}
						onChange={(type) =>
							recruitmentFormQueryStringDropDown(
								'winter_intern',
								winterIntern[type]
							)
						}
					/>
				</_.ContentWrapper>
			</_.Wrapper>
			<_.Wrapper>
				<_.TitleText>기업명</_.TitleText>
				<_.ContentWrapper>
					<Input
						width={96}
						name="company_name"
						value={recruitmentFormQueryString.company_name}
						onChange={recruitmentFormQueryStringHandler}
						placeholder="기업명 입력"
					/>
				</_.ContentWrapper>
				<_.TitleText>모집상태</_.TitleText>
				<_.ContentWrapper width={17}>
					<DropDown
						width={42}
						option={[
							'전체',
							'모집전',
							'모집중',
							'종료',
							'접수요청',
						]}
						value={recruitmentFormQueryString.status || '전체'}
						onChange={(statusData) =>
							recruitmentFormQueryStringDropDown(
								'status',
								statusData
							)
						}
					/>
				</_.ContentWrapper>
				<_.ButtonWrapper>
					<Button onClick={search}>조회</Button>
					<Button
						kind="Gray"
						onClick={setDefaultRecruitmentFormQueryString}
						margin={[0, 10, 0, 0]}
					>
						초기화
					</Button>
				</_.ButtonWrapper>
			</_.Wrapper>
		</_.Container>
	);
}
