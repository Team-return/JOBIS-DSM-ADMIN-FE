import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { useGetCode } from '../../../Apis/Codes';
import { useCompanyRecruitmentQueryString } from '../../../Store/State';
import { companyType } from '../../../Utils/Translation';
import { getValueByKey } from '../../../Utils/useGetPropertyKey';

interface PropsType {
	refetchCompanyRecruitment: () => void;
}

export function CompanyRecruitmentSearch({
	refetchCompanyRecruitment,
}: PropsType) {
	const { data: businessCode } = useGetCode('BUSINESS_AREA');

	/** 키워드를 받아와서 변수에 담는 코드입니다. */
	const keywords = businessCode?.codes.map((item) => item.keyword);
	const allKeywords = keywords ? [...['전체'], ...keywords] : ['전체'];

	const {
		companyRecruitmentQueryString,
		setDefaultCompanyRecruitmentQueryString,
		companyRecruitmentQueryStringDropDown,
		companyRecruitmentQueryStringHandler,
		setCompanyRecruitmentPage,
	} = useCompanyRecruitmentQueryString();

	const search = () => {
		setCompanyRecruitmentPage();
		setTimeout(refetchCompanyRecruitment);
	};

	return (
		<_.Container>
			<_.Wrapper>
				<_.TitleText>기업구분</_.TitleText>
				<_.ContentWrapper>
					<DropDown
						onChange={(type) =>
							companyRecruitmentQueryStringDropDown(
								'company_type',
								getValueByKey(companyType, type)
							)
						}
						width={28}
						option={['전체', '선도기업', '참여기업']}
						value={
							companyType[
								companyRecruitmentQueryString.company_type
							]
						}
					/>
				</_.ContentWrapper>
				<_.TitleText>지역</_.TitleText>
				<_.ContentWrapper width={20}>
					<DropDown
						onChange={(region) =>
							companyRecruitmentQueryStringDropDown(
								'region',
								region
							)
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
						value={companyRecruitmentQueryString.region}
					/>
				</_.ContentWrapper>
			</_.Wrapper>
			<_.Wrapper>
				<_.TitleText>기업명</_.TitleText>
				<_.ContentWrapper>
					<Input
						width={96}
						name="company_name"
						value={companyRecruitmentQueryString.company_name}
						onChange={companyRecruitmentQueryStringHandler}
						placeholder="검색어 입력"
						iconName="Search"
					/>
				</_.ContentWrapper>
				<_.TitleText>사업분야</_.TitleText>
				<_.ContentWrapper width={20}>
					<DropDown
						onChange={(industry) =>
							companyRecruitmentQueryStringDropDown(
								'industry',
								businessCode?.codes.find(
									(item) => item.keyword === industry
								)?.code
							)
						}
						width={90}
						option={allKeywords}
						value={
							businessCode?.codes.find(
								(item) =>
									item.code.toString() ===
									companyRecruitmentQueryString.industry
							)?.keyword  
						}
					/>
				</_.ContentWrapper>
				<_.Btn>
					<Button onClick={search}>조회</Button>
					<Button
						kind="Gray"
						onClick={setDefaultCompanyRecruitmentQueryString}
					>
						초기화
					</Button>
				</_.Btn>
			</_.Wrapper>
		</_.Container>
	);
}
