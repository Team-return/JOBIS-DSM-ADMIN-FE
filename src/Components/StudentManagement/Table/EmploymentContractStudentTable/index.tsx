import { CheckBox, Table } from '@team-return/design-system';
import * as _ from '../style';
import { CombinedStudentListResponse } from '../../../../Apis/Acceptances/response';
import { Dispatch, SetStateAction } from 'react';
import { searchInArray } from '../../../../Hooks/useSearchForArray';

interface PropType {
	setSelectStudent: Dispatch<SetStateAction<number[]>>;
	selectStudent: number[];
	combinedStudentList: CombinedStudentListResponse;
	isLoading: boolean;
}

export function EmploymentContractStudentTable({
	combinedStudentList,
	isLoading,
	setSelectStudent,
	selectStudent,
}: PropType) {
	const dataLength = combinedStudentList?.acceptances_response.length;
	const loadingTableDataArray = Array.from({ length: 5 }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
	]);
	const emptyTableDataArray = Array.from({ length: 5 - dataLength }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
	]);
	const allSelectFormId: number[] =
		combinedStudentList?.acceptances_response! &&
		combinedStudentList?.acceptances_response.map((studentList) => {
			return studentList.acceptance_id;
		});
	const tableAllDatas: JSX.Element[][] =
		combinedStudentList?.acceptances_response
			.map((studentList) => {
				const clickCheckBox = () => {
					if (selectStudent.includes(studentList.acceptance_id)) {
						setSelectStudent(
							selectStudent.filter(
								(selectStudents) =>
									selectStudents !== studentList.acceptance_id
							)
						);
					} else {
						setSelectStudent((studentId) => [
							...studentId,
							studentList.acceptance_id,
						]);
					}
				};
				return [
					<CheckBox
						checked={selectStudent.includes(
							studentList.acceptance_id
						)}
						onChange={clickCheckBox}
					/>,
					<_.ContentText>{studentList.student_gcn}</_.ContentText>, // 학번
					<_.ContentText>{studentList.student_name}</_.ContentText>, // 이름
					<_.ContentText>{studentList.contract_date}</_.ContentText>, // 근로계약 일자
				];
			})
			.concat(emptyTableDataArray);

	const selectAllCheckBox = () => {
		if (
			searchInArray(allSelectFormId, selectStudent).length === dataLength
		) {
			setSelectStudent(
				selectStudent.filter((data) => !allSelectFormId.includes(data))
			);
		} else {
			setSelectStudent((students) => [
				...students,
				...allSelectFormId.filter((data) => !students.includes(data)),
			]);
		}
	};

	const tableTitle: JSX.Element[] = [
		<CheckBox
			checked={
				allSelectFormId?.length !== 0 &&
				searchInArray(allSelectFormId, selectStudent).length ===
					allSelectFormId?.length
			}
			disabled={
				combinedStudentList?.acceptances_response === undefined ||
				dataLength === 0
			}
			onChange={selectAllCheckBox}
		/>,
		<_.TitleText>학번</_.TitleText>,
		<_.TitleText>이름</_.TitleText>,
		<_.TitleText>근로계약 일자</_.TitleText>,
	];
	const tableWidth: number[] = [10, 20, 40, 40];

	return (
		<_.Container>
			<_.TitleText>근로계약 학생 목록</_.TitleText>
			<_.TableWrapper>
				<Table
					tableData={
						isLoading ||
						combinedStudentList?.acceptances_response === undefined
							? loadingTableDataArray
							: tableAllDatas
					}
					title={tableTitle}
					width={tableWidth}
				/>
			</_.TableWrapper>
		</_.Container>
	);
}
