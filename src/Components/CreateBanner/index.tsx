import * as _ from './styled';
import React, { Dispatch, useState, SetStateAction, useEffect } from 'react';
import templete from '../../Assets/PNG/templete.png';
import banner from '../../Assets/PNG/banner.png';
import search from '../../Assets/SVG/search.svg';
import { Button, useToastStore } from '@team-return/design-system';
import { useCreateBanners } from '../../Apis/Banners';
import {
	useCompanyRecruitmentQueryString,
	useRecruitmentFormQueryString,
} from '../../Store/State';
import { DateProps } from '../../Apis/Banners/request';
import { useForm } from '../../Hooks/useForm';
import html2canvas from 'html2canvas';

interface PropType {
	date: DateProps;
	setDate: Dispatch<SetStateAction<DateProps>>;
}

export function CreateBanner({ date, setDate }: PropType) {
	const { append } = useToastStore();
	const [logoPreview, setLogoPreview] = useState<string | null>(null);
	const [selectedPage, setSelectedPage] = useState<string | null>(null);

	const [startDate, setStartDate] = useState<string | null>(null);
	const [endDate, setEndDate] = useState<string | null>(null);

	const [url, setUrl] = useState<string | null>(null);

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

	useEffect(() => {
		if (url) createBannersAPI.mutate();
	}, [url]);

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

	const captureImage = async () => {
		try {
			const elementToCapture = document.getElementById('captureElement');

			if (elementToCapture) {
				const canvas = await html2canvas(elementToCapture);
				const dataURL: string = canvas.toDataURL('image/png');
				console.log('Captured Image Data URL:', dataURL);
				return dataURL;
			} else {
				console.error('Element to capture not found');
				return '';
			}
		} catch (error) {
			console.error('Error capturing image:', error);
			return '';
		}
	};

	const createBannersAPI = useCreateBanners(
		url!,
		{
			page_type_1: 'COMPANY',
			page_type_2: 'RECRUITENT',
			page_type_3: 'INTERNSHIP',
			page_type_4: 'BOOKMARK',
			page_type_5: 'NONE',
		}[selectedPage!]!,
		date.start_date,
		date.end_date,

		{
			onSuccess: () => {
				append({
					title: '성공적으로 추가되었습니다.',
					message: '',
					type: 'GREEN',
				});
			},
			onError: () => {
				append({
					title: '추가에 실패했습니다.',
					message: '',
					type: 'RED',
				});
			},
		}
	);
	console.log(createBannersAPI);

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
					<div id="captureElement">
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
						<_.LogoUpload>
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
						</_.LogoUpload>
					</div>
				</_.CreateWrapper>
				<_.MovePage>
					<_.Title>
						배너를 누르면 이동 될 페이지를 선택해 주세요.
					</_.Title>
					<_.Table>
						<tr>
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
								></_.Search>
							</_.Name>
						</tr>
						<tr>
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
								></_.Search>
							</_.Name>
						</tr>
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
					<Button
						kind="Solid"
						onClick={() => {
							captureImage().then((res) => {
								console.log(res);
								setUrl(res);
							});
						}}
					>
						배너 추가
					</Button>
				</_.ButtonWrapper>
			</_.Right>
		</_.Container>
	);
}
