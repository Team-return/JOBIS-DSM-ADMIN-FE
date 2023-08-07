import { Button, CheckBox, Input, Table, useToastStore } from '@team-return/design-system';
import * as _ from '../style';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from '../../../Hooks/useForm';
import { Pagination } from '../../../Utils/Pagination';
import { useChangeStudentFieldTrain } from '../../../Apis/Acceptances';
import { DateProps } from '../../../Apis/Acceptances/request';
import { useGetInternshipStudent } from '../../../Hooks/ApiHooks/Applications';

interface PropType {
	selectCompany: number;
	date: DateProps;
	setDate: Dispatch<SetStateAction<DateProps>>;
	refetch: () => void;
}

export function AddInternshipStudentModal({
	selectCompany,
	date,
	setDate,
	refetch,
}: PropType) {
	const { append } = useToastStore();
	const [pages, setPages] = useState({ page: 1 });
	const offset = (pages.page - 1) * 8;
	const { form: searchInput, handleChange } = useForm({
		searchInputValue: '',
	});
	const [studentId, setStudentId] = useState<number[]>([]);
	const {
		data: studentList,
		isLoading,
		refetch: refetchStudentList,
	} = useGetInternshipStudent(selectCompany);

	/** 학생의 현장실습 기간을 바꾸는 api를 호출합니다. */
	const changeStudentFieldTrainAPI = useChangeStudentFieldTrain(
		studentId,
		date.start_date,
		date.end_date,
		{
			onSuccess: () => {
				refetch();
				refetchStudentList();
				setStudentId([]);
				setDate({ start_date: '', end_date: '' });
				append({
					title: '성공적으로 추가되었습니다.',
					message: '',
					type: 'BLUE',
				});
			},
			onError: () => {
				append({
					title: '추가에 실패했습니다.',
					message: '',
					type: 'RED',
				});
			},
		}
	);

	/** 학생 검색을 위한 필터입니다. */
	const filteredStudents = studentList?.students.filter((student) =>
		student.student_name.includes(searchInput.searchInputValue)
	);

	/** 학생 데이터의 length를 계산한 값입니다. */
	const dataLength = (filteredStudents?.length || 0) / 2;

	/** 로딩할 때 보여줄 빈 테이블입니다. */
	const loadingTableDataArray = Array.from({ length: 4 }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
	]);

	/** 데이터 테이블 아래 보여줄 빈 테이블입니다. */
	const emptyTableDataArray = Array.from({ length: 4 - dataLength }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
		<></>,
	]);

	/** 데이터 테이블입니다. */
	const tableAllData = filteredStudents
		?.slice(offset, offset + 8)
		.flatMap((student, index) => {
			const clickCheckBox = (id: number) => {
				if (studentId.includes(id)) {
					setStudentId(
						studentId.filter((studentId) => studentId !== id)
					);
				} else {
					setStudentId([...studentId, id]);
				}
			};

			if (index % 2 === 0 && index < filteredStudents?.length - 1) {
				const nextStudent = filteredStudents[index + 1];
				return [
					[
						<CheckBox
							onChange={() =>
								clickCheckBox(student.application_id)
							}
							checked={studentId.includes(student.application_id)}
						/>,
						<_.ContentText>{student.student_gcn}</_.ContentText>,
						<_.ContentText>{student.student_name}</_.ContentText>,
						<CheckBox
							onChange={() =>
								clickCheckBox(nextStudent.application_id)
							}
							checked={studentId.includes(
								nextStudent.application_id
							)}
						/>,
						<_.ContentText>
							{nextStudent.student_gcn}
						</_.ContentText>,
						<_.ContentText>
							{nextStudent.student_name}
						</_.ContentText>,
					],
				];
			} else if (
				index % 2 === 0 &&
				index === filteredStudents?.length - 1
			) {
				return [
					[
						<CheckBox
							onChange={() =>
								clickCheckBox(student.application_id)
							}
							checked={studentId.includes(student.application_id)}
						/>,
						<_.ContentText>{student.student_gcn}</_.ContentText>,
						<_.ContentText>{student.student_name}</_.ContentText>,
						<></>,
						<></>,
						<></>,
					],
				];
			}
			return [];
		})
		.concat(emptyTableDataArray);

	/** 테이블의 title입니다. */
	const tableTitle: JSX.Element[] = [
		<CheckBox disabled={true} />,
		<_.TitleText>학번</_.TitleText>,
		<_.TitleText>이름</_.TitleText>,
		<CheckBox disabled={true} />,
		<_.TitleText>학번</_.TitleText>,
		<_.TitleText>이름</_.TitleText>,
	];

	/** 테이블의 width입니다. */
	const tableWidth: number[] = [10, 17, 23, 10, 17, 23];
	return (
		<_.Container>
			<_.SearchWrapper>
				<_.InputWrapper>
					<_.CompanyText>학생 추가</_.CompanyText>
					<Input
						margin={[0, 0, 0, 20]}
						iconName="Search"
						width={65}
						placeHolder="학생 검색"
						name="searchInputValue"
						value={searchInput.searchInputValue}
						onChange={handleChange}
					/>
				</_.InputWrapper>
				<Button
					onClick={() => {
						changeStudentFieldTrainAPI.mutate();
						setTimeout(refetchStudentList);
					}}
				>
					추가
				</Button>
			</_.SearchWrapper>
			<_.TableWrapper>
				<Table
					tableData={isLoading ? loadingTableDataArray : tableAllData}
					title={tableTitle}
					width={tableWidth}
				/>
			</_.TableWrapper>
			<Pagination
				page={
					Math.floor(filteredStudents?.length! / 8) / 8 === 0
						? 1
						: Math.floor(filteredStudents?.length! / 8)
				}
				data={pages}
				setData={setPages}
				refetch={() => {}}
			/>
		</_.Container>
	);
}
