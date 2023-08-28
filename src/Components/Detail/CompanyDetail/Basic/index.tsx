import { Button } from '@team-return/design-system';
import { Dispatch, SetStateAction } from 'react';
import { CompanyDetailResponse } from '../../../../Apis/Companies/response';
import * as _ from '../../style';

interface PropsType {
	companyDetailInfo: CompanyDetailResponse;
	setCanEdit: Dispatch<SetStateAction<boolean>>;
}

export function CompanyDetailBasic({
	companyDetailInfo,
	setCanEdit,
}: PropsType) {
	return (
		<_.Container>
			<_.Wrapper>
				<_.LogoWrapper>
					<_.CompanyLogo
						src={`https://jobis-bucket.s3.ap-northeast-2.amazonaws.com/${companyDetailInfo?.company_profile_url}`}
					/>
				</_.LogoWrapper>
				<Button size="M" onClick={() => setCanEdit(true)}>
					수정
				</Button>
			</_.Wrapper>
			<_.Stack>
				<_.TitleBox>기업명</_.TitleBox>
				<_.ContentBox width={25}>
					{companyDetailInfo?.company_name}
				</_.ContentBox>
				<_.TitleBox>사업자 번호</_.TitleBox>
				<_.ContentBox width={25}>
					{companyDetailInfo?.business_number.replace(
						/(\d{3})(\d{2})(\d{5})/,
						'$1-$2-$3'
					)}
				</_.ContentBox>
				<_.TitleBox>대표자</_.TitleBox>
				<_.ContentBox width={20}>
					{companyDetailInfo?.representative_name}
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>설립일</_.TitleBox>
				<_.ContentBox width={25}>
					{companyDetailInfo?.founded_at}
				</_.ContentBox>
				<_.TitleBox>근로자 수</_.TitleBox>
				<_.ContentBox width={25}>
					{companyDetailInfo?.worker_number}명
				</_.ContentBox>
				<_.TitleBox>매출액</_.TitleBox>
				<_.ContentBox width={20}>
					{companyDetailInfo?.take}억
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>본사주소</_.TitleBox>
				<_.ContentBox width={25}>
					{companyDetailInfo?.main_address}
				</_.ContentBox>
				<_.TitleBox>본사 상세주소</_.TitleBox>
				<_.ContentBox width={25}>
					{companyDetailInfo?.main_address_detail
						? companyDetailInfo?.main_address_detail
						: '-'}
				</_.ContentBox>
				<_.TitleBox>본사 우편번호</_.TitleBox>
				<_.ContentBox width={20}>
					{companyDetailInfo?.main_zip_code}
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>지점주소</_.TitleBox>
				<_.ContentBox width={25}>
					{companyDetailInfo?.sub_address
						? companyDetailInfo?.sub_address
						: '-'}
				</_.ContentBox>
				<_.TitleBox>지점 상세주소</_.TitleBox>
				<_.ContentBox width={25}>
					{companyDetailInfo?.sub_address_detail
						? companyDetailInfo?.sub_address_detail
						: '-'}
				</_.ContentBox>
				<_.TitleBox>지점 우편번호</_.TitleBox>
				<_.ContentBox width={20}>
					{companyDetailInfo?.sub_zip_code
						? companyDetailInfo?.sub_zip_code
						: '-'}
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>담당자1</_.TitleBox>
				<_.ContentBox width={15}>
					{companyDetailInfo?.manager_name}
				</_.ContentBox>
				<_.TitleBox>전화번호1</_.TitleBox>
				<_.ContentBox width={15}>
					{companyDetailInfo?.manager_phone_no.replace(
						/(\d{3})(\d{4})(\d{4})/,
						'$1-$2-$3'
					)}
				</_.ContentBox>
				<_.TitleBox>담당자2</_.TitleBox>
				<_.ContentBox width={15}>
					{companyDetailInfo?.sub_manager_name
						? companyDetailInfo?.sub_manager_name
						: '-'}
				</_.ContentBox>
				<_.TitleBox>전화번호2</_.TitleBox>
				<_.ContentBox width={15}>
					{companyDetailInfo?.sub_manager_phone_no
						? companyDetailInfo?.sub_manager_phone_no.replace(
								/(\d{3})(\d{4})(\d{4})/,
								'$1-$2-$3'
						  )
						: '-'}
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>이메일</_.TitleBox>
				<_.ContentBox width={40}>
					{companyDetailInfo?.email}
				</_.ContentBox>
				<_.TitleBox>팩스번호</_.TitleBox>
				<_.ContentBox width={40}>
					{companyDetailInfo?.fax ? companyDetailInfo?.fax : '-'}
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>대표 서비스명</_.TitleBox>
				<_.ContentBox width={60}>
					{companyDetailInfo?.service_name}
				</_.ContentBox>
				<_.TitleBox>사업분야</_.TitleBox>
				<_.ContentBox width={20}>
					{companyDetailInfo?.business_area}
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox height={250}>회사소개</_.TitleBox>
				<_.ContentBox
					width={90}
					height={250}
					overflow="scroll"
					longText={true}
				>
					{companyDetailInfo?.company_introduce}
				</_.ContentBox>
			</_.Stack>
		</_.Container>
	);
}
