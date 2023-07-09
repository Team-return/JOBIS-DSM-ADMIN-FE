import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from '../../../Hooks/useForm';
import { companyType } from '../../../Utils/Translation';
import { useDropDown } from '../../../Hooks/useDropDown';
import { EmployableCompaniesPropsType } from '../../../Apis/Companies/request';
import { getValueByKey } from '../../../Hooks/useGetPropertyKey';

interface PropsType {
	setSearchQueryString: Dispatch<
		SetStateAction<EmployableCompaniesPropsType>
	>;
	refetchEmployableCompanies: () => void;
}

export function StudentManagementSearch({
	setSearchQueryString,
	refetchEmployableCompanies,
}: PropsType) {
	const date = new Date(); // 현재 날짜 및 시간
	const iYear = date.getFullYear(); // 연도

	const {
		form: formData,
		setForm: setFormData,
		handleChange,
	} = useForm({
		company_name: '',
	});

	const { selectedItem, setSelectedItem, handleSelectedItem } = useDropDown({
		year: String(date.getFullYear()),
		company_type: '',
	});

	/** 검색 Input 데이터를 초기화할 함수입니다. */
	const handleDefaultData = () => {
		setFormData({
			company_name: '',
		});
		setSelectedItem({
			year: String(date.getFullYear()),
			company_type: '',
		});
	};

	/** 검색할 때 실행할 함수입니다. */
	const handleSearch = () => {
		setSearchQueryString({
			...formData,
			year: selectedItem.year,
			company_type: getValueByKey(
				companyType,
				selectedItem.company_type.replace('기업', '')
			),
		});
		setTimeout(refetchEmployableCompanies);
	};

	/** 년도를 순서대로 배열로 만들어 저장합니다. */
	const yearData = Array.from({ length: 11 }, (_, i) =>
		(iYear - i).toString()
	);

	return (
		<_.Container>
			<_.Wrapper>
				<_.TitleText>학년도</_.TitleText>
				<_.ContentWrapper width={13}>
					<DropDown
						width={90}
						option={yearData}
						value={selectedItem.year}
						onChange={(yearData) =>
							handleSelectedItem('year', yearData)
						}
					/>
				</_.ContentWrapper>
				<_.TitleText>구분</_.TitleText>
				<_.ContentWrapper width={20}>
					<DropDown
						width={94}
						option={['전체', '선도기업', '참여기업']}
						value={selectedItem.company_type}
						onChange={(type) =>
							handleSelectedItem('company_type', type)
						}
					/>
				</_.ContentWrapper>
				<_.TitleText>기업명</_.TitleText>
				<_.ContentWrapper width={34.5}>
					<Input
						width={96}
						name="company_name"
						iconName="Search"
						value={formData.company_name}
						onChange={handleChange}
						placeHolder="기업명 입력"
					/>
				</_.ContentWrapper>
			</_.Wrapper>
			<_.ButtonWrapper>
				<Button onClick={handleSearch}>조회</Button>
				<Button
					kind="Gray"
					onClick={handleDefaultData}
					margin={[0, 10, 0, 0]}
				>
					초기화
				</Button>
			</_.ButtonWrapper>
		</_.Container>
	);
}
