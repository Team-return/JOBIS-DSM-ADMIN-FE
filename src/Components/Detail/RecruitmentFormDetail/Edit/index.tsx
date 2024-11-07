import {
	Button,
	Icon,
	RadioButton,
	Stack,
	useToastStore,
	Text,
} from '@team-return/design-system';
import { RecruitmentFormDetailResponse } from '../../../../Apis/Recruitments/response';
import { hiringProgress } from '../../../../Utils/Translation';
import * as _ from '../../style';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useModalContext } from '../../../../Utils/Modal';
import { GatherModal } from '../../../Modal/RecruitmentModal';
import { DeleteRecruitmentModal } from '../../../Modal/DeleteRecruitmentModal';
import {
	useDeleteArea,
	useEditRecruitment,
} from '../../../../Apis/Recruitments';
import { useNavigate, useParams } from 'react-router-dom';
import { EditRecruitmentRequest } from '../../../../Apis/Recruitments/request';
import { useForm } from '../../../../Hooks/useForm';
import { EditHiringProgressModal } from '../../../Modal/EditHiringProgressModal';
import { useDidMountEffect } from '../../../../Hooks/useDidMountEffect';
import { EditRequiredLicensesModal } from '../../../Modal/EditRequiredLicensesModal';

interface PropsType {
	recruitmentFormDetail: RecruitmentFormDetailResponse;
	setCanEdit: Dispatch<SetStateAction<boolean>>;
	refetchRecruitmentFormDetailInfo: () => void;
}
export function RecruitmentFormDetailEdit({
	recruitmentFormDetail,
	setCanEdit,
	refetchRecruitmentFormDetailInfo,
}: PropsType) {
	const [every, setEvery] = useState(!recruitmentFormDetail?.start_date);
	const [working, setWorking] = useState(
		recruitmentFormDetail?.flexible_working
			? recruitmentFormDetail?.working_hours
			: ''
	);
	const navigate = useNavigate();
	const { append } = useToastStore();
	const params = useParams();
	const { openModal, closeModal } = useModalContext();

	const {
		form: recruitmentFormDetailInfo,
		setForm: setRecruitmentFormDetailInfo,
		handleChange: recruitmentFormDetailInfohandler,
	} = useForm<Omit<EditRecruitmentRequest, 'working_hours'>>({
		required_grade: recruitmentFormDetail?.required_grade,
		required_licenses: recruitmentFormDetail?.required_licenses,
		start_time: recruitmentFormDetail?.flexible_working
			? '00:00'
			: recruitmentFormDetail?.working_hours.split(' ~ ')[0],
		end_time: recruitmentFormDetail?.flexible_working
			? '00:00'
			: recruitmentFormDetail?.working_hours.split(' ~ ')[1],
		train_pay: recruitmentFormDetail?.train_pay,
		pay: recruitmentFormDetail?.pay,
		benefits: recruitmentFormDetail?.benefits,
		military_support: recruitmentFormDetail?.military_support,
		hiring_progress: recruitmentFormDetail?.hiring_progress,
		submit_document: recruitmentFormDetail?.submit_document,
		start_date: recruitmentFormDetail?.start_date,
		end_date: recruitmentFormDetail?.end_date,
		etc: recruitmentFormDetail?.etc,
		flexible_working: recruitmentFormDetail?.flexible_working,
		hire_convertible: recruitmentFormDetail?.hire_convertible,
		integration_plan: recruitmentFormDetail?.integration_plan,
	});

	const {
		hire_convertible,
		required_licenses,
		start_date,
		end_date,
		train_pay,
		pay,
		benefits,
		military_support,
		hiring_progress,
		submit_document,
		etc,
		flexible_working,
		integration_plan,
	} = recruitmentFormDetailInfo;

	const [areaId, setAreaId] = useState<number>(0);
	const { mutate: deleteArea } = useDeleteArea(areaId, {
		onSuccess: () => {
			refetchRecruitmentFormDetailInfo();
			closeModal();
			append({
				title: '성공적으로 삭제되었습니다.',
				message: '',
				type: 'GREEN',
			});
		},
		onError: () => {
			append({
				title: '삭제를 실패하였습니다.',
				message: '',
				type: 'RED',
			});
		},
	});

	const openEditHiringProgressModal = () => {
		openModal({
			children: (
				<EditHiringProgressModal
					hiringProgressArray={hiring_progress}
					setRecruitmentFormDetailInfo={setRecruitmentFormDetailInfo}
				/>
			),
		});
	};

	const openEditRequiredLicensesModal = () => {
		openModal({
			children: (
				<EditRequiredLicensesModal
					requiredLicensesArray={required_licenses}
					setRecruitmentFormDetailInfo={setRecruitmentFormDetailInfo}
				/>
			),
		});
	};

	useDidMountEffect(() => {
		openEditRequiredLicensesModal();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [required_licenses]);

	useDidMountEffect(() => {
		openEditHiringProgressModal();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hiring_progress]);

	const { start_time, end_time, ...detailInfo } = recruitmentFormDetailInfo;
	const { mutate: editRecruitmentFormDetail } = useEditRecruitment(
		params.id!,
		{
			...detailInfo,
			start_date: every ? null : detailInfo?.start_date,
			end_date: every ? null : detailInfo?.end_date,
			working_hours: flexible_working
				? start_time
				: `${start_time} ~ ${end_time}`,
		},
		{
			onSuccess: () => {
				append({
					title: '모집의뢰서 수정에 성공하였습니다.',
					message: '',
					type: 'GREEN',
				});
				refetchRecruitmentFormDetailInfo();
				setCanEdit(false);
			},
			onError: () => {
				append({
					title: '모집의뢰서 수정에 실패하였습니다.',
					message: '',
					type: 'RED',
				});
			},
		}
	);

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
							src={`${process.env.REACT_APP_FILE_URL}${recruitmentFormDetail?.company_profile_url}`}
						/>
					</_.LogoWrapper>
				</Stack>
				<Stack gap={20}>
					<Button
						size="M"
						kind="Shadow"
						onClick={() => setCanEdit(false)}
					>
						취소
					</Button>
					<Button size="M" onClick={editRecruitmentFormDetail}>
						확인
					</Button>
				</Stack>
			</_.Wrapper>
			<_.Stack>
				<_.TitleBox height={90}>기업명</_.TitleBox>
				<_.ContentBox width={40} height={90}>
					<_.CustomInput
						width={100}
						type="text"
						className="companyName"
						value={recruitmentFormDetail?.company_name}
						disabled={true}
					/>
				</_.ContentBox>
				<_.TitleBox height={90}>모집기간</_.TitleBox>
				<_.ContentBox
					width={40}
					height={90}
					style={{ padding: '0px', flexDirection: 'column' }}
				>
					<_.DateBox>
						<_.CustomInput
							width={100}
							type="date"
							value={start_date!}
							name="start_date"
							disabled={every}
							onChange={(
								e: ChangeEvent<
									HTMLInputElement | HTMLTextAreaElement
								>
							) =>
								e.target.value
									? recruitmentFormDetailInfohandler(e)
									: setRecruitmentFormDetailInfo((prev) => ({
											...prev,
											start_date: start_date,
									  }))
							}
						/>
						<span style={{ margin: '0 10px' }}>~</span>
						<_.CustomInput
							width={100}
							type="date"
							value={end_date!}
							name="end_date"
							disabled={every}
							onChange={(
								e: ChangeEvent<
									HTMLInputElement | HTMLTextAreaElement
								>
							) =>
								e.target.value
									? recruitmentFormDetailInfohandler(e)
									: setRecruitmentFormDetailInfo((prev) => ({
											...prev,
											end_date: end_date,
									  }))
							}
						/>
					</_.DateBox>
					<_.CheckEmailWrapper>
						<_.CheckBox
							type="checkbox"
							checked={every}
							onChange={() => setEvery((prev) => !prev)}
						/>
						<_.CheckLogin>상시모집</_.CheckLogin>
					</_.CheckEmailWrapper>
				</_.ContentBox>
			</_.Stack>
			<_.Stack>
				<_.TitleBox
					height={(recruitmentFormDetail?.areas.length + 1) * 325}
				>
					모집분야
				</_.TitleBox>
				<_.Stack flexDirection="column" width={90}>
					{recruitmentFormDetail?.areas.map((area, i) => {
						return (
							<_.Stack key={area.id}>
								<_.TitleBox height={325} width={5}>
									{i + 1}
								</_.TitleBox>
								<_.Stack flexDirection="column" width={95}>
									<_.Stack>
										<_.TitleBox height={125}>
											채용인원
										</_.TitleBox>
										<_.ContentBox height={125} width={15}>
											{area.hiring}명
										</_.ContentBox>
										<_.TitleBox height={125}>
											분야
										</_.TitleBox>
										<_.ContentBox
											height={125}
											width={15}
											overflow="scroll"
											longText={true}
										>
											{area.job
												.map((item) => item.name)
												.join(' / ')}
										</_.ContentBox>
										<_.TitleBox height={125}>
											사용기술
										</_.TitleBox>
										<_.ContentBox
											height={125}
											width={40}
											overflow="scroll"
											longText={true}
										>
											{area.tech
												.map((item) => item.name)
												.join(' / ')}
										</_.ContentBox>
									</_.Stack>
									<_.Stack>
										<_.TitleBox height={200}>
											주요업무
										</_.TitleBox>
										<_.ContentBox
											height={200}
											width={40}
											longText={true}
											overflow="scroll"
										>
											{area.major_task}
										</_.ContentBox>
										<_.TitleBox height={200}>
											우대사항
										</_.TitleBox>
										<_.ContentBox
											height={200}
											width={40}
											longText={true}
											overflow="scroll"
										>
											{area.preferential_treatment}
										</_.ContentBox>
									</_.Stack>
								</_.Stack>
								{recruitmentFormDetail?.areas.length !== 1 && (
									<_.TitleBox
										height={325}
										width={6}
										style={{ cursor: 'pointer' }}
										onClick={() => {
											openModal({
												children: (
													<DeleteRecruitmentModal />
												),
												onSubmit: () => {
													setAreaId(area.id);
													setTimeout(deleteArea);
												},
												onCancel: () => {
													closeModal();
												},
											});
										}}
									>
										<Icon
											icon="Trash"
											size={43}
											color="error"
										/>
									</_.TitleBox>
								)}
								<_.TitleBox
									height={325}
									width={6}
									style={{ cursor: 'pointer' }}
									onClick={() => {
										openModal({
											children: (
												<GatherModal
													recruitmentId={params.id!}
													areaData={area}
													refetchRecruitmentFormDetailInfo={
														refetchRecruitmentFormDetailInfo
													}
												/>
											),
										});
									}}
								>
									<Icon
										icon="EditPencil"
										size={30}
										color="gray70"
									/>
								</_.TitleBox>
							</_.Stack>
						);
					})}
					<_.TitleBox height={325} width={100}>
						<_.IconWrapper
							onClick={() => {
								openModal({
									children: (
										<GatherModal
											recruitmentId={params.id!}
											refetchRecruitmentFormDetailInfo={
												refetchRecruitmentFormDetailInfo
											}
										/>
									),
								});
							}}
						>
							<Icon icon="Plus" size={35} color="gray70" />
						</_.IconWrapper>
					</_.TitleBox>
				</_.Stack>
			</_.Stack>
			<_.Stack>
				<_.TitleBox>자격요건</_.TitleBox>
				<_.Stack flexDirection="column" width={90}>
					<_.Stack width={143}>
						<_.TitleBox>국가자격증</_.TitleBox>
						<_.ContentBox
							width={54}
							longText={true}
							overflow="scroll"
						>
							{required_licenses.join(', ') || '-'}
						</_.ContentBox>
						<_.TitleBox
							width={6}
							style={{ cursor: 'pointer' }}
							onClick={openEditRequiredLicensesModal}
						>
							<Icon icon="EditPencil" size={30} color="gray70" />
						</_.TitleBox>
					</_.Stack>
				</_.Stack>
			</_.Stack>
			<_.Stack>
				<_.TitleBox height={290}>근무조건</_.TitleBox>
				<_.Stack flexDirection="column" width={90}>
					<_.Stack flexDirection="column" width={100}>
						<_.Stack>
							<_.TitleBox height={90}>근무시간</_.TitleBox>
							<_.ContentBox
								width={23}
								height={90}
								style={{
									padding: '0px',
									flexDirection: 'column',
								}}
							>
								<_.DateBox>
									<_.CustomInput
										width={flexible_working ? 100 : 45}
										placeholder="출근시간"
										style={{
											paddingRight: '10px',
										}}
										value={
											flexible_working
												? working
												: start_time?.replace(
														/^(\d{2}:\d{2})$/,
														'$1'
												  )
										}
										name="start_time"
										maxLength={5}
										onChange={(e) => {
											// eslint-disable-next-line @typescript-eslint/no-unused-expressions
											flexible_working
												? setWorking(e.target.value)
												: setRecruitmentFormDetailInfo(
														(prev) => ({
															...prev,
															start_time:
																e.target.value
																	.replaceAll(
																		/[^0-9]/g,
																		''
																	)
																	?.replaceAll(
																		/^(\d{2})(\d{2})$/g,
																		'$1:$2'
																	),
														})
												  );
										}}
									/>
									{!flexible_working && (
										<>
											<p
												style={{
													margin: '0 10px',
												}}
											>
												~
											</p>
											<_.CustomInput
												width={45}
												placeholder="퇴근시간"
												style={{
													paddingRight: '10px',
												}}
												maxLength={5}
												value={end_time?.replace(
													/^(\d{2}:\d{2}):\d{2}$/,
													'$1'
												)}
												name="end_time"
												onChange={(e) =>
													setRecruitmentFormDetailInfo(
														(prev) => ({
															...prev,
															end_time:
																e.target.value
																	.replaceAll(
																		/[^0-9]/g,
																		''
																	)
																	?.replaceAll(
																		/^(\d{2})(\d{2})$/g,
																		'$1:$2'
																	),
														})
													)
												}
											/>
										</>
									)}
								</_.DateBox>
								<_.CheckEmailWrapper>
									<_.CheckBox
										type="checkbox"
										checked={flexible_working}
										onChange={() =>
											setRecruitmentFormDetailInfo(
												(prev) => ({
													...prev,
													flexible_working:
														!prev.flexible_working,
												})
											)
										}
									/>
									<_.CheckLogin>유연근무제</_.CheckLogin>
								</_.CheckEmailWrapper>
							</_.ContentBox>
							<_.TitleBox height={90}>실습수당</_.TitleBox>
							<_.ContentBox height={90} width={23}>
								<_.CustomInput
									width={100}
									type="number"
									placeholder="실습수당"
									style={{ paddingRight: '70px' }}
									value={train_pay}
									name="train_pay"
									onChange={recruitmentFormDetailInfohandler}
								/>
								<_.AbsoluteText right={42}>
									원/월
								</_.AbsoluteText>
							</_.ContentBox>
							<_.TitleBox height={90}>
								정규직
								<br />
								전환 시 연봉
							</_.TitleBox>
							<_.ContentBox height={90} width={24}>
								<_.CustomInput
									width={100}
									type="number"
									placeholder="정규직 전환 시 연봉"
									style={{ paddingRight: '70px' }}
									value={pay!}
									name="pay"
									onChange={recruitmentFormDetailInfohandler}
								/>
								<_.AbsoluteText right={42}>
									만원/연
								</_.AbsoluteText>
							</_.ContentBox>
						</_.Stack>
						<_.Stack>
							<_.TitleBox height={200}>복리후생</_.TitleBox>
							<_.ContentBox
								height={200}
								width={90}
								longText={true}
							>
								<_.Textarea
									height={135}
									name="benefits"
									placeholder="복리후생"
									value={benefits!}
									onChange={recruitmentFormDetailInfohandler}
								/>
							</_.ContentBox>
						</_.Stack>
					</_.Stack>
				</_.Stack>
			</_.Stack>
			<_.Stack>
				<_.TitleBox height={350}>채용절차</_.TitleBox>
				<_.Stack flexDirection="column" width={90}>
					<_.Stack flexDirection="column" width={100}>
						<_.Stack>
							<_.TitleBox>채용절차</_.TitleBox>
							<_.ContentBox width={54}>
								{recruitmentFormDetailInfo.hiring_progress.map(
									(progress, i) => {
										if (
											recruitmentFormDetailInfo
												.hiring_progress.length ===
											i + 1
										) {
											return `${hiringProgress[progress]}`;
										}
										return `${hiringProgress[progress]} → `;
									}
								)}
							</_.ContentBox>
							<_.TitleBox
								width={6}
								style={{ cursor: 'pointer' }}
								onClick={openEditHiringProgressModal}
							>
								<Icon
									icon="EditPencil"
									size={30}
									color="gray70"
								/>
							</_.TitleBox>
							<_.TitleBox>
								병역특례
								<br />
								신청계획
							</_.TitleBox>
							<_.ContentBox width={20}>
								<Stack direction="column">
									<Stack gap={5}>
										<RadioButton
											name="military_support"
											onClick={() => {
												setRecruitmentFormDetailInfo(
													(
														recruitmentFormDetailInfo
													) => ({
														...recruitmentFormDetailInfo,
														military_support: true,
													})
												);
											}}
											checked={military_support === true}
										/>
										있음
									</Stack>
									<Stack gap={5}>
										<RadioButton
											name="military_support"
											onClick={() => {
												setRecruitmentFormDetailInfo(
													(
														recruitmentFormDetailInfo
													) => ({
														...recruitmentFormDetailInfo,
														military_support: false,
													})
												);
											}}
											checked={military_support === false}
										/>
										없음
									</Stack>
								</Stack>
							</_.ContentBox>
						</_.Stack>
						<_.Stack>
							<_.TitleBox>제출서류</_.TitleBox>
							<_.ContentBox width={90}>
								<_.CustomInput
									width={100}
									type="string"
									placeholder="제출서류"
									style={{ paddingRight: '60px' }}
									value={submit_document}
									name="submit_document"
									onChange={recruitmentFormDetailInfohandler}
								/>
							</_.ContentBox>
						</_.Stack>
						<_.Stack>
							<_.TitleBox height={200}>기타사항</_.TitleBox>
							<_.ContentBox
								height={200}
								width={90}
								longText={true}
							>
								<_.Textarea
									height={135}
									name="etc"
									placeholder="기타사항"
									value={etc!}
									onChange={recruitmentFormDetailInfohandler}
								/>
							</_.ContentBox>
						</_.Stack>
					</_.Stack>
				</_.Stack>
			</_.Stack>
			{recruitmentFormDetail.winter_intern ? (
				<_.Stack>
					<_.TitleBox width={21.2}>현장실습 연계 계획</_.TitleBox>
					<_.ContentBox width={90}>
						<Stack direction="column">
							<Stack gap={5}>
								<RadioButton
									name="integration_plan"
									onClick={() => {
										setRecruitmentFormDetailInfo(
											(recruitmentFormDetailInfo) => ({
												...recruitmentFormDetailInfo,
												integration_plan: true,
											})
										);
									}}
									checked={integration_plan === true}
								/>
								있음
							</Stack>
							<Stack gap={5}>
								<RadioButton
									name="integration_plan"
									onClick={() => {
										setRecruitmentFormDetailInfo(
											(recruitmentFormDetailInfo) => ({
												...recruitmentFormDetailInfo,
												integration_plan: false,
											})
										);
									}}
									checked={integration_plan === false}
								/>
								없음
							</Stack>
						</Stack>
					</_.ContentBox>
				</_.Stack>
			) : (
				<_.Stack>
					<_.TitleBox>채용 전환</_.TitleBox>
					<_.ContentBox width={20}>
						<Stack direction="column">
							<Stack gap={5}>
								<RadioButton
									name="hire_convertible"
									onClick={() => {
										setRecruitmentFormDetailInfo(
											(recruitmentFormDetailInfo) => ({
												...recruitmentFormDetailInfo,
												hire_convertible: true,
											})
										);
									}}
									checked={hire_convertible === true}
								/>
								가능
							</Stack>
							<Stack gap={5}>
								<RadioButton
									name="hire_convertible"
									onClick={() => {
										setRecruitmentFormDetailInfo(
											(recruitmentFormDetailInfo) => ({
												...recruitmentFormDetailInfo,
												hire_convertible: false,
											})
										);
									}}
									checked={hire_convertible === false}
								/>
								불가능
							</Stack>
						</Stack>
					</_.ContentBox>
				</_.Stack>
			)}
		</_.Container>
	);
}
