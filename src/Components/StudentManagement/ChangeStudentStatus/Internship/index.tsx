import { Button, Icon, Stack } from '@team-return/design-system';
import * as _ from '../style';
import TrashBtn from '../../../../Assets/SVG/TrashBtn.svg';
import DisabledTrashBtn from '../../../../Assets/SVG/DisabledTrashBtn.svg';
import { useChangeTrainDate } from '../../../../Apis/Applications';
import { useForm } from '../../../../Hooks/useForm';
import { Dispatch, SetStateAction } from 'react';
import { useDeleteInternshipStudent } from '../../../../Apis/Acceptances';
import { useModalContext } from '../../../../Utils/Modal';
import { AddInternshipStudentModal } from '../../../Modal/AddInternshipStudentModal';

interface PropType {
	selectStudent: number[];
	selectCompany: number;
	setSelectStudent: Dispatch<SetStateAction<number[]>>;
	refetch: () => void;
}

export function ChangeInternshipStudentStatus({
	selectStudent,
	selectCompany,
	setSelectStudent,
	refetch,
}: PropType) {
	const date = new Date();
	const allDate =
		date.getFullYear() +
		'-' +
		String(date.getMonth() + 1).padStart(2, '0') +
		'-' +
		String(date.getDate()).padStart(2, '0');
	const { openModal } = useModalContext();

	const { form, setForm, handleChange } = useForm({
		start_date: '',
		end_date: '',
	});

	const openAddInternshipStudentModal = () => {
		openModal({
			children: (
				<AddInternshipStudentModal
					selectCompany={selectCompany}
					date={form}
					setDate={setForm}
					refetch={refetch}
				/>
			),
		});
	};

	const changeTrainDateAPI = useChangeTrainDate(
		selectStudent,
		form.start_date,
		form.end_date,
		{
			onSuccess: () => {
				refetch();
				setSelectStudent([]);
				setForm({
					start_date: '',
					end_date: '',
				});
			},
		}
	);

	const deleteInternshipStudentAPI = useDeleteInternshipStudent(
		selectStudent,
		{
			onSuccess: () => {
				refetch();
				setSelectStudent([]);
			},
		}
	);

	const deleteStudentCheck = () => {
		if (selectStudent.length !== 0) {
			deleteInternshipStudentAPI.mutate();
		} else {
			alert('학생 선택 먼저 하셈');
		}
	};

	const addInternshipStudentCheck = () => {
		if (selectCompany === 0) {
			alert('회사 선택 먼저 하셈');
		} else if (form.end_date === '' && form.start_date === '') {
			alert('파견일자, 종료일자 선택부터 ㄱ');
		} else {
			openAddInternshipStudentModal();
		}
	};

	return (
		<_.Container>
			<Stack justify="space-between" align="center">
				<_.TitleText>현장 실습 학생 추가하기</_.TitleText>
				<_.PlusIcon
					click={form.end_date !== '' && form.start_date !== ''}
					onClick={addInternshipStudentCheck}
				>
					<Icon icon="Plus" color="gray10" />
				</_.PlusIcon>
			</Stack>
			<_.Line />
			<_.TitleText>파견/종료일자 변경하기</_.TitleText>
			<Stack align="center">
				<_.ContentText>파견일자</_.ContentText>
				<_.DateInput
					type="date"
					name="start_date"
					value={form.start_date}
					min={allDate}
					onChange={handleChange}
				/>
			</Stack>
			<Stack justify="space-between" align="end">
				<Stack align="center">
					<_.ContentText>종료일자</_.ContentText>
					<_.DateInput
						type="date"
						name="end_date"
						value={form.end_date}
						min={
							String(form.start_date)
								? String(form.start_date)
								: allDate
						}
						onChange={handleChange}
					/>
				</Stack>
				<Button
					disabled={
						selectStudent.length === 0 ||
						form.end_date === '' ||
						form.start_date === ''
					}
					size="XXS"
					onClick={changeTrainDateAPI.mutate}
				>
					일자 변경
				</Button>
			</Stack>
			<_.Line />
			<Stack justify="space-between" align="center">
				<_.TitleText>현장 실습 학생 삭제하기</_.TitleText>
				<_.Img
					curser={selectStudent.length !== 0}
					src={
						selectStudent.length !== 0 ? TrashBtn : DisabledTrashBtn
					}
					alt=""
					onClick={deleteStudentCheck}
				/>
			</Stack>
		</_.Container>
	);
}
