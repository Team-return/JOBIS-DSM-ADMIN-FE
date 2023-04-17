import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { RecruitmentFormQueryStringType } from '../../../apis/RecruitmentForm/request';
import { Dispatch, SetStateAction, useState } from 'react';

interface PropsType {
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType;
	setSearchRecruitmentFormQueryString: Dispatch<SetStateAction<RecruitmentFormQueryStringType>>;
	refetchRecruitmentForm: () => void;
}

const RecruitmentFormSearch = ({ searchRecruitmentFormQueryString, setSearchRecruitmentFormQueryString, refetchRecruitmentForm }: PropsType) => {
	const date = new Date(); // 현재 날짜 및 시간
	const iYear = date.getFullYear(); // 연도

	const [data, setData] = useState<RecruitmentFormQueryStringType>({
		year: searchRecruitmentFormQueryString.year,
		company_name: '',
		start: '',
		end: '',
		status: '',
		page: searchRecruitmentFormQueryString.page,
	});

	const onInputValeChange = (e: any) => {
		const { value, name } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const statusChangeValue = (e: string) => {
		switch (e) {
			case '전체':
				return setData({
					...data,
					status: '',
				});
			case '모집전':
				return setData({
					...data,
					status: 'READY',
				});
			case '모집중':
				return setData({
					...data,
					status: 'RECRUITING',
				});
			case '종료':
				return setData({
					...data,
					status: 'DONE',
				});
			case '접수요청':
				return setData({
					...data,
					status: 'REQUESTED',
				});
			default:
				return setData({
					...data,
					status: '',
				});
		}
	};

	let yearData = [];

	for (let i = 0; i <= 10; i++) {
		yearData.push(String(iYear - i));
	}

	const searching = () => {
		setSearchRecruitmentFormQueryString({
			...searchRecruitmentFormQueryString,
			year: data.year,
			company_name: data.company_name.replace(/^\s*/, ''),
			start: data.start,
			end: data.end,
			status: data.status,
		});
		setTimeout(refetchRecruitmentForm);
	};

	return (
		<_.Container>
			<_.Wrapper>
				<_.TitleText>모집년도</_.TitleText>
				<_.ContentWrapper>
					<DropDown
						onChange={(e) => {
							setData({
								...data,
								year: e,
							});
						}}
						width={23}
						option={yearData}
					/>
				</_.ContentWrapper>
				<_.TitleText>의뢰일자</_.TitleText>
				<_.ContentWrapper width={17} style={{ paddingRight: '15px' }}>
					<_.DateInput max={data.end} name="start" value={data.start} onChange={onInputValeChange} type="date" />
					<div> ~ </div>
					<_.DateInput min={data.start} name="end" value={data.end} onChange={onInputValeChange} type="date" />
				</_.ContentWrapper>
			</_.Wrapper>
			<_.Wrapper>
				<_.TitleText>기업명</_.TitleText>
				<_.ContentWrapper>
					<Input width={96} name="company_name" value={data.company_name} onChange={onInputValeChange} placeHolder="검색어 입력" iconName="Search" />
				</_.ContentWrapper>
				<_.TitleText>모집상태</_.TitleText>
				<_.ContentWrapper width={17}>
					<DropDown
						onChange={(e) => {
							statusChangeValue(e);
						}}
						width={40}
						option={['전체', '모집전', '모집중', '종료', '접수요청']}
					/>
				</_.ContentWrapper>
				<_.Btn>
					<Button onClick={searching}>조회</Button>
				</_.Btn>
			</_.Wrapper>
		</_.Container>
	);
};

export default RecruitmentFormSearch;
