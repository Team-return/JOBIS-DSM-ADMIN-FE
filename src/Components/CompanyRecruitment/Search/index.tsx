import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction } from 'react';
import { QueryStringDataType } from '../../../Apis/Companies/request';
import { getValueByKey } from '../../../Utils/useGetPropertyKey';
import { useForm } from '../../../Hooks/useForm';
import { companyType } from '../../../Utils/Translation';
import { useDropDown } from '../../../Hooks/useDropDown';
import { useGetCode } from '../../../Apis/Codes';

interface PropsType {
	setSearchQueryString: Dispatch<SetStateAction<QueryStringDataType>>;
	refetchCompanyRecruitment: () => void;
}

export function CompanyRecruitmentSearch({
	setSearchQueryString,
	refetchCompanyRecruitment,
}: PropsType) {
	const { data: businessCode, refetch: refetchBusinessCode } =
		useGetCode('BUSINESS_AREA');

	/** 키워드를 받아와서 변수에 담는 코드입니다. */
	const keywords = businessCode?.codes.map((item) => item.keyword);
	const allKeywords = keywords ? [...['전체'], ...keywords] : ['전체'];

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

	/** 검색값들을 초기화하는 함수입니다. */
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

	/** 검색하는 함수입니다. */
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

	/** 초기화 버튼을 눌렀을 때 실행할 함수입니다. */
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
						width={28}
						option={['전체', '선도기업', '참여기업']}
						value={selectedItem.company_type}
					/>
				</_.ContentWrapper>
				<_.TitleText>지역</_.TitleText>
				<_.ContentWrapper width={20}>
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
						placeholder="검색어 입력"
						iconName="Search"
					/>
				</_.ContentWrapper>
				<_.TitleText>사업분야</_.TitleText>
				<_.ContentWrapper width={20}>
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
