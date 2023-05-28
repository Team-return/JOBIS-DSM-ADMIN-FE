import { Button, CheckBox, Table } from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction, useState } from 'react';
import { Pagination } from '../../../Utils/Pagination';
import { useChangeCompanyStatus, useChangeContractCompany } from '../../../Apis/Companies';
import { dataType } from '../../../Apis/Companies/request';
import { CompanyRecruitmentResponse } from '../../../Apis/Companies/response';
import { companyType } from '../../../Utils/Translation';

interface PropsType {
	companyRecruitment: CompanyRecruitmentResponse;
	refetchCompanyRecruitment: () => void;
	AllSelectFormId: number[];
	searchQueryString: dataType;
	setSearchQueryString: Dispatch<SetStateAction<dataType>>;
	companyRecruitmentIsLoading: boolean;
}

export function CompanyRecruitmentTable({ companyRecruitment, refetchCompanyRecruitment, AllSelectFormId, searchQueryString, setSearchQueryString, companyRecruitmentIsLoading }: PropsType) {
	const dataLength = companyRecruitment?.companies.length;
	const [clickedData, setClickedData] = useState<number[]>([]);
	const [changeStatus, setChangeStatus] = useState<string>('');

	const checkAllBox = () => {
		if (clickedData.length === dataLength) {
			setClickedData([]);
		} else {
			setClickedData(AllSelectFormId);
		}
	};

	const changeStatusAPI = useChangeCompanyStatus(changeStatus, clickedData, {
		onSuccess: () => {
			refetchCompanyRecruitment();
			setClickedData([]);
			alert('썽공');
		},
	});
	const { isLoading } = changeStatusAPI;

	const changeContractAPI = useChangeContractCompany(clickedData, {
		onSuccess: () => {
			refetchCompanyRecruitment();
			setClickedData([]);
			alert('썽공');
		},
	});

	const changeStatusBtnClick = (statusName: string) => {
		setChangeStatus(statusName);
		setTimeout(() => changeStatusAPI.mutate());
	};

	const loadingTableDataArray = Array.from({ length: 11 }, () => [<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>]);
	const emptyTableDataArray = Array.from({ length: 11 - (dataLength % 11) }, () => [<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>]);
	const tableAllDatas: JSX.Element[][] = companyRecruitment?.companies
		.map((companie) => {
			const ClickCheckBox = () => {
				if (clickedData.includes(companie.company_id)) {
					setClickedData(clickedData.filter((clickedDataId) => clickedDataId !== companie.company_id));
				} else {
					setClickedData([...clickedData, companie.company_id]);
				}
			};

			const openPopupPage = () => {
				window.open(`/ReviewSubmissionPopup?company_id=${companie.company_id}`, '_blank', 'companiesizable=no,width=670,height=830,left=50,top=50');
			};

			return [
				<CheckBox checked={clickedData.includes(companie.company_id)} onChange={ClickCheckBox} />,
				<_.ContentText>{companie.company_name}</_.ContentText>, // 기업명
				<_.ContentText>{companie.region}</_.ContentText>, // 지역
				<_.ContentText>{companie.business_area}</_.ContentText>, // 사업분야
				<_.ContentText>{companie.workers_count}</_.ContentText>, // 근로자수
				<_.ContentText>{companie.take}</_.ContentText>, // 매출액
				<_.ContentText status={companie.company_type === 'PARTICIPATING'}>{companyType[companie.company_type]}기업</_.ContentText>, // 기업구분
				<_.ContentText>{companie.convention && 'Y'}</_.ContentText>, // 협약여부
				<_.ContentText>{companie.personal_contact && 'Y'}</_.ContentText>, // 개인컨택
				<_.ContentText>{companie.recent_recruit_year ? `${companie.recent_recruit_year}년` : '없음'}</_.ContentText>, //최근의뢰년도
				<_.ContentText>{companie.total_acceptance_count}명</_.ContentText>, // 총 취업 학생수
				<_.ContentText status={true} click={true} onClick={openPopupPage}>
					{companie.review_count ? companie.review_count + `건` : ''}
				</_.ContentText>, // 후기등록
			];
		})
		.concat(emptyTableDataArray);

	const tableTitle: JSX.Element[] = [
		<CheckBox disabled={!(dataLength !== 0)} checked={clickedData.length !== 0 && clickedData.length === dataLength} onChange={checkAllBox} />,
		<_.TitleText>기업명</_.TitleText>,
		<_.TitleText>지역</_.TitleText>,
		<_.TitleText>사업분야</_.TitleText>,
		<_.TitleText>근로자수</_.TitleText>,
		<_.TitleText>
			매출액
			<br />
			(억)
		</_.TitleText>,
		<_.TitleText>기업구분</_.TitleText>,
		<_.TitleText>협약여부</_.TitleText>,
		<_.TitleText>개인컨택</_.TitleText>,
		<_.TitleText>
			최근
			<br />
			의뢰년도
		</_.TitleText>,
		<_.TitleText>
			총 취업
			<br />
			학생수
		</_.TitleText>,
		<_.TitleText>
			후기
			<br />
			등록
		</_.TitleText>,
	];
	const tableWidth: number[] = [4, 15, 6, 9, 6, 8, 9, 9, 9, 9, 8, 8];

	const buttonDisabled = isLoading || clickedData.length === 0;

	return (
		<_.Container>
			<_.BtnWrapper>
				<Button
					kind="Ghost"
					size="S"
					disabled={buttonDisabled}
					onClick={() => {
						changeStatusBtnClick('PARTICIPATING');
					}}
				>
					참여기업 등록
				</Button>
				<Button
					kind="Ghost"
					size="S"
					disabled={buttonDisabled}
					onClick={() => {
						changeStatusBtnClick('LEAD');
					}}
				>
					선도기업 등록
				</Button>
				<Button kind="Ghost" size="S" disabled={buttonDisabled} onClick={changeContractAPI.mutate}>
					협약등록
				</Button>
			</_.BtnWrapper>
			<_.TableWrapper>
				<Table tableData={companyRecruitmentIsLoading ? loadingTableDataArray : tableAllDatas} title={tableTitle} width={tableWidth} />
			</_.TableWrapper>
			<Pagination page={10} data={searchQueryString} setData={setSearchQueryString} refetch={refetchCompanyRecruitment} />
		</_.Container>
	);
}
