import { Button, Stack } from '@team-return/design-system';
import * as _ from '../style';
import { Dispatch, SetStateAction } from 'react';
import { useChangeStudentContractDate } from '../../../../Apis/Acceptances';
import { useForm } from '../../../../Hooks/useForm';

interface PropType {
	selectStudent: number[];
	setSelectStudent: Dispatch<SetStateAction<number[]>>;
	refetch: () => void;
}

export function ChangeEmploymentContractStudentStatus({
	selectStudent,
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

	const { form, setForm, handleChange } = useForm({
		contract_date: '',
	});
	const changeTrainDateAPI = useChangeStudentContractDate(
		selectStudent,
		form.contract_date,
		{
			onSuccess: () => {
				refetch();
				setSelectStudent([]);
				setForm({
					contract_date: '',
				});
				alert('성공적으로 변경되었습니다.');
			},
			onError: () => {
				alert("변경에 실패했습니다.")
			},
		}
	);

	return (
		<_.Container height={150}>
			<_.TitleText>근로계약 일자 변경하기</_.TitleText>
			<Stack justify="space-between" align="end">
				<Stack align="center">
					<_.ContentText>파견일자</_.ContentText>
					<_.DateInput
						type="date"
						min={allDate}
						name="contract_date"
						value={form.contract_date}
						onChange={handleChange}
					/>
				</Stack>
				<Button
					size="XXS"
					disabled={
						selectStudent.length === 0 || form.contract_date === ''
					}
					onClick={changeTrainDateAPI.mutate}
				>
					일자 변경
				</Button>
			</Stack>
		</_.Container>
	);
}
