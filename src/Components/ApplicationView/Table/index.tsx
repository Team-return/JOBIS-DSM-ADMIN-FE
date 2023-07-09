import {
	Button,
	CheckBox,
	Icon,
	Stack,
	Table,
} from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction, useState } from 'react';
import { Pagination } from '../../../Utils/Pagination';
import { ApplicationResponse } from '../../../Apis/Applications/response';
import { ApplicantInfoQueryStringType } from '../../../Apis/Applications/request';
import { DownloadDataPropsType } from '../../../Apis/FileDownload/request';
import { useDownloadData } from '../../../Apis/FileDownload';
import { useModalContext } from '../../../Utils/Modal';
import {
	useChangeRequestStatus,
	useRejectApplication,
} from '../../../Apis/Applications';
import { useForm } from '../../../Hooks/useForm';
import {
	applicationStatus,
	applicationStatusTextColor,
} from '../../../Utils/Translation';
import { ChangeStatusModal } from '../../Modal/ChangeStatusModal';
import { RejectApplicationModal } from '../../Modal/RejectApplicationModal';
import { ChangeTrainDateModal } from '../../Modal/ChangeTrainDateModal';
import { useDidMountEffect } from '../../../Hooks/useDidMountEffect';
import OutsideClickHandler from 'react-outside-click-handler';
import { useChangeStudentFieldTrain } from '../../../Apis/Acceptances';
import { searchInArray } from '../../../Hooks/useSearchForArray';

interface PropsType {
	application: ApplicationResponse;
	refetchApplication: () => void;
	allSelectFormId: number[];
	searchQueryString: ApplicantInfoQueryStringType;
	setSearchQueryString: Dispatch<
		SetStateAction<ApplicantInfoQueryStringType>
	>;
	applicationIsLoading: boolean;
	allSelectStudent: string[];
}

