import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { RecruitmentFormQueryStringType, StatusType } from '../../../Apiss/Recruitments/request';
import { Dispatch, SetStateAction, useState } from 'react';

interface PropsType {
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType;
	setSearchRecruitmentFormQueryString: Dispatch<SetStateAction<RecruitmentFormQueryStringType>>;
	refetchRecruitmentForm: () => void;
}

export function RecruitmentFormSearch({ searchRecruitmentFormQueryString, setSearchRecruitmentFormQueryString, refetchRecruitmentForm }: PropsType) {
	const date = new Date(); // 현재 날짜 및 시간
	const iYear = date.getFullYear(); // 연도

	const [formData, setFormData] = useState({
		year: searchRecruitmentFormQueryString.year,
		company_name: '',
		start: '',
		end: '',
		status: '',
		page: searchRecruitmentFormQueryString.page,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setFormData({
			...formData,
			[name]: value.trimLeft(),
		});
	};

	const handleDefaultData = () => {
		setFormData({
			year: searchRecruitmentFormQueryString.year,
			company_name: '',
			start: '',
			end: '',
			status: '',
			page: searchRecruitmentFormQueryString.page,
		});
	};

	const statusChangeValue = (e: string) => {
		const companyTypeMap: { [key: string]: StatusType } = {
			전체: '',
			모집전: 'READY',
			모집중: 'RECRUITING',
			종료: 'DONE',
			접수요청: 'REQUESTED',
		};
		return companyTypeMap[e] || '';
	};

	const handleSearch = () => {
		setSearchRecruitmentFormQueryString({
			...searchRecruitmentFormQueryString,
			...formData,
			status: statusChangeValue(formData.status),
		});
		setTimeout(refetchRecruitmentForm);
	};

	const yearData = Array.from({ length: 11 }, (_, i) => (iYear - i).toString());

	return (
		<_.Container>
			<_.Wrapper>
				<_.TitleText>모집년도</_.TitleText>
				<_.ContentWrapper>
					<DropDown width={23} option={yearData} value={formData.year} onChange={(e) => setFormData({ ...formData, year: e })} />
				</_.ContentWrapper>
				<_.TitleText>의뢰일자</_.TitleText>
				<_.ContentWrapper width={17} style={{ paddingRight: '15px' }}>
					<_.DateInput name="start" type="date" value={formData.start} onChange={handleInputChange} max={formData.end} />
					<div> ~ </div>
					<_.DateInput name="end" type="date" value={formData.end} onChange={handleInputChange} min={formData.start} />
				</_.ContentWrapper>
			</_.Wrapper>
			<_.Wrapper>
				<_.TitleText>기업명</_.TitleText>
				<_.ContentWrapper>
					<Input width={96} name="company_name" value={formData.company_name} onChange={handleInputChange} placeHolder="기업명 입력" />
				</_.ContentWrapper>
				<_.TitleText>모집상태</_.TitleText>
				<_.ContentWrapper width={17}>
					<DropDown width={42} option={['전체', '모집전', '모집중', '종료', '접수요청']} value={formData.status || '전체'} onChange={(e) => setFormData({ ...formData, status: e })} />
				</_.ContentWrapper>
				<_.ButtonWrapper>
					<Button onClick={handleSearch}>조회</Button>
					<Button kind="Gray" onClick={handleDefaultData} margin={[0, 10, 0, 0]}>
						초기화
					</Button>
				</_.ButtonWrapper>
			</_.Wrapper>
		</_.Container>
	);
}
