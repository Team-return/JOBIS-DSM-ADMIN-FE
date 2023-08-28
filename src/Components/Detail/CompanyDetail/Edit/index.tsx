import { Button, useToastStore } from '@team-return/design-system';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { CompanyDetailResponse } from '../../../../Apis/Companies/response';
import { useForm } from '../../../../Hooks/useForm';
import * as _ from '../../style';
import EditImg from '../../../../Assets/SVG/edit.svg';
import { useFileUpload } from '../../../../Apis/File';
import { CompanyInfoEditType } from '../../../../Apis/Companies/request';
import { useChangeCompanyInfo } from '../../../../Apis/Companies';

interface PropsType {
	companyDetailInfo: CompanyDetailResponse;
	setCanEdit: Dispatch<SetStateAction<boolean>>;
}

export function CompanyDetailEdit({
	companyDetailInfo,
	setCanEdit,
}: PropsType) {
	const { append } = useToastStore();
	const fileInput = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const {
		form: companyDetailEditInfo,
		setForm: setCompanyDetailEditInfo,
		handleChange: companyDetailEditInfohandler,
	} = useForm<CompanyInfoEditType>({
		company_introduce: companyDetailInfo?.company_introduce,
		main_zip_code: companyDetailInfo?.main_zip_code,
		main_address: companyDetailInfo?.main_address,
		main_address_detail: companyDetailInfo?.main_address_detail,
		sub_zip_code: companyDetailInfo?.sub_zip_code,
		sub_address: companyDetailInfo?.sub_address,
		sub_address_detail: companyDetailInfo?.sub_address_detail,
		manager_name: companyDetailInfo?.manager_name,
		manager_phone_no: companyDetailInfo?.manager_phone_no,
		sub_manager_name: companyDetailInfo?.sub_manager_name,
		sub_manager_phone_no: companyDetailInfo?.sub_manager_phone_no,
		fax: companyDetailInfo?.fax,
		email: companyDetailInfo?.email,
		representative_name: companyDetailInfo?.representative_name,
		worker_number: companyDetailInfo?.worker_number,
		take: companyDetailInfo?.take,
		service_name: companyDetailInfo?.service_name,
		company_profile_url: `https://jobis-bucket.s3.ap-northeast-2.amazonaws.com/${companyDetailInfo?.company_profile_url}`,
	});

	const {
		company_introduce,
		main_zip_code,
		main_address,
		main_address_detail,
		sub_zip_code,
		sub_address,
		sub_address_detail,
		manager_name,
		manager_phone_no,
		sub_manager_name,
		sub_manager_phone_no,
		fax,
		email,
		representative_name,
		worker_number,
		take,
		service_name,
		company_profile_url,
	} = companyDetailEditInfo;

	const { mutate: editCompanyInfo } = useChangeCompanyInfo(
		companyDetailEditInfo,
		{
			onSuccess: () => {
				append({
					title: '기업 수정에 성공하였습니다.',
					message: '',
					type: 'GREEN',
				});
				setCanEdit(false);
			},
			onError: () => {
				append({
					title: '기업 수정에 실패하였습니다.',
					message: '',
					type: 'RED',
				});
			},
		}
	);

	const { mutate: fileUploader } = useFileUpload(
		file!,
		setCompanyDetailEditInfo,
		{
			onSuccess: (res: any) => {
				setCompanyDetailEditInfo((companyDetailEditInfo) => ({
					...companyDetailEditInfo,
					company_profile_url: res.data.urls[0],
				}));
				setTimeout(() => {
					editCompanyInfo();
				});
			},
			onError: () => {
				append({
					title: '파일 업로드에 실패하였습니다.',
					message: '',
					type: 'RED',
				});
			},
		}
	);

	const submitEditCompanyInfo = () => {
		if (file) {
			fileUploader();
		} else {
			editCompanyInfo();
		}
	};

	return (
		<_.Container>
			<_.Wrapper>
				<_.LogoEditWrapper>
					<_.LogoWrapper>
						<_.CompanyLogo
							src={
								file
									? URL.createObjectURL(file)
									: company_profile_url
							}
						/>
					</_.LogoWrapper>
					<_.LogoEditImg
						src={EditImg}
						onClick={() => {
							fileInput.current?.click();
						}}
					></_.LogoEditImg>
					<input
						type="file"
						hidden
						ref={fileInput}
						onChange={(e) => {
							setFile(e.target.files ? e.target.files[0] : null);
						}}
					/>
				</_.LogoEditWrapper>
				<Button size="M" onClick={submitEditCompanyInfo}>
					확인
				</Button>
			</_.Wrapper>
			<_.Stack>
				<_.TitleBox>기업명</_.TitleBox>
				<_.ContentBox width={25}>
					<_.CustomInput
						width={100}
						type="text"
						className="companyName"
						value={companyDetailInfo?.company_name}
						disabled={true}
					/>
				</_.ContentBox>
				<_.TitleBox>사업자 번호</_.TitleBox>
				<_.ContentBox width={25}>
					<_.CustomInput
						width={100}
						type="text"
						value={companyDetailInfo?.business_number.replace(
							/(\d{3})(\d{2})(\d{5})/,
							'$1-$2-$3'
						)}
						disabled={true}
					/>
				</_.ContentBox>
				<_.TitleBox>대표자</_.TitleBox>
				<_.ContentBox width={20}>
					<_.CustomInput
						width={100}
						type="text"
						value={representative_name}
						name="representative_name"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>설립일</_.TitleBox>
				<_.ContentBox width={25}>
					<_.CustomInput
						width={100}
						type="text"
						value={companyDetailInfo?.founded_at}
						disabled={true}
					/>
				</_.ContentBox>
				<_.TitleBox>근로자 수</_.TitleBox>
				<_.ContentBox width={25}>
					<_.CustomInput
						placeHolder="근로자 수"
						width={100}
						type="text"
						value={worker_number}
						name="worker_number"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>매출액</_.TitleBox>
				<_.ContentBox width={20}>
					<_.CustomInput
						placeHolder="매출액"
						width={100}
						type="text"
						value={take}
						name="take"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>본사주소</_.TitleBox>
				<_.ContentBox width={25}>
					<_.CustomInput
						placeHolder="본사주소"
						width={100}
						type="text"
						value={main_address}
						name="main_address"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>본사 상세주소</_.TitleBox>
				<_.ContentBox width={25}>
					<_.CustomInput
						placeHolder="본사 상세주소"
						width={100}
						type="text"
						value={main_address_detail}
						name="main_address_detail"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>본사 우편번호</_.TitleBox>
				<_.ContentBox width={20}>
					<_.CustomInput
						placeHolder="본사 우편번호"
						width={100}
						type="number"
						value={main_zip_code}
						name="main_zip_code"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>지점주소</_.TitleBox>
				<_.ContentBox width={25}>
					<_.CustomInput
						placeHolder="지점주소"
						width={100}
						type="text"
						value={sub_address ? sub_address : ''}
						name="sub_address"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>지점 상세주소</_.TitleBox>
				<_.ContentBox width={25}>
					<_.CustomInput
						placeHolder="지점 상세주소"
						width={100}
						type="text"
						value={sub_address_detail ? sub_address_detail : ''}
						name="sub_address_detail"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>지점 우편번호</_.TitleBox>
				<_.ContentBox width={20}>
					<_.CustomInput
						placeHolder="지점 우편번호"
						width={100}
						type="number"
						value={sub_zip_code ? sub_zip_code : ''}
						name="sub_zip_code"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>담당자1</_.TitleBox>
				<_.ContentBox width={15}>
					<_.CustomInput
						placeHolder="담당자1"
						width={100}
						type="text"
						value={manager_name}
						name="manager_name"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>전화번호1</_.TitleBox>
				<_.ContentBox width={15}>
					<_.CustomInput
						placeHolder="전화번호1"
						width={100}
						type="text"
						value={manager_phone_no}
						name="manager_phone_no"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>담당자2</_.TitleBox>
				<_.ContentBox width={15}>
					<_.CustomInput
						placeHolder="담당자2"
						width={100}
						type="text"
						value={sub_manager_name ? sub_manager_name : '-'}
						name="sub_manager_name"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>전화번호2</_.TitleBox>
				<_.ContentBox width={15}>
					<_.CustomInput
						placeHolder="전화번호2"
						width={100}
						type="text"
						value={
							sub_manager_phone_no ? sub_manager_phone_no : '-'
						}
						name="sub_manager_phone_no"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>이메일</_.TitleBox>
				<_.ContentBox width={40}>
					<_.CustomInput
						placeHolder="이메일"
						width={100}
						type="text"
						value={email}
						name="email"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>팩스번호</_.TitleBox>
				<_.ContentBox width={40}>
					<_.CustomInput
						placeHolder="팩스번호"
						width={100}
						type="text"
						value={fax ? fax : '-'}
						name="fax"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>대표 서비스명</_.TitleBox>
				<_.ContentBox width={60}>
					<_.CustomInput
						width={100}
						type="text"
						value={service_name}
						name="service_name"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>사업분야</_.TitleBox>
				<_.ContentBox width={20}>
					<_.CustomInput
						width={100}
						type="text"
						value={companyDetailInfo?.business_area}
						disabled={true}
					/>
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
					<_.Textarea
						height={190}
						placeholder="회사소개"
						value={company_introduce}
						name="company_introduce"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
			</_.Stack>
		</_.Container>
	);
}
