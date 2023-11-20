import { useCallback, useEffect, useRef, useState } from 'react';
import { CodesType } from '../../../Apis/Codes/response';
import * as _ from './style';
import { useModalContext } from '../../../Utils/Modal';
import { EditAreasType } from '../../../Apis/Recruitments/request';
import { AreasType } from '../../../Apis/Recruitments/response';
import { Icon, Stack, theme, useToastStore } from '@team-return/design-system';
import OutsideClickHandler from 'react-outside-click-handler';
import { useAddArea, useEditArea } from '../../../Apis/Recruitments';
import { useInput } from '../../../Hooks/useInput';
import { useGetCode } from '../../../Apis/Codes';

const jobType = ['WEB', 'APP', 'GAME', 'EMBEDDED', 'SECURITY', 'AI', 'ASD'];

interface PropsType {
	refetchRecruitmentFormDetailInfo: () => void;
	areaData?: AreasType;
	recruitmentId: string;
}

export function GatherModal({
	refetchRecruitmentFormDetailInfo,
	areaData,
	recruitmentId,
}: PropsType) {
	const { append } = useToastStore();
	const { form: searchString, handleChange: searchStringHandler } =
		useInput<string>('');
	const [inputFocus, setInputFocus] = useState<boolean>(false);
	const [tech, setTech] = useState<CodesType[]>([]);
	const selectTechCode = tech.map((techItem) => techItem.code);

	const { data: jobs, isLoading: jobsLoading } = useGetCode('JOB');
	const selectJobsArray = jobs?.codes.filter((code) =>
		areaData?.job.includes(code.keyword)
	);

	const { data: techs, isLoading: techsLoading } = useGetCode('TECH');
	const selectTechsArray = techs?.codes.filter((techItem) =>
		areaData?.tech.includes(techItem.keyword)
	);
	const selectTechsCodeArray = selectTechsArray?.map(
		(techItem) => techItem.code
	);
	const searchTechsArray = techs?.codes
		.filter((techItem) =>
			techItem.keyword.toLowerCase().includes(searchString.toLowerCase())
		)
		.filter((techItem) => !selectTechsCodeArray?.includes(techItem.code));

	const { closeModal } = useModalContext();
	const [area, setArea] = useState<EditAreasType>({
		job_codes: [],
		tech_codes: [],
		hiring: 0,
		major_task: '',
		preferential_treatment: '',
	});

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (isLoading && !jobsLoading && !techsLoading) {
			setArea({
				job_codes: selectJobsArray
					? selectJobsArray.map((job) => job.code)
					: [],
				tech_codes: selectTechsArray
					? selectTechsArray.map((tech) => tech.code)
					: [],
				hiring: areaData?.hiring ? areaData?.hiring : 0,
				major_task: areaData?.major_task ? areaData?.major_task : '',
				preferential_treatment: areaData?.preferential_treatment
					? areaData?.preferential_treatment
					: '',
			});
			setTech(selectTechsArray ? selectTechsArray : []);
			setIsLoading(false);
		}
	}, [
		jobsLoading,
		techsLoading,
		selectJobsArray,
		selectTechsArray,
		isLoading,
		areaData?.hiring,
		areaData?.major_task,
		areaData?.preferential_treatment,
	]);

	const pushJobArray = (job: CodesType) => {
		setArea({ ...area, job_codes: [...area.job_codes, job.code] });
	};

	const deleteJobArray = (code: number) => {
		setArea({
			...area,
			job_codes: area.job_codes.filter((datas) => datas !== code),
		});
	};

	const checkAreaArray = (techItem: CodesType) => {
		area.job_codes.includes(techItem.code)
			? deleteJobArray(techItem.code)
			: pushJobArray(techItem);
	};

	const deleteTechArray = (id: number) => {
		setTech(tech.filter((tech) => tech.code !== id));
	};

	const text1Ref = useRef<HTMLTextAreaElement>(null);
	const text2Ref = useRef<HTMLTextAreaElement>(null);

	const handleText1RefResizeHeight = useCallback(() => {
		if (text1Ref && text1Ref.current) {
			text1Ref.current.style.height = '80px';
			text1Ref.current.style.height =
				text1Ref.current.scrollHeight + 'px';
		}
	}, []);

	const handleText2RefResizeHeight = useCallback(() => {
		if (text2Ref && text2Ref.current) {
			text2Ref.current.style.height = '80px';
			text2Ref.current.style.height =
				text2Ref.current.scrollHeight + 'px';
		}
	}, []);

	const { mutate: addArea } = useAddArea(recruitmentId, area, {
		onSuccess: () => {
			refetchRecruitmentFormDetailInfo();
			append({
				title: '성공적으로 추가되었습니다.',
				message: '',
				type: 'GREEN',
			});
			closeModal();
		},
		onError: () => {
			append({
				title: '모집 분야 추가에 실패했습니다.',
				message: '',
				type: 'RED',
			});
		},
	});
	const { mutate: editArea } = useEditArea(
		areaData?.id ? areaData.id : 0,
		area,
		{
			onSuccess: () => {
				refetchRecruitmentFormDetailInfo();
				append({
					title: '성공적으로 수정되었습니다.',
					message: '',
					type: 'GREEN',
				});
				closeModal();
			},
			onError: () => {
				append({
					title: '수정에 실패했습니다.',
					message: '',
					type: 'RED',
				});
			},
		}
	);

	const submit = () => {
		areaData ? editArea() : addArea();
	};

	return (
		<>
			<_.Container>
				<_.BigWrapper>
					<_.Title>
						채용직무<span style={{ color: '#0087FF' }}> *</span>
					</_.Title>
					<_.ContentsText>
						아래 제시된 분야중 해당하는 분야를 선택하세요.
					</_.ContentsText>
					<_.SmallWrapper>
						<_.FieldTitleWrapper>
							<_.FieldTitle>웹프로그래밍</_.FieldTitle>
							<_.FieldTitle>모바일</_.FieldTitle>
							<_.FieldTitle>게임</_.FieldTitle>
							<_.FieldTitle>임베디드</_.FieldTitle>
							<_.FieldTitle>보안</_.FieldTitle>
							<_.FieldTitle>인공지능</_.FieldTitle>
							<_.FieldTitle>응용프로그래밍</_.FieldTitle>
						</_.FieldTitleWrapper>
						<div>
							{jobType.map((type, i) => {
								return (
									<_.FieldWrapper key={i}>
										<_.Field>
											{jobs?.codes
												.filter(
													(code) =>
														code.job_type === type
												)
												.map((code, i) => {
													const techTech = {
														code: code.code,
														keyword: code.keyword,
													};
													return (
														<_.JobCard
															key={i}
															colorBool={area.job_codes.includes(
																code.code
															)}
															onClick={() =>
																checkAreaArray(
																	techTech
																)
															}
														>
															{code.keyword}
														</_.JobCard>
													);
												})}
										</_.Field>
									</_.FieldWrapper>
								);
							})}
						</div>
					</_.SmallWrapper>
				</_.BigWrapper>
				<_.BigWrapper>
					<Stack justify="space-between" position="relative">
						<div>
							<_.Title>
								사용기술
								<span style={{ color: '#0087FF' }}> *</span>
							</_.Title>
							<_.ContentsText>
								필요한 기술 스택을 추가하세요.
							</_.ContentsText>
						</div>
						<OutsideClickHandler
							onOutsideClick={() => {
								setInputFocus(false);
							}}
						>
							<_.Input
								value={searchString}
								placeholder="기술 이름 검색"
								onChange={searchStringHandler}
								onFocus={() => {
									setInputFocus(true);
								}}
							/>
							<_.SearchIconWrapper>
								<Icon icon="Search" size={20} />
							</_.SearchIconWrapper>
							{inputFocus && (
								<_.SearchTechWrapper
									height={
										!!searchTechsArray?.length
											? searchTechsArray.length * 52
											: 52
									}
								>
									{!!searchTechsArray?.length ? (
										techs?.codes
											.filter((techItem) =>
												techItem.keyword
													.toLowerCase()
													.includes(
														searchString.toLowerCase()
													)
											)
											.filter(
												(techItem) =>
													!selectTechCode?.includes(
														techItem.code
													)
											)
											.map((techItem) => {
												return (
													<_.SearchTechCard
														onClick={() =>
															setTech(
																(techItems) => [
																	...techItems,
																	{
																		code: techItem.code,
																		keyword:
																			techItem.keyword,
																	},
																]
															)
														}
													>
														{techItem.keyword}
													</_.SearchTechCard>
												);
											})
									) : (
										<_.SearchTechCard
											style={{
												fontSize: '15px',
												color: `${theme.color.gray60}`,
												fontWeight: '400',
											}}
										>
											검색결과가 없습니다.
										</_.SearchTechCard>
									)}
								</_.SearchTechWrapper>
							)}
						</OutsideClickHandler>
					</Stack>
					<_.CardWrapper>
						{tech.map((res, i) => {
							return (
								<>
									<_.Card key={i}>
										{res.keyword}
										<_.XIcon>
											<Icon
												icon="Close"
												size={15}
												color="gray10"
												onClick={() =>
													deleteTechArray(res.code)
												}
											/>
										</_.XIcon>
									</_.Card>
								</>
							);
						})}
					</_.CardWrapper>
				</_.BigWrapper>
				<_.BigWrapper>
					<_.Title>
						채용인원<span style={{ color: '#0087FF' }}> *</span>
					</_.Title>
					<_.ContentsText>채용할 인원을 입력해주세요.</_.ContentsText>
					<_.SmallWrapper>
						<_.Input
							marginTop={15}
							type="number"
							placeholder="채용 인원 수"
							min={0}
							value={area.hiring}
							onChange={(e) => {
								setArea({ ...area, hiring: +e.target.value });
							}}
						/>
						<_.NumText>명</_.NumText>
					</_.SmallWrapper>
				</_.BigWrapper>
				<_.BigWrapper>
					<_.Title>
						상세직무<span style={{ color: '#0087FF' }}> *</span>
					</_.Title>
					<_.ContentsText>
						해당 직무에서 하는 일을 상세하게 입력해주세요.
					</_.ContentsText>
					<_.SmallWrapper>
						<_.Textarea
							ref={text1Ref}
							value={area.major_task}
							placeholder="해당 직무에서 하는 일"
							onInput={handleText1RefResizeHeight}
							onChange={(e) =>
								setArea({ ...area, major_task: e.target.value })
							}
						/>
					</_.SmallWrapper>
				</_.BigWrapper>
				<_.BigWrapper>
					<_.Title>우대사항</_.Title>
					<_.ContentsText>
						해당 직무의 우대사항을 상세하게 입력해주세요.
					</_.ContentsText>
					<_.SmallWrapper>
						<_.Textarea
							ref={text2Ref}
							value={area.preferential_treatment}
							placeholder="우대사항"
							onInput={handleText2RefResizeHeight}
							onChange={(e) =>
								setArea({
									...area,
									preferential_treatment: e.target.value,
								})
							}
						/>
					</_.SmallWrapper>
				</_.BigWrapper>
				<_.BtnWrapper>
					<_.CancleBtn onClick={closeModal}>취소</_.CancleBtn>
					<_.SuccessBtn
						disabled={
							!(
								!!area.job_codes &&
								!!area.major_task &&
								!!area.tech_codes &&
								!!area.hiring
							)
						}
						onClick={() => {
							setArea((areas) => ({
								...areas,
								tech_codes: tech.map(
									(techItem) => techItem.code
								),
							}));
							setTimeout(submit);
						}}
					>
						확인
					</_.SuccessBtn>
				</_.BtnWrapper>
			</_.Container>
		</>
	);
}
