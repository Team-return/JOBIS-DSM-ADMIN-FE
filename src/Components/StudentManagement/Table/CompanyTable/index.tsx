import { RadioButton, Table } from '@team-return/design-system';
import * as _ from '../style';

import { EmployableCompaniesResponse } from '../../../../Apis/Companies/response';
import { Dispatch, SetStateAction } from 'react';

interface PropType {
	setSelectCompany: Dispatch<SetStateAction<number>>;
	employableCompanies: EmployableCompaniesResponse;
	isLoading: boolean;
	refetchCombinedStudentList: () => void;
}

export function CompanyTable({
	setSelectCompany,
	employableCompanies,
	isLoading,
	refetchCombinedStudentList,
}: PropType) {
	const dataLength = employableCompanies?.companies.length;
	const loadingTableDataArray = Array.from({ length: 14 }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
	]);
	const emptyTableDataArray = Array.from({ length: 14 - dataLength }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
	]);
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
			</_.TableWrapper>
		</_.Container>
	);
}
