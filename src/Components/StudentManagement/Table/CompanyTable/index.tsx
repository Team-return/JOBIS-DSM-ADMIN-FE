import { RadioButton, Table } from '@team-return/design-system';
import * as _ from '../style';

import { EmployableCompaniesResponse } from '../../../../Apis/Companies/response';
import { Dispatch, SetStateAction } from 'react';
import { Pagination } from '../../../../Utils/Pagination';

interface PropType {
	page: { page: number };
	setPage: Dispatch<SetStateAction<{ page: number }>>;
	setSelectCompany: Dispatch<SetStateAction<number>>;
	employableCompanies: EmployableCompaniesResponse;
	isLoading: boolean;
	refetchCombinedStudentList: () => void;
	refetchEmployableCompanies: () => void;
}

export function CompanyTable({
	page,
	setPage,
	setSelectCompany,
	employableCompanies,
	isLoading,
	refetchCombinedStudentList,
	refetchEmployableCompanies,
}: PropType) {
	/** 학생 데이터의 length를 계산한 값입니다. */
	const dataLength = employableCompanies?.companies.length;

	/** 로딩할 때 보여줄 빈 테이블입니다. */
	const loadingTableDataArray = Array.from({ length: 13 }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
	]);

	/** 데이터 테이블 아래 보여줄 빈 테이블입니다. */
	const emptyTableDataArray = Array.from({ length: 13 - dataLength }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
	]);

	/** 데이터 테이블입니다. */
	const tableAllDatas: JSX.Element[][] = employableCompanies?.companies
		.map((company) => {
			return [
				<RadioButton
					onClick={() => {
						setSelectCompany(company.company_id);
						refetchCombinedStudentList();
					}}
					name="company"
				/>,
				<_.ContentText>{company.company_name}</_.ContentText>, // 기업명
				<_.ContentText>
					{company.field_trainee_count
						? company.field_trainee_count
						: '-'}
				</_.ContentText>, // 현장 실습
				<_.ContentText>
					{company.contract_count ? company.contract_count : '-'}
				</_.ContentText>, // 근로 계약
			];
		})
		.concat(emptyTableDataArray);

	/** 테이블의 title입니다. */
	const tableTitle: JSX.Element[] = [
		<RadioButton disabled={true}></RadioButton>,
		<_.TitleText>기업명</_.TitleText>,
		<_.TitleText>
			현장
			<br />
			실습
		</_.TitleText>,
		<_.TitleText>
			근로
			<br />
			계약
		</_.TitleText>,
	];

	/** 테이블의 width입니다. */
	const tableWidth: number[] = [12, 48, 20, 20];

	return (
		<_.Container>
			<_.TitleText>기업목록</_.TitleText>
			<_.TableWrapper>
				<Table
					tableData={
						isLoading ? loadingTableDataArray : tableAllDatas
					}
					title={tableTitle}
					width={tableWidth}
				/>
				<Pagination
					page={employableCompanies?.total_page_count}
					data={page}
					setData={setPage}
					refetch={refetchEmployableCompanies}
				/>
			</_.TableWrapper>
		</_.Container>
	);
}
