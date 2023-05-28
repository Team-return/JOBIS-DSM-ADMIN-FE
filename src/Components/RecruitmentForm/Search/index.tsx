import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { RecruitmentFormQueryStringType } from '../../../Apis/Recruitments/request';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from '../../../Hooks/useForm';
import { companyStatus } from '../../../Utils/Translation';
import { getValueByKey } from '../../../Hooks/useGetPropertyValueAndKey';
import { useDropDown } from '../../../Hooks/useDropDown';

interface PropsType {
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType;
	setSearchRecruitmentFormQueryString: Dispatch<SetStateAction<RecruitmentFormQueryStringType>>;
	refetchRecruitmentForm: () => void;
}

export function RecruitmentFormSearch({ searchRecruitmentFormQueryString, setSearchRecruitmentFormQueryString, refetchRecruitmentForm }: PropsType) {
	const date = new Date(); // 현재 날짜 및 시간
	const iYear = date.getFullYear(); // 연도

	const {
		form: formData,
		setForm: setFormData,
		handleChange,
	} = useForm({
		company_name: '',
		start: '',
		end: '',
		page: searchRecruitmentFormQueryString.page,
	});

	const { selectedItem, setSelectedItem, handleSelectedItem } = useDropDown({
		year: searchRecruitmentFormQueryString.year,
		status: '',
	});

	const handleDefaultData = () => {
		setFormData({
			company_name: '',
			start: '',
			end: '',
			page: searchRecruitmentFormQueryString.page,
		});
		setSelectedItem({
			year: searchRecruitmentFormQueryString.year,
			status: '',
		});
	};

	const handleSearch = () => {
		setSearchRecruitmentFormQueryString({
			...searchRecruitmentFormQueryString,
			...formData,
			year: selectedItem.year,
			status: getValueByKey(companyStatus, selectedItem.status),
		});
		setTimeout(refetchRecruitmentForm);
	};

	const yearData = Array.from({ length: 11 }, (_, i) => (iYear - i).toString());

	return (
		<_.Container>
			<_.Wrapper>
				<_.TitleText>모집년도</_.TitleText>
				<_.ContentWrapper>
					<DropDown width={23} option={yearData} value={selectedItem.year} onChange={(yearData) => handleSelectedItem('year', yearData)} />
				</_.ContentWrapper>
				<_.TitleText>의뢰일자</_.TitleText>
				<_.ContentWrapper width={17} style={{ paddingRight: '15px' }}>
					<_.DateInput name="start" type="date" value={formData.start} onChange={handleChange} max={formData.end} />
					<div> ~ </div>
					<_.DateInput name="end" type="date" value={formData.end} onChange={handleChange} min={formData.start} />
				</_.ContentWrapper>
			</_.Wrapper>
			<_.Wrapper>
				<_.TitleText>기업명</_.TitleText>
				<_.ContentWrapper>
					<Input width={96} name="company_name" value={formData.company_name} onChange={handleChange} placeHolder="기업명 입력" />
				</_.ContentWrapper>
				<_.TitleText>모집상태</_.TitleText>
				<_.ContentWrapper width={17}>
					<DropDown
						width={42}
						option={['전체', '모집전', '모집중', '종료', '접수요청']}
						value={selectedItem.status || '전체'}
						onChange={(statusData) => handleSelectedItem('status', statusData)}
					/>
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
