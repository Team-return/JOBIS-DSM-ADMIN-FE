import {
	Button,
	Icon,
	Stack,
	useToastStore,
	Text,
} from '@team-return/design-system';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { CompanyDetailResponse } from '../../../../Apis/Companies/response';
import { useForm } from '../../../../Hooks/useForm';
import * as _ from '../../style';
import { CompanyInfoEditType } from '../../../../Apis/Companies/request';
import { useChangeCompanyInfo } from '../../../../Apis/Companies';
import { useNavigate } from 'react-router-dom';
import { usePresignedUrl } from '../../../../Apis/Files';
import { useQueryClient } from 'react-query';

interface PropsType {
	companyDetailInfo: CompanyDetailResponse;
	setCanEdit: Dispatch<SetStateAction<boolean>>;
	refetchCompanyDetailInfo: () => void;
}

export function CompanyDetailEdit({
	companyDetailInfo,
	setCanEdit,
	refetchCompanyDetailInfo,
}: PropsType) {
	const navigate = useNavigate();
	const { append } = useToastStore();
	const fileInput = useRef<HTMLInputElement>(null);

	const [imageUrl, setImageUrl] = useState<string | null>(
		`${process.env.REACT_APP_FILE_URL}${companyDetailInfo?.company_profile_url}` ||
			null
	);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
		company_profile_url: companyDetailInfo?.company_profile_url,
		representative_phone_no: companyDetailInfo?.representative_phone_no,
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
		representative_phone_no,
	} = companyDetailEditInfo;

	const queryClient = useQueryClient();
	const { mutate: editCompanyInfo } = useChangeCompanyInfo(
		companyDetailEditInfo,
		{
			onSuccess: () => {
				append({
					title: '기업 수정에 성공하였습니다.',
					message: '',
					type: 'GREEN',
				});
				refetchCompanyDetailInfo();
				setCanEdit(false);
				queryClient.invalidateQueries({
					queryKey: ['editCompanyInfo'],
				});
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

	const { mutateAsync: getPresignedUrl } = usePresignedUrl();

	const handleFileUploadAndEdit = async () => {
		if (selectedFile) {
			const response = await getPresignedUrl([selectedFile]);
			if (response?.presignedUrls?.urls?.[0]?.file_path) {
				const uploadedUrl = `${process.env.REACT_APP_FILE_URL}${response.presignedUrls.urls[0].file_path}`;
				setImageUrl(uploadedUrl);
				setCompanyDetailEditInfo((companyDetailEditInfo) => ({
					...companyDetailEditInfo,
					company_profile_url:
						response.presignedUrls.urls[0].file_path,
				}));
				setTimeout(() => {
					editCompanyInfo();
				}, 500);
			}
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedFile(file);
			const fileUrl = URL.createObjectURL(file);
			setImageUrl(fileUrl);
		}
	};

	const submitEditCompanyInfo = () => {
		if (selectedFile) {
			handleFileUploadAndEdit();
		} else {
			editCompanyInfo();
		}
	};

	return (
		<_.Container>
			<_.Wrapper>
				<_.LogoEditWrapper>
					<_.BackWrapper onClick={() => navigate(-1)}>
						<_.BackIcon icon="Chevron" />
						<Text margin={[0, 0, -4, 0]} size="Body2">
							뒤로가기
						</Text>
					</_.BackWrapper>
					<_.LogoWrapper>
						<_.CompanyLogo src={imageUrl || ''} />
					</_.LogoWrapper>
					<_.LogoEditImg
						onClick={() => {
							fileInput.current?.click();
						}}
					>
						<Icon icon="EditPencil" size={20} color="gray70" />
					</_.LogoEditImg>
					<input
						type="file"
						hidden
						ref={fileInput}
						accept="image/jpg, image/png"
						onChange={handleFileChange}
					/>
				</_.LogoEditWrapper>
				<Stack gap={20}>
					<Button
						size="M"
						kind="Shadow"
						onClick={() => setCanEdit(false)}
					>
						취소
					</Button>
					<Button size="M" onClick={submitEditCompanyInfo}>
						확인
					</Button>
				</Stack>
			</_.Wrapper>
			<_.Stack>
				<_.TitleBox>기업명</_.TitleBox>
				<_.ContentBox width={15}>
					<_.CustomInput
						width={100}
						type="text"
						className="companyName"
						value={companyDetailInfo?.company_name}
						disabled={true}
					/>
				</_.ContentBox>
				<_.TitleBox>사업자 번호</_.TitleBox>
				<_.ContentBox width={15}>
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
				<_.ContentBox width={15}>
					<_.CustomInput
						width={100}
						type="text"
						value={representative_name}
						name="representative_name"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>대표 전화번호</_.TitleBox>
				<_.ContentBox width={15}>
					<_.CustomInput
						width={100}
						type="text"
						value={representative_phone_no}
						name="representative_phone_no"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>설립일</_.TitleBox>
				<_.ContentBox width={25}>
					<_.CustomInput
						width={100}
						type="date"
						value={companyDetailInfo?.founded_at}
						disabled={true}
					/>
				</_.ContentBox>
				<_.TitleBox>근로자 수</_.TitleBox>
				<_.ContentBox width={25}>
					<_.CustomInput
						placeholder="근로자 수"
						width={100}
						style={{ paddingRight: '50px' }}
						type="number"
						value={worker_number}
						name="worker_number"
						onChange={companyDetailEditInfohandler}
					/>
					<_.AbsoluteText right={50}>명</_.AbsoluteText>
				</_.ContentBox>
				<_.TitleBox>매출액</_.TitleBox>
				<_.ContentBox width={20}>
					<_.CustomInput
						placeholder="매출액"
						width={100}
						style={{ paddingRight: '50px' }}
						type="number"
						value={take}
						name="take"
						onChange={companyDetailEditInfohandler}
					/>
					<_.AbsoluteText right={40}>억</_.AbsoluteText>
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>본사주소</_.TitleBox>
				<_.ContentBox width={25}>
					<_.CustomInput
						placeholder="본사주소"
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
						placeholder="본사 상세주소"
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
						placeholder="본사 우편번호"
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
						placeholder="지점주소"
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
						placeholder="지점 상세주소"
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
						placeholder="지점 우편번호"
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
						placeholder="담당자1"
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
						placeholder="전화번호1"
						width={100}
						type="number"
						maxLength={11}
						value={manager_phone_no}
						name="manager_phone_no"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>담당자2</_.TitleBox>
				<_.ContentBox width={15}>
					<_.CustomInput
						placeholder="담당자2"
						width={100}
						type="text"
						value={sub_manager_name ? sub_manager_name : ''}
						name="sub_manager_name"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
				<_.TitleBox>전화번호2</_.TitleBox>
				<_.ContentBox width={15}>
					<_.CustomInput
						placeholder="전화번호2"
						width={100}
						type="number"
						maxLength={11}
						value={sub_manager_phone_no ? sub_manager_phone_no : ''}
						name="sub_manager_phone_no"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>이메일</_.TitleBox>
				<_.ContentBox width={40}>
					<_.CustomInput
						placeholder="이메일"
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
						placeholder="팩스번호"
						width={100}
						type="text"
						value={fax ? fax : ''}
						name="fax"
						onChange={(event) => {
							const value = event.target.value;
							if (/^\d*$/.test(value)) {
								companyDetailEditInfohandler(event);
							}
						}}
					/>
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>앱/웹 서비스명</_.TitleBox>
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
				<_.TitleBox height={250}>
					<p>회사소개</p>
					<p>{company_introduce.length} / 4000</p>
				</_.TitleBox>
				<_.ContentBox
					width={90}
					height={250}
					overflow="scroll"
					longText={true}
				>
					<_.Textarea
						height={190}
						placeholder="회사소개"
						maxLength={4000}
						value={company_introduce}
						name="company_introduce"
						onChange={companyDetailEditInfohandler}
					/>
				</_.ContentBox>
			</_.Stack>
		</_.Container>
	);
}
