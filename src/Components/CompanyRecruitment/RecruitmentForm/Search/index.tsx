import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction, useState } from 'react';

interface PropsType {}

export function RecruitmentFormSearch({}: PropsType) {
	const [data, setData] = useState({
		company_name: '',
		start: '',
		end: '',
		status: '',
	});

	const onInputValeChange = (e: any) => {
		const { value, name } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const defaultData = () => {
		setData({
			company_name: '',
			start: '',
			end: '',
			status: '',
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

	// let yearData = [];

	for (let i = 0; i <= 10; i++) {
		// yearData.push(String(iYear - i));
	}

	const searching = () => {
		// setSearchRecruitmentFormQueryString({
		// 	year: data.year
		// 	company_name: '',
		// 	start: data.start,
		// 	end: data.end,
		// 	status: data.status,
		// });
		setTimeout(() => {});
	};

	return (
		<_.Container>
			<_.Wrapper>
				<_.TitleText>기업구분</_.TitleText>
				<_.ContentWrapper>
					<DropDown onChange={(e) => {}} width={23} option={[]} />
				</_.ContentWrapper>
				<_.TitleText>지역</_.TitleText>
				<_.ContentWrapper width={17} style={{ paddingRight: '15px' }}>
					<DropDown onChange={(e) => {}} width={23} option={[]} />
				</_.ContentWrapper>
			</_.Wrapper>
			<_.Wrapper>
				<_.TitleText>기업명</_.TitleText>
				<_.ContentWrapper>
					<Input width={96} name="company_name" value={data.company_name} onChange={onInputValeChange} placeHolder="검색어 입력" iconName="Search" />
				</_.ContentWrapper>
				<_.TitleText>사업분야</_.TitleText>
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
					<Button kind="Gray" onClick={defaultData}>
						초기화
					</Button>
				</_.Btn>
			</_.Wrapper>
		</_.Container>
	);
}
