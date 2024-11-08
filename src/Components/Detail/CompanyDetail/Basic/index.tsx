import { Button, Stack, Text, Icon } from '@team-return/design-system';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyDetailResponse } from '../../../../Apis/Companies/response';
import * as _ from '../../style';
import { useDownloadData } from '../../../../Apis/File';
import check from '../../../../Assets/SVG/check.svg';

interface PropsType {
	companyDetailInfo: CompanyDetailResponse;
	setCanEdit: Dispatch<SetStateAction<boolean>>;
}

export function CompanyDetailBasic({
	companyDetailInfo,
	setCanEdit,
}: PropsType) {
	const navigate = useNavigate();
	const nameArray = decodeURI(companyDetailInfo?.biz_registration_url).split(
		'/'
	);
	const { mutate: downloadFile } = useDownloadData({
		fileName: nameArray[nameArray.length - 1].substring(37),
		fileUrl: companyDetailInfo?.biz_registration_url,
	});
	return (
		<_.Container>
			<_.Wrapper>
				<Stack direction="column">
					<_.BackWrapper onClick={() => navigate(-1)}>
						<_.BackIcon icon="Chevron" />
						<Text margin={[0, 0, -4, 0]} size="Body2">
							뒤로가기
						</Text>
					</_.BackWrapper>
					<_.LogoWrapper>
						<_.CompanyLogo
							src={
								!!companyDetailInfo &&
								`${
									process.env.REACT_APP_FILE_URL
								}${companyDetailInfo?.company_profile_url.replace(
									/\s+/g,
									''
								)}`
							}
						/>
					</_.LogoWrapper>
				</Stack>
				<Stack gap={10}>
					<Button
						size="M"
						onClick={() => {
							downloadFile();
						}}
					>
						사업자등록증
						<Icon icon="Download" color="gray10" size={20}></Icon>
					</Button>
					<Button size="M" onClick={() => setCanEdit(true)}>
						수정
					</Button>
				</Stack>
			</_.Wrapper>
			<_.Stack>
				<_.TitleBox>기업명</_.TitleBox>
				<_.ContentBox width={15}>
					{companyDetailInfo?.company_name}
				</_.ContentBox>
				<_.TitleBox>사업자 번호</_.TitleBox>
				<_.ContentBox width={15}>
					{companyDetailInfo?.business_number.replace(
						/(\d{3})(\d{2})(\d{5})/,
						'$1-$2-$3'
					)}
				</_.ContentBox>
				<_.TitleBox>대표자</_.TitleBox>
				<_.ContentBox width={15}>
					{companyDetailInfo?.representative_name}
				</_.ContentBox>
				<_.TitleBox>대표 전화번호</_.TitleBox>
				<_.ContentBox width={15}>
					{(companyDetailInfo?.representative_phone_no || '').replace(
						/(\d{3})(\d{4})(\d{4})/,
						'$1-$2-$3'
					)}
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
				<_.TitleBox>주소</_.TitleBox>
				<_.ContentBox
					width={90}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					{`(${companyDetailInfo?.main_zip_code}) ${companyDetailInfo?.main_address} ${companyDetailInfo?.main_address_detail}`}
					{companyDetailInfo?.headquarter && (
						<_.Headquarter>
							<img src={check} alt="체크" />
							<p>본사와 동일합니다.</p>
						</_.Headquarter>
					)}
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>담당자</_.TitleBox>
				<_.ContentBox width={15}>
					{companyDetailInfo?.manager_name}
				</_.ContentBox>
				<_.TitleBox>전화번호</_.TitleBox>
				<_.ContentBox width={15}>
					{companyDetailInfo?.manager_phone_no.replace(
						/(\d{3})(\d{4})(\d{4})/,
						'$1-$2-$3'
					)}
				</_.ContentBox>
				<_.TitleBox>이메일</_.TitleBox>
				<_.ContentBox width={40}>
					{companyDetailInfo?.email}
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>대표 서비스명</_.TitleBox>
				<_.ContentBox width={90}>
					{companyDetailInfo?.service_name}
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
