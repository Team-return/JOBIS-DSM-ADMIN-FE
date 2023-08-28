import {
	Button,
	CheckBox,
	Table,
	useToastStore,
} from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction, useState } from 'react';
import { RecruitmentFormResponse } from '../../../Apis/Recruitments/response';
import { Pagination } from '../../../Utils/Pagination';
import { RecruitmentFormQueryStringType } from '../../../Apis/Recruitments/request';
import { useChangeRecruitmentsStatus } from '../../../Apis/Recruitments/index';
import { companyStatus, companyType } from '../../../Utils/Translation';
import { getValueByKey } from '../../../Utils/useGetPropertyKey';
import { searchInArray } from '../../../Utils/useSearchForArray';
import { Link } from 'react-router-dom';

interface PropsType {
	recruitmentForm: RecruitmentFormResponse;
	refetchRecruitmentForm: () => void;
	allSelectFormId: string[];
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType;
	setSearchRecruitmentFormQueryString: Dispatch<
		SetStateAction<RecruitmentFormQueryStringType>
	>;
	recruitmentFormIsLoading: boolean;
}

export function RecruitmentFormTable({
	recruitmentForm,
	refetchRecruitmentForm,
	allSelectFormId,
	searchRecruitmentFormQueryString,
	setSearchRecruitmentFormQueryString,
	recruitmentFormIsLoading,
}: PropsType) {
	const { append } = useToastStore();

	/** 지원서 length입니다. */
	const dataLength = recruitmentForm?.recruitments.length;
	const [clickedData, setClickedData] = useState<string[]>([]);
	const [changeStatus, setChangeStatus] = useState<string>('');

	/** 지원서 상태를 변경하는 api를 호출합니다. */
	const changeStatusAPI = useChangeRecruitmentsStatus(
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
	const { isLoading } = changeStatusAPI;

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
		setTimeout(() => changeStatusAPI.mutate());
	};

	/** 로딩할 때 보여줄 빈 테이블입니다. */
	const loadingTableDataArray = Array.from({ length: 11 }, () => [
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
	const emptyTableDataArray = Array.from({ length: 11 - dataLength }, () => [
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
			const job = recruitment.recruitment_job.split(',').join(' / ');
			const clickCheckBox = () => {
				if (clickedData.includes(recruitment.id)) {
					setClickedData(
						clickedData.filter(
							(clickedDataId) => clickedDataId !== recruitment.id
						)
					);
				} else {
					setClickedData([...clickedData, recruitment.id]);
				}
			};

			/** 팝업창을 띄워줄 함수입니다.. */
			const openApplicationCountPage = (requested: boolean) => {
				if (requested) {
					window.open(
						`/RecruitmentRequestPopup?id=${recruitment.id}`,
						'_blank',
						'resizable=no,width=570,height=830,left=50,top=50'
					);
				} else {
					window.open(
						`ApplicationPopup?id=${recruitment.id}`,
						'_blank',
						'resizable=no,width=570,height=830,left=50,top=50'
					);
				}
			};
			return [
				<CheckBox
					checked={clickedData.includes(recruitment.id)}
					onChange={clickCheckBox}
				/>,
				<_.ContentText status={recruitment.recruitment_status}>
					{getValueByKey(
						companyStatus,
						recruitment.recruitment_status
					)}
				</_.ContentText>, // 상태
				<Link to={`/RecruitmentRequest/${recruitment.id}`}>
					<_.ContentText click={1}>
						{recruitment.company_name}
					</_.ContentText>
				</Link>, // 회사 이름
				<_.ContentText>{job}</_.ContentText>, // 채용 직군
				<_.ContentText>
					{companyType[recruitment.company_type]}
				</_.ContentText>, // 구분
				<_.ContentText>
					{recruitment.recruitment_count}명
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
				<_.ContentText>{recruitment.start}</_.ContentText>, // 모집 시작 날짜
				<_.ContentText>{recruitment.end}</_.ContentText>, // 모집 종료 날짜
			];
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
			<_.BtnWrapper>
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
				page={recruitmentForm?.total_page_count}
				data={searchRecruitmentFormQueryString}
				setData={setSearchRecruitmentFormQueryString}
				refetch={refetchRecruitmentForm}
			/>
		</_.Container>
	);
}
