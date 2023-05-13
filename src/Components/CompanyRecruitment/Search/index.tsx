import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction, useState } from 'react';
import { dataType } from '../../../Apis/Companies/request';
import { useGetBusinessCode } from '../../../Hooks/useGetBusinessCode';

interface PropsType {
	searchQueryString: dataType;
	setSearchQueryString: Dispatch<SetStateAction<dataType>>;
	refetchCompanyRecruitment: () => void;
}

export function CompanyRecruitmentSearch({ searchQueryString, setSearchQueryString, refetchCompanyRecruitment }: PropsType) {
	const { data: businessCode, refetch: refetchBusinessCode } = useGetBusinessCode();
	const keywords = businessCode?.codes.map((item) => item.keyword);
	const whole = ['전체'];
	const allKeywords = keywords ? [...whole, ...keywords] : whole;

	const [data, setData] = useState<dataType>({
		page: 1,
		company_type: '',
		region: '',
		company_name: '',
		industry: '',
	});

	const defaultData = () => {
		setData({
			page: 1,
			company_type: '',
			region: '',
			company_name: '',
			industry: '',
		});
	};

	const changeCompanyType = (type: string) => {
		const companyTypeMap: { [key: string]: string } = {
			선도기업: 'LEAD',
			참여기업: 'PARTICIPATING',
			협약기업: 'CONTRACTING',
		};
		return companyTypeMap[type] || '';
	};

	const searching = () => {
		const searchingIndustry = data.industry === '전체' ? '' : data.industry;
		setSearchQueryString({ ...data, company_type: changeCompanyType(data.company_type), industry: searchingIndustry });
		setTimeout(refetchCompanyRecruitment);
	};

	const onCompanyTypeChange = (typeData: string) => {
		setData({
			...data,
			company_type: typeData,
		});
	};

	const onRegionChange = (regionData: string) => {
		setData({
			...data,
			region: regionData,
		});
	};

	const onCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({
			...data,
			company_name: e.target.value,
		});
	};

	const onIndustryChange = (industryData: string) => {
		setData({
			...data,
			industry: industryData,
		});
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
					<DropDown onChange={(type) => onCompanyTypeChange(type)} width={23} option={['전체', '선도기업', '참여기업', '협약기업']} value={data.company_type} />
				</_.ContentWrapper>
				<_.TitleText>지역</_.TitleText>
				<_.ContentWrapper width={8.5}>
					<DropDown onChange={(region) => onRegionChange(region)} width={90} option={['전체', '서울', '경기', '인천', '충청', '대전', '전라', '경상', '제주/강원']} value={data.region} />
				</_.ContentWrapper>
			</_.Wrapper>
			<_.Wrapper>
				<_.TitleText>기업명</_.TitleText>
				<_.ContentWrapper>
					<Input width={96} name="company_name" value={data.company_name} onChange={onCompanyNameChange} placeHolder="검색어 입력" iconName="Search" />
				</_.ContentWrapper>
				<_.TitleText>사업분야</_.TitleText>
				<_.ContentWrapper width={8.5}>
					<DropDown onChange={(industry) => onIndustryChange(industry)} width={90} option={allKeywords} value={data.industry} />
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