export function ApplicationViewTable({
	application,
	refetchApplication,
	allSelectFormId,
	searchQueryString,
	setSearchQueryString,
	applicationIsLoading,
	allSelectStudent,
}: PropsType) {
	const dataLength = application?.applications.length;
	const { openModal, closeModal } = useModalContext();
	const [clickedData, setClickedData] = useState<number[]>([]);
	const [clickStudentName, setClickStudentName] = useState<string[]>([]);
	const [changeStatus, setChangeStatus] = useState<string>('');
	const [downloadBoxView, setDownloadBoxView] = useState<number>(0);
	const [rejectReason, setRejectReason] = useState('');
	const { form: trainDate, handleChange: trainDateChange } = useForm({
		start_date: '',
		end_date: '',
	});
	const [downloadUrl, setDownloadUrl] = useState<DownloadDataPropsType>({
		fileUrl: '',
		fileName: '',
	});

	/** 전체 선택 & 전체 선택 해제를 하는 함수입니다. */
	const checkAllBox = () => {
		if (searchInArray(allSelectFormId, clickedData).length === dataLength) {
			setClickedData(
				clickedData.filter((data) => !allSelectFormId.includes(data))
			); // 선택된 학생의 id를 추가하는 부분입니다.
			setClickStudentName(
				clickStudentName.filter(
					(name) => !allSelectStudent.includes(name)
				)
			); // 선택된 학생의 이름을 추가하는 부분입니다.
		} else {
			setClickedData((datas) => [
				...datas,
				...allSelectFormId.filter((data) => !datas.includes(data)),
			]); // 선택 취소된 학생의 id를 삭제하는 부분입니다.
			setClickStudentName((names) => [
				...names,
				...allSelectStudent.filter((data) => !names.includes(data)),
			]); // 선택 취소된 학생의 이름을 삭제하는 부분입니다.
		}
	};

	/** 지원상태를 변경하는 api호출 함수입니다. */
	const changeStatusAPI = useChangeRequestStatus(clickedData, changeStatus, {
		onSuccess: () => {
			refetchApplication();
			setClickedData([]);
			closeModal();
			alert('성공적으로 변경되었습니다.');
		},
		onError: () => {
			alert('변경에 실패했습니다.');
		},
	});
	const { isLoading: requestStatusIsLoading } = changeStatusAPI;

	/** 지원서 상태 변경할 때 확인하는 확인 모달을 여는 함수입니다. */
	const openChangeStatusModal = (statusName: string) => {
		openModal({
			children: (
				<ChangeStatusModal
					clickedData={clickedData}
					clickStudentName={clickStudentName}
					statusName={statusName}
				/>
			),
			onSubmit: () => {
				setChangeStatus(statusName);
				setTimeout(changeStatusAPI.mutate);
			},
			onCancel: () => {
				closeModal();
			},
		});
	};

	/** 지원서를 반환하는 api를 호출합니다. */
	const rejectApplicationAPI = useRejectApplication(
		clickedData[0],
		rejectReason,
		{
			onSuccess: () => {
				refetchApplication();
				setClickedData([]);
				closeModal();
				alert('반려에 성공했습니다.');
			},
			onError: () => {
				alert('반려에 실패했습니다.');
			},
		}
	);
	const { isLoading: RejectApplicationIsLoading } = changeStatusAPI;

	/** 지원서를 반환할 때 확인하는 확인 모달을 여는 함수입니다. */
	const openRejectApplicationModal = () => {
		openModal({
			children: (
				<RejectApplicationModal
					clickedData={clickedData}
					clickStudentName={clickStudentName}
					setRejectReason={setRejectReason}
				/>
			),
			onSubmit: () => {
				setTimeout(rejectApplicationAPI.mutate);
			},
			onCancel: () => {
				closeModal();
			},
		});
	};

	/** 현장실습 날짜를 바꾸는 api를 호출합입니다. */
	const changeTrainDateAPI = useChangeStudentFieldTrain(
		clickedData,
		trainDate.start_date,
		trainDate.end_date,
		{
			onSuccess: () => {
				refetchApplication();
				setClickedData([]);
				closeModal();
				alert('성공적으로 변경되었습니다.');
			},
			onError: () => {
				alert('변경에 실패했습니다.');
			},
		}
	);
	const { isLoading: trainDateIsLoading } = changeStatusAPI;

	/** 지원서를 현장실습으로 바꿀 때 확인하는 확인모달을 여는 함수입니다. */
	const openChangeTrainDateModal = () => {
		openModal({
			children: (
				<ChangeTrainDateModal
					clickedData={clickedData}
					clickStudentName={clickStudentName}
					trainDateChange={trainDateChange}
					trainDate={trainDate}
				/>
			),
			onSubmit: () => {
				setTimeout(changeTrainDateAPI.mutate);
			},
			onCancel: () => {
				closeModal();
			},
		});
	};

	/** 현장실습 input값을 계속 업데이트하기 위한 useDidMountEffect 호출입니다. */
	useDidMountEffect(() => {
		openChangeTrainDateModal();
	}, [trainDate.end_date, trainDate.start_date]);

	const { mutate: downloadStudentForm } = useDownloadData(downloadUrl);

	/** 파일 다운로드하는 api를 호출합입니다. */
	const fileDownloadAPI = (url: string, name: string) => {
		setDownloadUrl({
			fileUrl: url,
			fileName: name,
		});
		setTimeout(downloadStudentForm);
	};

	/** 데이터를 가져올 때 보여줄 빈 테이블입니다. */
	const loadingTableDataArray = Array.from({ length: 11 }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
	]);
	/** 남은 테이블 자리를 채워줄 빈 테이블입니다. */
	const emptyTableDataArray = Array.from(
		{ length: 11 - (dataLength % 11) },
		() => [<></>, <></>, <></>, <></>, <></>, <></>, <></>]
	);
	/** 데이터로 채운 테이블입니다. */
	const tableAllDatas: JSX.Element[][] = application?.applications
		.map((application) => {
			const clickCheckBox = () => {
				if (clickedData.includes(application.application_id)) {
					setClickedData(
						clickedData.filter(
							(clickedDataId) =>
								clickedDataId !== application.application_id
						)
					);
					setClickStudentName(
						clickStudentName.filter(
							(clickStudentNames) =>
								clickStudentNames !== application.student_name
						)
					);
				} else {
					setClickedData((datas) => [
						...datas,
						application.application_id,
					]);
					setClickStudentName((student) => [
						...student,
						application.student_name,
					]);
				}
			};

			/** 다운로드 박스를 껐다키는 함수입니다. */
			const changeDownloadBoxView = () => {
				setDownloadBoxView(
					application.application_id === downloadBoxView
						? 0
						: application.application_id
				);
			};

			/** 다운로드 박스를 끄는 함수입니다. */
			const changeDownloadBoxDown = () => {
				if (application.application_id === downloadBoxView) {
					setDownloadBoxView(0);
				}
			};

			return [
				<CheckBox
					checked={clickedData.includes(application.application_id)}
					onChange={clickCheckBox}
				/>,
				<_.ContentText
					color={
						applicationStatusTextColor[
							application.application_status
						]
					}
				>
					{applicationStatus[application.application_status]}
				</_.ContentText>, // 상태
				<_.ContentText>{application.student_gcn}</_.ContentText>, // 학법
				<_.ContentText>{application.student_name}</_.ContentText>, // 이름
				<_.ContentText>{application.company_name}</_.ContentText>, // 기업
				<_.OpenBoxWrapper>
					{application.attachments.length !== 0 ? (
						<_.UnfoldImgWrapper
							onClick={
								downloadBoxView !== application.application_id
									? changeDownloadBoxView
									: () => {}
							}
						>
							<div>
								{downloadBoxView === application.application_id
									? '닫기'
									: '펼쳐보기'}
							</div>
							<Icon
								icon="Chevron"
								color="gray60"
								direction={
									downloadBoxView ===
									application.application_id
										? 'top'
										: 'bottom'
								}
							></Icon>
						</_.UnfoldImgWrapper>
					) : (
						<_.NotingFileText>첨부파일 없음</_.NotingFileText>
					)}
					<OutsideClickHandler
						onOutsideClick={() => {
							setTimeout(changeDownloadBoxDown);
						}}
					>
						{downloadBoxView === application.application_id && (
							<_.DownLoadWrapper>
								{application.attachments.map((urls, i) => {
									const nameArray = decodeURI(urls.url).split(
										'/'
									);
									return (
										<_.FileDownloadWrapper key={i}>
											<Stack>
												<_.CountNum>{i + 1}</_.CountNum>
												<div>
													{nameArray[
														nameArray.length - 1
													].substring(37)}
												</div>
											</Stack>
											<Button
												size="S"
												onClick={() =>
													fileDownloadAPI(
														urls.url,
														nameArray[
															nameArray.length - 1
														]
													)
												}
											>
												<Icon
													icon="FileEarmarkArrowDown"
													size={16}
													color="gray10"
												/>
												다운
											</Button>
										</_.FileDownloadWrapper>
									);
								})}
							</_.DownLoadWrapper>
						)}
					</OutsideClickHandler>
				</_.OpenBoxWrapper>,
				<_.ContentText>{application.created_at}</_.ContentText>,
			];
		})
		.concat(emptyTableDataArray);

	/** 테이블 title를 설정한 값입니다. */
	const tableTitle: JSX.Element[] = [
		<CheckBox
			disabled={!(dataLength !== 0)}
			checked={
				clickedData.length !== 0 &&
				searchInArray(allSelectFormId, clickedData).length ===
					dataLength
			}
			onChange={checkAllBox}
		/>,
		<_.TitleText>상태</_.TitleText>,
		<_.TitleText>학번</_.TitleText>,
		<_.TitleText>이름</_.TitleText>,
		<_.TitleText>기업</_.TitleText>,
		<_.TitleText>첨부파일 링크</_.TitleText>,
		<_.TitleText>지원 일자</_.TitleText>,
	];
	/** 테이블 width를 설정한 값입니다. */
	const tableWidth: number[] = [4, 9, 7, 8, 12, 48, 12];

	return (
		<_.Container>
			<_.BtnWrapper>
				<Button
					kind="Ghost"
					size="S"
					onClick={() => openChangeStatusModal('APPROVED')}
					disabled={
						requestStatusIsLoading || clickedData.length === 0
					}
				>
					승인
				</Button>
				<Button
					kind="Ghost"
					size="S"
					onClick={openRejectApplicationModal}
					disabled={
						RejectApplicationIsLoading || clickedData.length !== 1
					}
				>
					반려
				</Button>
				<Button
					kind="Ghost"
					size="S"
					onClick={() => openChangeStatusModal('PASS')}
					disabled={
						requestStatusIsLoading || clickedData.length === 0
					}
				>
					합격
				</Button>
				<Button
					kind="Ghost"
					size="S"
					onClick={() => openChangeStatusModal('FAILED')}
					disabled={
						requestStatusIsLoading || clickedData.length === 0
					}
				>
					불합격
				</Button>
				<Button
					kind="Ghost"
					size="S"
					onClick={openChangeTrainDateModal}
					disabled={trainDateIsLoading || clickedData.length === 0}
				>
					현장실습
				</Button>
			</_.BtnWrapper>
			<_.TableWrapper>
				<Table
					tableData={
						applicationIsLoading
							? loadingTableDataArray
							: tableAllDatas
					}
					title={tableTitle}
					width={tableWidth}
				/>
			</_.TableWrapper>
			<Pagination
				page={application?.total_page_count}
				data={searchQueryString}
				setData={setSearchQueryString}
				refetch={refetchApplication}
			/>
		</_.Container>
	);
}
