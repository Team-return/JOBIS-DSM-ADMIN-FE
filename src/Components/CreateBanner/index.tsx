import * as _ from './styled';
import React, { Dispatch, useState, SetStateAction, useEffect } from 'react';
import templete from '../../Assets/PNG/templete.png';
import banner from '../../Assets/PNG/banner.png';
import search from '../../Assets/SVG/search.svg';
import { Button } from '@team-return/design-system';
import { useCreateBanners } from '../../Apis/Banners';
import {
	useCompanyRecruitmentQueryString,
	useRecruitmentFormQueryString,
} from '../../Store/State';
import { DateProps } from '../../Apis/Banners/request';
import { useForm } from '../../Hooks/useForm';
import html2canvas from 'html2canvas';
import { usePresignedUrl } from '../../Apis/Files';
import { useNavigate } from 'react-router-dom';
import { useGetCompanyRecruitments } from '../../Apis/Companies';
import { CompanyRecruitmentType } from '../../Apis/Companies/response';
import { useGetRecruitmentForm } from '../../Apis/Recruitments/';
import { RecruitmentFormType } from '../../Apis/Recruitments/response';

interface PropType {
	date: DateProps;
	setDate: Dispatch<SetStateAction<DateProps>>;
}

export function CreateBanner({ date, setDate }: PropType) {
	const [logoPreview, setLogoPreview] = useState<string | null>(null);
	const [selectedPage, setSelectedPage] = useState<string | null>(null);
	const [, setStartDate] = useState<string | null>(null);
	const [, setEndDate] = useState<string | null>(null);
	const [showSearchEx, setShowSearchEx] = useState(false);
	const [showRecruitmentSearchEx, setShowRecruitmentSearchEx] =
		useState(false);
	const [similarCompanies, setSimilarCompanies] = useState<
		CompanyRecruitmentType[]
	>([]);
	const [similarRecruitment, setSimilarRecruitment] = useState<
		RecruitmentFormType[]
	>([]);
	const navigator = useNavigate();
	const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
		null
	);

	const { recruitmentFormQueryString, recruitmentFormQueryStringHandler } =
		useRecruitmentFormQueryString();

	const {
		companyRecruitmentQueryString,
		companyRecruitmentQueryStringHandler,
	} = useCompanyRecruitmentQueryString();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];

		if (selectedFile) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setLogoPreview(reader.result as string);
			};

			reader.readAsDataURL(selectedFile);
		}
	};

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedRadioValue = event.target.value;
		setSelectedPage(selectedRadioValue);
	};

	const handleStartDateChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const selectedStartDate = event.target.value;
		setStartDate(selectedStartDate);
		const updatedDate = {
			...date,
			start_date: selectedStartDate,
		};
		setDate(updatedDate);
	};

	const handleEndDateChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const selectedEndDate = event.target.value;
		setEndDate(selectedEndDate);
		const updatedDate = {
			...date,
			end_date: selectedEndDate,
		};
		setDate(updatedDate);
	};

	const { form, handleChange } = useForm({
		title1: '',
		title2: '',
		companyName: '',
		description: '',
	});

	const createBannersAPI = useCreateBanners(
		selectedCompanyId !== null ? selectedCompanyId : -1,
		{
			page_type_1: 'COMPANY',
			page_type_2: 'RECRUITMENT',
			page_type_3: 'INTERNSHIP',
			page_type_4: 'BOOKMARK',
			page_type_5: 'NONE',
		}[selectedPage!]!,
		date.start_date,
		date.end_date
	);

	const { mutateAsync: getPresignedUrl } = usePresignedUrl();

	const [attachments, setAttachments] = useState<File>(new File([], ''));

	const handleAddBanner = async () => {
		await captureImage();
	};

	useEffect(() => {
		const a = async () => {
			if (attachments.name) {
				const response = await getPresignedUrl([attachments]);
				await createBannersAPI.mutateAsync(
					`${process.env.REACT_APP_FILE_URL}` +
						response?.presignedUrls.urls[0].file_path || ''
				);
				console.log(getPresignedUrl);
				navigator('/banner');
			}
		};
		a();
		// eslint-disable-next-line
	}, [attachments]);

	const captureImage = async () => {
		const elementToCapture = document.getElementById('captureElement');
		if (elementToCapture) {
			html2canvas(elementToCapture).then((canvas) => {
				canvas.toBlob((blob) => {
					const file = new File([blob!], 'capture.png', {
						type: 'image/png',
					});
					setAttachments(file);
				}, 'image/png');
			});
		}
	};

	const [companyQueryResult] = useGetCompanyRecruitments(
		companyRecruitmentQueryString
	);

	useEffect(() => {
		companyQueryResult.refetch();
		// eslint-disable-next-line
	}, [companyRecruitmentQueryString]);

	useEffect(() => {
		if (companyQueryResult.isSuccess) {
			const companies: CompanyRecruitmentType[] =
				companyQueryResult.data.companies;
			const searchQuery =
				companyRecruitmentQueryString.company_name.toLowerCase();
			const similarCompaniesFound: CompanyRecruitmentType[] = companies
				.filter(
					(company) =>
						company.company_name
							.toLowerCase()
							.includes(searchQuery) &&
						company.company_name !== searchQuery
				)
				.slice(0, 4);
			setSimilarCompanies(similarCompaniesFound);
		}
	}, [
		companyQueryResult.isSuccess,
		companyQueryResult.data,
		companyRecruitmentQueryString.company_name,
	]);

	const handleSimilarCompanySelect = (
		selectedCompany: CompanyRecruitmentType
	) => {
		setSelectedCompanyId(selectedCompany.company_id);
		companyRecruitmentQueryStringHandler({
			target: {
				name: 'company_name',
				value: selectedCompany.company_name,
			},
		} as React.ChangeEvent<HTMLInputElement>);
	};

	const [recruitmentQueryResult] = useGetRecruitmentForm(
		recruitmentFormQueryString
	);

	useEffect(() => {
		recruitmentQueryResult.refetch();
		// eslint-disable-next-line
	}, [recruitmentFormQueryString]);

	useEffect(() => {
		if (recruitmentQueryResult.isSuccess) {
			const recruitments: RecruitmentFormType[] =
				recruitmentQueryResult.data.recruitments;
			const searchQuery =
				recruitmentFormQueryString.company_name.toLowerCase();
			const similarRecruitmentsFound: RecruitmentFormType[] = recruitments
				.filter(
					(recruitment) =>
						recruitment.company_name
							.toLowerCase()
							.includes(searchQuery) &&
						recruitment.company_name !== searchQuery
				)
				.slice(0, 4);
			setSimilarRecruitment(similarRecruitmentsFound);
		}
	}, [
		recruitmentQueryResult.isSuccess,
		recruitmentQueryResult.data,
		recruitmentFormQueryString.company_name,
	]);

	const handleSimilarRecruitmentSelect = (
		selectedRecruitment: RecruitmentFormType
	) => {
		setSelectedCompanyId(selectedRecruitment.company_id);
		recruitmentFormQueryStringHandler({
			target: {
				name: 'company_name',
				value: selectedRecruitment.company_name,
			},
		} as React.ChangeEvent<HTMLInputElement>);
	};

	return (
		<_.Container>
			<_.TempleteWrapper>
				<_.TemplteTitle>템플릿</_.TemplteTitle>
				<div>
					<_.TempleteImg src={banner} />
				</div>
			</_.TempleteWrapper>
			<_.Right>
				<_.CreateWrapper>
					<_.Title>배너 내용을 추가해주세요.</_.Title>
					<_.CaptureWrapper id="captureElement">
						<_.BannerImg src={templete} />
						<_.InputWrapper
							hasValue={{
								title1: !!form.title1,
								title2: !!form.title2,
								description: !!form.description,
								companyName: !!form.companyName,
							}}
						>
							<_.Input
								placeholder="제목"
								name="title1"
								value={form.title1}
								className="title1"
								hasValue={Boolean(form.title1)}
								onChange={handleChange}
							></_.Input>
							<_.Input
								placeholder="제목"
								name="title2"
								value={form.title2}
								className="title2"
								hasValue={Boolean(form.title2)}
								onChange={handleChange}
							></_.Input>
							<_.Input
								placeholder="회사 이름 "
								name="companyName"
								value={form.companyName}
								className="companyName"
								hasValue={Boolean(form.companyName)}
								onChange={handleChange}
							></_.Input>
							<_.Input
								placeholder="설명"
								name="description"
								value={form.description}
								className="description"
								hasValue={Boolean(form.description)}
								onChange={handleChange}
							></_.Input>
						</_.InputWrapper>
						<_.FileInputContainer>
							{logoPreview ? (
								<img
									src={logoPreview}
									alt="로고 미리보기"
									style={{
										width: '100%',
										height: '100%',
										borderRadius: '12px',
									}}
								/>
							) : (
								<>로고를 업로드 해주세요.</>
							)}
							<_.FileInput
								type="file"
								onChange={handleFileChange}
							/>
						</_.FileInputContainer>
					</_.CaptureWrapper>
				</_.CreateWrapper>
				<_.MovePage>
					<_.Title>
						배너를 누르면 이동 될 페이지를 선택해 주세요.
					</_.Title>
					<_.Table>
						<_.CompanyNameSearch>
							<_.Td>
								<input
									type="radio"
									name="page"
									value="page_type_1"
									onChange={(e) => handleRadioChange(e)}
								/>
							</_.Td>
							<_.Name>
								<_.SearchIcon src={search} />
								<_.Search
									placeholder="기업명 검색 (기업 상세)"
									name="company_name"
									value={
										companyRecruitmentQueryString.company_name
									}
									onChange={
										companyRecruitmentQueryStringHandler
									}
									onFocus={() => setShowSearchEx(true)}
								/>
							</_.Name>
							{showSearchEx && (
								<_.SearchEx>
									{similarCompanies.map((company) => (
										<div>
											<_.SearchIcon src={search} />
											<li
												key={company.company_id}
												onClick={() => {
													handleSimilarCompanySelect(
														company
													);
													setShowSearchEx(false);
												}}
											>
												{company.company_name}
											</li>
										</div>
									))}
								</_.SearchEx>
							)}
						</_.CompanyNameSearch>
						<_.RecruitmentSearch>
							<_.Td>
								<input
									type="radio"
									name="page"
									value="page_type_2"
									onChange={(e) => handleRadioChange(e)}
								/>
							</_.Td>
							<_.Name>
								<_.SearchIcon src={search} />
								<_.Search
									placeholder="기업명 검색 (모집 의뢰서)"
									name="company_name"
									value={
										recruitmentFormQueryString.company_name
									}
									onChange={recruitmentFormQueryStringHandler}
									onFocus={() =>
										setShowRecruitmentSearchEx(true)
									}
								/>
							</_.Name>
							{showRecruitmentSearchEx && (
								<_.recruitmentEx>
									{similarRecruitment.map((recruitment) => (
										<div>
											<_.SearchIcon src={search} />
											<li
												key={recruitment.company_id}
												onClick={() => {
													handleSimilarRecruitmentSelect(
														recruitment
													);
													setShowRecruitmentSearchEx(
														false
													);
												}}
											>
												{recruitment.company_name}
											</li>
										</div>
									))}
								</_.recruitmentEx>
							)}
						</_.RecruitmentSearch>
						<tr>
							<_.Td>
								<input
									type="radio"
									name="page"
									value="page_type_3"
									onChange={(e) => handleRadioChange(e)}
								/>
							</_.Td>
							<_.Name>체험형 현장실습</_.Name>
						</tr>
						<tr>
							<_.Td>
								<input
									type="radio"
									name="page"
									value="page_type_4"
									onChange={(e) => handleRadioChange(e)}
								/>
							</_.Td>
							<_.Name>북마크</_.Name>
						</tr>
						<tr>
							<_.Td>
								<input
									type="radio"
									name="page"
									value="page_type_5"
									onChange={(e) => handleRadioChange(e)}
								/>
							</_.Td>
							<_.Name>페이지 이동 안 함</_.Name>
						</tr>
					</_.Table>
				</_.MovePage>
				<_.ButtonWrapper>
					<_.TimeWrapper>
						<_.Title>배너가 보여질 기간을 선택해 주세요.</_.Title>
						<_.Wrapper>
							<_.Time>
								<_.TimeTitle>시작</_.TimeTitle>
								<_.TimeInput
									type="date"
									onChange={handleStartDateChange}
								></_.TimeInput>
							</_.Time>
							<_.Time>
								<_.TimeTitle>끝</_.TimeTitle>
								<_.TimeInput
									type="date"
									onChange={handleEndDateChange}
								></_.TimeInput>
							</_.Time>
						</_.Wrapper>
					</_.TimeWrapper>
					<Button kind="Solid" onClick={handleAddBanner}>
						배너 추가
					</Button>
				</_.ButtonWrapper>
			</_.Right>
		</_.Container>
	);
}
