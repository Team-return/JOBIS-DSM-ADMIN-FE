import {
	Button,
	CheckBox,
	Table,
	useToastStore,
} from '@team-return/design-system';
import * as _ from './style';
import { useState } from 'react';
import { RecruitmentFormResponse } from '../../../Apis/Recruitments/response';
import { Pagination } from '../../../Utils/Pagination';
import {
	useChangeRecruitmentsStatus,
	useRecruitmentExcel,
} from '../../../Apis/Recruitments/index';
import { companyStatus, companyType } from '../../../Utils/Translation';
import { getValueByKey } from '../../../Utils/useGetPropertyKey';
import { searchInArray } from '../../../Utils/useSearchForArray';
import { Link } from 'react-router-dom';
import { useRecruitmentFormQueryString } from '../../../Store/State';

interface PropsType {
	recruitmentForm: RecruitmentFormResponse;
	recruitmentFormPageNum: number;
	refetchRecruitmentForm: () => void;
	allSelectFormId: string[];
	recruitmentFormIsLoading: boolean;
	recreuitmentFromCount: number;
}

export function RecruitmentFormTable({
	recruitmentForm,
	recruitmentFormPageNum,
	refetchRecruitmentForm,
	allSelectFormId,
	recruitmentFormIsLoading,
	recreuitmentFromCount,
}: PropsType) {
	const { append } = useToastStore();
	const { mutate: useRecruitmentExcelMutate } = useRecruitmentExcel({
		onError: () => {
			append({
				title: '엑셀 다운로드에 실패하였습니다',
				message: '',
				type: 'RED',
			});
		},
	});

	const { recruitmentFormQueryString, setRecruitmentFormQueryString } =
		useRecruitmentFormQueryString();

	/** 지원서 length입니다. */
	const dataLength = recruitmentForm?.recruitments.length;
	const [clickedData, setClickedData] = useState<string[]>([]);
	const [changeStatus, setChangeStatus] = useState<string>('');

	/** 지원서 상태를 변경하는 api를 호출합니다. */
	const { mutate: changeStatusAPI, isLoading } = useChangeRecruitmentsStatus(
		changeStatus,
		clickedData,
		{
			onSuccess: () => {
				refetchRecruitmentForm();
				setClickedData([]);
				append({
					title: '성공적으로 변경되었습니다.',
					message: '',
					type: 'GREEN',
				});
			},
			onError: () => {
				append({
					title: '변경에 실패했습니다.',
					message: '',
					type: 'RED',
				});
			},
		}
	);

	/** 전체 선택 & 전체 선택 해제를 하는 함수입니다. */
	const checkAllBox = () => {
		if (searchInArray(allSelectFormId, clickedData).length === dataLength) {
			setClickedData(
				clickedData.filter((data) => !allSelectFormId.includes(data))
			);
		} else {
			setClickedData((datas) => [
				...datas,
				...allSelectFormId.filter((data) => !datas.includes(data)),
			]);
		}
	};

	/** 상태 변경 버튼을 눌렀을 때 실행할 함수입니다. */
	const changeStatusBtnClick = (statusName: string) => {
		setChangeStatus(statusName);
		setTimeout(changeStatusAPI);
	};

	/** 로딩할 때 보여줄 빈 테이블입니다. */
	const loadingTableDataArray = Array.from({ length: 10 }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
	]);

	/** 데이터 테이블 아래 보여줄 빈 테이블입니다. */
	const emptyTableDataArray = Array.from({ length: 10 - dataLength }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
	]);

	/** 데이터 테이블입니다. */
	const tableAllDatas: JSX.Element[][] = recruitmentForm?.recruitments
		.map((recruitment) => {
			const job = recruitment.hiring_jobs.split(',').join(' / ');
			const clickCheckBox = () => {
				if (clickedData.includes(recruitment.id.toString())) {
					setClickedData(
						clickedData.filter(
							(clickedDataId) =>
								clickedDataId !== recruitment.id.toString()
						)
					);
				} else {
					setClickedData([...clickedData, recruitment.id.toString()]);
				}
			};

			/** 팝업창을 띄워줄 함수입니다.. */

			const openApplicationCountPage = (requested: boolean) => {
				if (requested) {
					window.open(
						`/RecruitmentRequestPopup?id=${recruitment.id}&winterIntern=${recruitmentFormQueryString.winter_intern}`,
						'_blank',
						'resizable=no,width=570,height=830,left=50,top=50'
					);
				} else {
					window.open(
						`ApplicationPopup?id=${recruitment.id}&winterIntern=${recruitmentFormQueryString.winter_intern}`,
						'_blank',
						'resizable=no,width=570,height=830,left=50,top=50'
					);
				}
			};
			return [
				<CheckBox
					checked={clickedData.includes(recruitment.id.toString())}
					onChange={clickCheckBox}
				/>,
				<_.ContentText status={recruitment.status}>
					{getValueByKey(companyStatus, recruitment.status)}
				</_.ContentText>, // 상태
				<Link to={`/Company/${recruitment.company_id}`}>
					<_.ContentText click={1}>
						{recruitment.company_name}
					</_.ContentText>
				</Link>, // 회사 이름
				<Link to={`/RecruitmentRequest/${recruitment.id}`}>
					<_.ContentText click={1}>{job}</_.ContentText>
				</Link>, // 채용 직군
				<_.ContentText>
					{companyType[recruitment.company_type]}
				</_.ContentText>, // 구분
				<_.ContentText>
					{recruitment.total_hiring_count}명
				</_.ContentText>, // 모집 인원 수
				<_.ContentText
					onClick={() =>
						recruitment.application_requested_count &&
						openApplicationCountPage(true)
					}
					click={recruitment.application_requested_count}
				>
					{recruitment.application_requested_count}명
				</_.ContentText>, // 지원 요청 수
				<_.ContentText
					onClick={() =>
						recruitment.application_approved_count &&
						openApplicationCountPage(false)
					}
					click={recruitment.application_approved_count}
				>
					{recruitment.application_approved_count}명
				</_.ContentText>, // 지원자 수
			].concat(
				recruitment.start_date
					? [
							<_.ContentText>
								{recruitment.start_date}
							</_.ContentText>, // 모집 시작 날짜
							<_.ContentText>
								{recruitment.end_date}
							</_.ContentText>, // 모집 종료 날짜
					  ]
					: [
							<_.ContentText>상시모집</_.ContentText>,
							<_.ContentText>상시모집</_.ContentText>,
					  ]
			);
		})
		.concat(emptyTableDataArray);

	/** 테이블의 title입니다. */
	const tableTitle: JSX.Element[] = [
		<CheckBox
			disabled={!(recruitmentForm?.recruitments.length !== 0)}
			checked={
				clickedData.length !== 0 &&
				searchInArray(allSelectFormId, clickedData).length ===
					dataLength
			}
			onChange={checkAllBox}
		/>,
		<_.TitleText>상태</_.TitleText>,
		<_.TitleText>기업명</_.TitleText>,
		<_.TitleText>채용직군</_.TitleText>,
		<_.TitleText>구분</_.TitleText>,
		<_.TitleText>모집인원</_.TitleText>,
		<_.TitleText>지원요청</_.TitleText>,
		<_.TitleText>지원자</_.TitleText>,
		<_.TitleText>모집시작일</_.TitleText>,
		<_.TitleText>모집종료일</_.TitleText>,
	];

	/** 테이블의 width입니다. */
	const tableWidth: number[] = [3, 7, 18, 30, 6, 6, 6, 6, 10, 10];

	const buttonDisabled = isLoading || clickedData.length === 0;

	return (
		<_.Container>
			<_.BtnContentWrapper>
				<_.CountTitle>
					총 <_.CountContent>{recreuitmentFromCount}</_.CountContent>개
				</_.CountTitle>
				<_.BtnWrapper>
					<Button size="S" onClick={useRecruitmentExcelMutate}>
						엑셀출력
					</Button>
					<Button
						kind="Ghost"
						size="S"
						disabled={buttonDisabled}
						onClick={() => {
							changeStatusBtnClick('READY');
						}}
					>
						접수
					</Button>
					<Button
						kind="Ghost"
						size="S"
						disabled={buttonDisabled}
						onClick={() => {
							changeStatusBtnClick('RECRUITING');
						}}
					>
						모집중
					</Button>
					<Button
						kind="Ghost"
						size="S"
						disabled={buttonDisabled}
						onClick={() => {
							changeStatusBtnClick('DONE');
						}}
					>
						모집종료
					</Button>
				</_.BtnWrapper>
			</_.BtnContentWrapper>
			<_.TableWrapper>
				<Table
					tableData={
						recruitmentFormIsLoading
							? loadingTableDataArray
							: tableAllDatas
					}
					title={tableTitle}
					width={tableWidth}
				/>
			</_.TableWrapper>
			<Pagination
				page={recruitmentFormPageNum!}
				data={recruitmentFormQueryString}
				setData={setRecruitmentFormQueryString}
				refetch={refetchRecruitmentForm}
			/>
		</_.Container>
	);
}
