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

export function InternshipStudentTable({
	combinedStudentList,
	isLoading,
	setSelectStudent,
	selectStudent,
}: PropType) {
	const dataLength = combinedStudentList?.field_trainees_response.length;
	const loadingTableDataArray = Array.from({ length: 5 }, () => [
		<></>,
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
		<></>,
	]);
	const allSelectFormId: number[] =
		combinedStudentList?.field_trainees_response! &&
		combinedStudentList?.field_trainees_response.map((studentList) => {
			return studentList.application_id;
		});
	const tableAllDatas: JSX.Element[][] =
		combinedStudentList?.field_trainees_response
			.map((studentList) => {
				const clickCheckBox = () => {
					if (selectStudent.includes(studentList.application_id)) {
						setSelectStudent(
							selectStudent.filter(
								(clickedDataId) =>
									clickedDataId !== studentList.application_id
							)
						);
					} else {
						setSelectStudent((datas) => [
							...datas,
							studentList.application_id,
						]);
					}
				};
				return [
					<CheckBox
						checked={selectStudent.includes(
							studentList.application_id
						)}
						onChange={clickCheckBox}
					/>,
					<_.ContentText>{studentList.student_gcn}</_.ContentText>, // 학번
					<_.ContentText>{studentList.student_name}</_.ContentText>, // 이름
					<_.ContentText>{studentList.start_date}</_.ContentText>, // 파견일자
					<_.ContentText>{studentList.end_date}</_.ContentText>, // 종료일자
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
			disabled={
				combinedStudentList?.field_trainees_response === undefined ||
				dataLength === 0
			}
			checked={
				allSelectFormId?.length !== 0 &&
				searchInArray(allSelectFormId, selectStudent).length ===
					allSelectFormId?.length
			}
			onChange={selectAllCheckBox}
		/>,
		<_.TitleText>학번</_.TitleText>,
		<_.TitleText>이름</_.TitleText>,
		<_.TitleText>파견일자</_.TitleText>,
		<_.TitleText>종료일자</_.TitleText>,
	];
	const tableWidth: number[] = [10, 17, 23, 25, 25];

	return (
		<_.Container>
			<_.TitleText>현장실습 학생 목록</_.TitleText>
			<_.TableWrapper>
				<Table
					tableData={
						isLoading ||
						combinedStudentList?.field_trainees_response ===
							undefined
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
