import { Button, CheckBox, Table } from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction, useState } from 'react';
import { Pagination } from '../../../../Utils/Pagination';
import { useChangeCompanyStatus } from '../../../../Apiss/Companies';
import { dataType } from '../../../../Apiss/Companies/request';
import { CompanyRecruitmentResponse } from '../../../../Apiss/Companies/response';

interface PropsType {
	companyRecruitment: CompanyRecruitmentResponse;
	refetchCompanyRecruitment: () => void;
	AllSelectFormId: number[];
	searchQueryString: dataType;
	setSearchQueryString: Dispatch<SetStateAction<dataType>>;
}

export function CompanyRecruitmentTable({ companyRecruitment, refetchCompanyRecruitment, AllSelectFormId, searchQueryString, setSearchQueryString }: PropsType) {
	const dataLength = companyRecruitment?.companies.length;
	const [clickedData, setClickedData] = useState<number[]>([]);
	const [changeStatus, setChangeStatus] = useState<string>('');

	const CheckAllBox = () => {
		if (clickedData.length === dataLength) {
			setClickedData([]);
		} else {
			setClickedData(AllSelectFormId);
		}
	};

	const ChangeStatusAPI = useChangeCompanyStatus(changeStatus, clickedData, {
		onSuccess: () => {
			refetchCompanyRecruitment();
			setClickedData([]);
			alert('썽공');
		},
	});

	const { isLoading } = ChangeStatusAPI;

	const ChangeStatusBtnClick = (statusName: string) => {
		setChangeStatus(statusName);
		setTimeout(() => ChangeStatusAPI.mutate());
	};

	const typeChangeValue = (e: string) => {
		const companyTypeMap: { [key: string]: string } = {
			LEAD: '선도기업',
			PARTICIPATING: '참여기업',
			CONTRACTING: '협약기업',
			DEFAULT: '기본',
		};
		return companyTypeMap[e] || '';
	};

	const emptyTableDataArray = Array.from({ length: 11 - (dataLength % 11) }, () => [<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>]);
	const tableAllDatas: JSX.Element[][] = companyRecruitment?.companies
		.map((companie) => {
			const ClickCheckBox = () => {
				if (clickedData.includes(companie.company_id)) {
					setClickedData(clickedData.filter((e) => e !== companie.company_id));
				} else {
					setClickedData([...clickedData, companie.company_id]);
				}
			};

			// const openPopupPage = (requested: boolean) => {
			// 	window.open(`/RecruitmentRequestPopup?id=${companie.company_id}`, '_blank', 'companiesizable=no,width=570,height=830,left=50,top=50');
			// };

			return [
				<CheckBox checked={clickedData.includes(companie.company_id)} onChange={ClickCheckBox} />,
				<_.ContentText>{companie.company_name}</_.ContentText>, // 기업명
				<_.ContentText>{companie.region}</_.ContentText>, // 지역
				<_.ContentText>{companie.business_area}</_.ContentText>, // 사업분야
				<_.ContentText>{companie.workers_count}</_.ContentText>, // 근로자수
				<_.ContentText>{companie.sales}</_.ContentText>, // 매출액
				<_.ContentText>{typeChangeValue(companie.company_type)}</_.ContentText>, // 기업구분
				<_.ContentText>{companie.is_mou && 'Y'}</_.ContentText>, // 협약여부
				<_.ContentText>{companie.personal_contact && 'Y'}</_.ContentText>, // 개인컨택
				<_.ContentText>{companie.recent_recruit_year}년</_.ContentText>, //최근의뢰년도
				<_.ContentText>{companie.total_acceptance_count}명</_.ContentText>, // 총 취업 학생수
				<_.ContentText>{companie.review_count ? companie.review_count + `건` : ''}</_.ContentText>, // 후기등록
			];
		})
		.concat(emptyTableDataArray);

	const tableTitle: JSX.Element[] = [
		<CheckBox disabled={!(dataLength !== 0)} checked={clickedData.length !== 0 && clickedData.length === dataLength} onChange={CheckAllBox} />,
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
						ChangeStatusBtnClick('PARTICIPATING');
					}}
				>
					참여기업 등록
				</Button>
				<Button
					kind="Ghost"
					size="S"
					disabled={buttonDisabled}
					onClick={() => {
						ChangeStatusBtnClick('LEAD');
					}}
				>
					선도기업 등록
				</Button>
				<Button
					kind="Ghost"
					size="S"
					disabled={buttonDisabled}
					onClick={() => {
						ChangeStatusBtnClick('RECRUITING');
					}}
				>
					협약등록
				</Button>
			</_.BtnWrapper>
			<_.TableWrapper>
				<Table tableData={tableAllDatas} title={tableTitle} width={tableWidth} />
			</_.TableWrapper>
			<Pagination total={100} limit={10} data={searchQueryString} setData={setSearchQueryString} refetch={refetchCompanyRecruitment} />
		</_.Container>
	);
}
