import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction } from 'react';
import { dataType } from '../../../Apis/Companies/request';
import { getValueByKey } from '../../../Hooks/useGetPropertyKey';
import { useForm } from '../../../Hooks/useForm';
import { companyType } from '../../../Utils/Translation';
import { useDropDown } from '../../../Hooks/useDropDown';
import { useGetCode } from '../../../Hooks/ApiHooks/Codes';

interface PropsType {
	setSearchQueryString: Dispatch<SetStateAction<dataType>>;
	refetchCompanyRecruitment: () => void;
}

export function CompanyRecruitmentSearch({
	setSearchQueryString,
	refetchCompanyRecruitment,
}: PropsType) {
	const { data: businessCode, refetch: refetchBusinessCode } =
		useGetCode('BUSINESS_AREA');
	const keywords = businessCode?.codes.map((item) => item.keyword);
	const whole = ['전체'];
	const allKeywords = keywords ? [...whole, ...keywords] : whole;

	const {
		form: data,
		setForm: setData,
		handleChange,
	} = useForm({
		page: 1,
		company_name: '',
	});

	const { selectedItem, setSelectedItem, handleSelectedItem } = useDropDown({
		company_type: '',
		region: '',
		industry: '',
	});

	const defaultData = () => {
		setData({
			page: 1,
			company_name: '',
		});
		setSelectedItem({
			company_type: '',
			region: '',
			industry: '',
		});
	};

	const searching = () => {
		const searchingIndustry =
			selectedItem.industry === '전체' ? '' : selectedItem.industry;
		setSearchQueryString({
			...data,
			company_type: getValueByKey(
				companyType,
				selectedItem.company_type.replace('기업', '')
			),
			industry: searchingIndustry,
			region: selectedItem.region,
		});
		setTimeout(refetchCompanyRecruitment);
	};

	const onResetButtonClick = () => {
		defaultData();
		refetchBusinessCode();
	};

	return (
		<_.Container>
			<_.Wrapper>
				<_.TitleText>기업구분</_.TitleText>
				<_.ContentWrapper>
					<DropDown
						onChange={(type) =>
							handleSelectedItem('company_type', type)
						}
						width={23}
						option={['전체', '선도기업', '참여기업']}
						value={selectedItem.company_type}
					/>
				</_.ContentWrapper>
				<_.TitleText>지역</_.TitleText>
				<_.ContentWrapper width={8.5}>
					<DropDown
						onChange={(region) =>
							handleSelectedItem('region', region)
						}
						width={90}
						option={[
							'전체',
							'서울',
							'경기',
							'인천',
							'충청',
							'대전',
							'전라',
							'경상',
							'제주/강원',
						]}
						value={selectedItem.region}
					/>
				</_.ContentWrapper>
			</_.Wrapper>
			<_.Wrapper>
				<_.TitleText>기업명</_.TitleText>
				<_.ContentWrapper>
					<Input
						width={96}
						name="company_name"
						value={data.company_name}
						onChange={handleChange}
						placeHolder="검색어 입력"
						iconName="Search"
					/>
				</_.ContentWrapper>
				<_.TitleText>사업분야</_.TitleText>
				<_.ContentWrapper width={8.5}>
					<DropDown
						onChange={(industry) =>
							handleSelectedItem('industry', industry)
						}
						width={90}
						option={allKeywords}
						value={selectedItem.industry}
					/>
				</_.ContentWrapper>
				<_.Btn>
					<Button onClick={searching}>조회</Button>
					<Button kind="Gray" onClick={onResetButtonClick}>
						초기화
					</Button>
				</_.Btn>
			</_.Wrapper>
		</_.Container>
	);
}
