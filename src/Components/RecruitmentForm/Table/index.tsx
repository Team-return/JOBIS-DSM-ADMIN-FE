import { Button, CheckBox, Table } from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction, useState } from 'react';
import { RecruitmentFormResponse } from '../../../Apis/Recruitments/response';
import { Pagination } from '../../../Utils/Pagination';
import { RecruitmentFormQueryStringType } from '../../../Apis/Recruitments/request';
import { useChangeRecruitmentsStatus } from '../../../Apis/Recruitments/index';
import { getPropertyValue } from '../../../Hooks/useGetPropertyValue';
import { companyTypeEngToKor } from '../../../Utils/Translation';

interface PropsType {
	recruitmentForm: RecruitmentFormResponse;
	refetchRecruitmentForm: () => void;
	AllSelectFormId: string[];
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType;
	setSearchRecruitmentFormQueryString: Dispatch<SetStateAction<RecruitmentFormQueryStringType>>;
	recruitmentFormIsLoading: boolean;
}

export function RecruitmentFormTable({
	recruitmentForm,
	refetchRecruitmentForm,
	AllSelectFormId,
	searchRecruitmentFormQueryString,
	setSearchRecruitmentFormQueryString,
	recruitmentFormIsLoading,
}: PropsType) {
	const dataLength = recruitmentForm?.recruitments.length;
	const [clickedData, setClickedData] = useState<string[]>([]);
	const [changeStatus, setChangeStatus] = useState<string>('');
	const companyStatus = {
		READY: '모집전',
		RECRUITING: '모집중',
		DONE: '종료',
		REQUESTED: '접수요청',
	};

	const changeStatusAPI = useChangeRecruitmentsStatus(changeStatus, clickedData, {
		onSuccess: () => {
			refetchRecruitmentForm();
			setClickedData([]);
			alert('썽공');
		},
	});
	const { isLoading } = changeStatusAPI;

	const checkAllBox = () => {
		if (clickedData.length === dataLength) {
			setClickedData([]);
		} else {
			setClickedData(AllSelectFormId);
		}
	};

	const changeStatusBtnClick = (statusName: string) => {
		setChangeStatus(statusName);
		setTimeout(() => changeStatusAPI.mutate());
	};

	const loadingTableDataArray = Array.from({ length: 11 }, () => [<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>]);
	const emptyTableDataArray = Array.from({ length: 11 - (dataLength % 11) }, () => [<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>]);
	const tableAllDatas: JSX.Element[][] = recruitmentForm?.recruitments
		.map((recruitment) => {
			const job = recruitment.recruitment_job.join(' / ').split(',').join(' / ');
			const clickCheckBox = () => {
				if (clickedData.includes(recruitment.id)) {
					setClickedData(clickedData.filter((clickedDataId) => clickedDataId !== recruitment.id));
				} else {
					setClickedData([...clickedData, recruitment.id]);
				}
			};

			const openApplicationCountPage = (requested: boolean) => {
				if (requested) {
					window.open(`/RecruitmentRequestPopup?id=${recruitment.id}`, '_blank', 'resizable=no,width=570,height=830,left=50,top=50');
				} else {
					window.open(`ApplicationPopup?id=${recruitment.id}`, '_blank', 'resizable=no,width=570,height=830,left=50,top=50');
				}
			};
			return [
				<CheckBox checked={clickedData.includes(recruitment.id)} onClick={clickCheckBox} onChange={() => {}} />,
				<_.ContentText status={recruitment.recruitment_status}>{getPropertyValue(companyStatus, recruitment.recruitment_status)}</_.ContentText>, // 상태
				<_.ContentText>{recruitment.company_name}</_.ContentText>, // 회사 이름
				<_.ContentText>{job}</_.ContentText>, // 채용 직군
				<_.ContentText>{getPropertyValue(companyTypeEngToKor, recruitment.company_type)}</_.ContentText>, // 구분
				<_.ContentText>{recruitment.recruitment_count}명</_.ContentText>, // 모집 인원 수
				<_.ContentText onClick={() => recruitment.application_requested_count && openApplicationCountPage(true)} click={recruitment.application_requested_count}>
					{recruitment.application_requested_count}명
				</_.ContentText>, // 지원 요청 수
				<_.ContentText onClick={() => recruitment.application_approved_count && openApplicationCountPage(false)} click={recruitment.application_approved_count}>
					{recruitment.application_approved_count}명
				</_.ContentText>, // 지원자 수
				<_.ContentText>{recruitment.start}</_.ContentText>, // 모집 시작 날짜
				<_.ContentText>{recruitment.end}</_.ContentText>, // 모집 종료 날짜
			];
		})
		.concat(emptyTableDataArray);

	const tableTitle: JSX.Element[] = [
		<CheckBox disabled={!(recruitmentForm?.recruitments.length !== 0)} checked={clickedData.length !== 0 && clickedData.length === dataLength} onChange={checkAllBox} />,
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
				<Table tableData={recruitmentFormIsLoading ? loadingTableDataArray : tableAllDatas} title={tableTitle} width={tableWidth} />
			</_.TableWrapper>
			<Pagination total={100} limit={10} data={searchRecruitmentFormQueryString} setData={setSearchRecruitmentFormQueryString} refetch={refetchRecruitmentForm} />
		</_.Container>
	);
}
