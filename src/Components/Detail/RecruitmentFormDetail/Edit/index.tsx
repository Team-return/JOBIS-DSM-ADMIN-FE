import {
	Button,
	Icon,
	RadioButton,
	Stack,
	useToastStore,
} from '@team-return/design-system';
import { RecruitmentFormDetailResponse } from '../../../../Apis/Recruitments/response';
import { hiringProgress } from '../../../../Utils/Translation';
import * as _ from '../../style';
import { Dispatch, SetStateAction, useState } from 'react';
import { useModalContext } from '../../../../Utils/Modal';
import { GatherModal } from '../../../Modal/RecruitmentModal';
import { DeleteRecruitmentModal } from '../../../Modal/DeleteRecruitmentModal';
import {
	useDeleteArea,
	useEditRecruitment,
} from '../../../../Apis/Recruitments';
import { useParams } from 'react-router-dom';
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
	const { append } = useToastStore();
	const params = useParams();
	const { openModal, closeModal } = useModalContext();

	const {
		form: recruitmentFormDetailInfo,
		setForm: setRecruitmentFormDetailInfo,
		handleChange: recruitmentFormDetailInfohandler,
	} = useForm<EditRecruitmentRequest>({
		preferential_treatment: recruitmentFormDetail?.preferential_treatment,
		required_grade: recruitmentFormDetail?.required_grade,
		required_licenses: recruitmentFormDetail?.required_licenses,
		work_hours: recruitmentFormDetail?.work_hours,
		train_pay: recruitmentFormDetail?.train_pay,
		pay: recruitmentFormDetail?.pay,
		benefits: recruitmentFormDetail?.benefits,
		military: recruitmentFormDetail?.military,
		hiring_progress: recruitmentFormDetail?.hiring_progress,
		submit_document: recruitmentFormDetail?.submit_document,
		start_date: recruitmentFormDetail?.start_date,
		end_date: recruitmentFormDetail?.end_date,
		etc: recruitmentFormDetail?.etc,
	});

	const {
		preferential_treatment,
		required_grade,
		required_licenses,
		work_hours,
		train_pay,
		pay,
		benefits,
		military,
		hiring_progress,
		submit_document,
		start_date,
		end_date,
		etc,
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

	const { mutate: editRecruitmentFormDetail } = useEditRecruitment(
		params.id!,
		recruitmentFormDetailInfo,
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
				<_.LogoWrapper>
					<_.CompanyLogo
						src={`${process.env.REACT_APP_FILE_URL}${recruitmentFormDetail?.company_profile_url}`}
					/>
				</_.LogoWrapper>
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
				<_.TitleBox>기업명</_.TitleBox>
				<_.ContentBox width={40}>
					<_.CustomInput
						width={100}
						type="text"
						className="companyName"
						value={recruitmentFormDetail?.company_name}
						disabled={true}
					/>
				</_.ContentBox>
				<_.TitleBox>모집기간</_.TitleBox>
				<_.ContentBox width={40}>
					<_.CustomInput
						width={100}
						type="date"
						value={start_date}
						name="start_date"
						onChange={recruitmentFormDetailInfohandler}
					/>
					<span style={{ margin: '0 10px' }}>~</span>
					<_.CustomInput
						width={100}
						type="date"
						value={end_date}
						name="end_date"
						onChange={recruitmentFormDetailInfohandler}
					/>
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
											{area.job.join(' / ')}
										</_.ContentBox>
										<_.TitleBox height={125}>
											사용기술
										</_.TitleBox>
										<_.ContentBox
											height={125}
											width={
												recruitmentFormDetail?.areas
													.length === 1
													? 34
													: 28
											}
											overflow="scroll"
											longText={true}
										>
											{area.tech.join(' / ')}
										</_.ContentBox>
										{recruitmentFormDetail?.areas.length !==
											1 && (
											<_.TitleBox
												height={125}
												width={6}
												style={{ cursor: 'pointer' }}
												onClick={() => {
													openModal({
														children: (
															<DeleteRecruitmentModal />
														),
														onSubmit: () => {
															setAreaId(area.id);
															setTimeout(
																deleteArea
															);
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
											height={125}
											width={6}
											style={{ cursor: 'pointer' }}
											onClick={() => {
												openModal({
													children: (
														<GatherModal
															recruitmentId={
																params.id!
															}
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
									<_.Stack>
										<_.TitleBox height={200}>
											주요업무
										</_.TitleBox>
										<_.ContentBox
											height={200}
											width={90}
											longText={true}
											overflow="scroll"
										>
											{area.major_task}
										</_.ContentBox>
									</_.Stack>
								</_.Stack>
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
				<_.TitleBox height={275}>자격요건</_.TitleBox>
				<_.Stack flexDirection="column" width={90}>
					<_.Stack flexDirection="column" width={100}>
						<_.Stack>
							<_.TitleBox>국가자격증</_.TitleBox>
							<_.ContentBox
								width={54}
								longText={true}
								overflow="scroll"
							>
								{required_licenses.length
									? required_licenses.join(', ')
									: '-'}
							</_.ContentBox>
							<_.TitleBox
								width={6}
								style={{ cursor: 'pointer' }}
								onClick={openEditRequiredLicensesModal}
							>
								<Icon
									icon="EditPencil"
									size={30}
									color="gray70"
								/>
							</_.TitleBox>
							<_.TitleBox>성적</_.TitleBox>
							<_.ContentBox width={20}>
								<_.CustomInput
									width={100}
									type="number"
									max={100}
									placeholder="성적"
									style={{ paddingRight: '50px' }}
									value={required_grade!}
									name="required_grade"
									onChange={recruitmentFormDetailInfohandler}
								/>
								<_.AbsoluteText right={50}>%</_.AbsoluteText>
							</_.ContentBox>
						</_.Stack>
						<_.Stack>
							<_.TitleBox height={200}>우대사항</_.TitleBox>
							<_.ContentBox
								height={200}
								width={90}
								longText={true}
							>
								<_.Textarea
									height={135}
									placeholder="우대사항"
									name="preferential_treatment"
									value={preferential_treatment}
									onChange={recruitmentFormDetailInfohandler}
								/>
							</_.ContentBox>
						</_.Stack>
					</_.Stack>
				</_.Stack>
			</_.Stack>
			<_.Stack>
				<_.TitleBox height={275}>근무조건</_.TitleBox>
				<_.Stack flexDirection="column" width={90}>
					<_.Stack flexDirection="column" width={100}>
						<_.Stack>
							<_.TitleBox>근무시간</_.TitleBox>
							<_.ContentBox width={23}>
								<_.CustomInput
									width={100}
									type="number"
									placeholder="근무시간"
									style={{ paddingRight: '60px' }}
									value={work_hours}
									name="work_hours"
									onChange={recruitmentFormDetailInfohandler}
								/>
								<_.AbsoluteText right={50}>시간</_.AbsoluteText>
							</_.ContentBox>
							<_.TitleBox>실습수당</_.TitleBox>
							<_.ContentBox width={23}>
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
									만원/월
								</_.AbsoluteText>
							</_.ContentBox>
							<_.TitleBox>
								정규직
								<br />
								전환 시 연봉
							</_.TitleBox>
							<_.ContentBox width={24}>
								<_.CustomInput
									width={100}
									type="number"
									placeholder="정규직 전환 시 연봉"
									style={{ paddingRight: '70px' }}
									value={pay}
									name="pay"
									onChange={recruitmentFormDetailInfohandler}
								/>
								<_.AbsoluteText right={42}>
									만원/년
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
							<_.TitleBox>병역특례</_.TitleBox>
							<_.ContentBox width={20}>
								<Stack direction="column">
									<Stack gap={5}>
										<RadioButton
											name="military"
											onClick={() => {
												setRecruitmentFormDetailInfo(
													(
														recruitmentFormDetailInfo
													) => ({
														...recruitmentFormDetailInfo,
														military: true,
													})
												);
											}}
											checked={military === true}
										/>
										가능
									</Stack>
									<Stack gap={5}>
										<RadioButton
											name="military"
											onClick={() => {
												setRecruitmentFormDetailInfo(
													(
														recruitmentFormDetailInfo
													) => ({
														...recruitmentFormDetailInfo,
														military: false,
													})
												);
											}}
											checked={military === false}
										/>
										불가능
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
		</_.Container>
	);
}
