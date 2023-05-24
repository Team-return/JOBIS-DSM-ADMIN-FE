import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import * as _ from '../style';
import { TrainDate } from '../../../Apis/Applications/request';

interface PropsType {
	clickedData: number[];
	clickStudentName: string[];
	setTrainDate: Dispatch<SetStateAction<TrainDate>>;
	trainDate: TrainDate;
}

export function ChangeTrainDateModal({ clickedData, clickStudentName, setTrainDate, trainDate }: PropsType) {
	const date = new Date();
	const allDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');

	const onChangeDateValue = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setTrainDate((dates) => ({ ...dates, [name]: value }));
	};

	return (
		<>
			<_.ModalTitleText>
				{clickedData.length - 3 > 0
					? `${clickStudentName.join(', ')} 외 ${clickedData.length - 3}명의 지원서를 현장실습(으)로 바꾸시겠습니까?`
					: `${clickStudentName.join(', ')}의 지원서를 현장실습(으)로 바꾸시겠습니까?`}
			</_.ModalTitleText>
			<_.ModalContentText>파견일자와 종료일자가 필요합니다.</_.ModalContentText>
			<_.DateInputContainer>
				<_.DateInputWrapper>
					<_.DateText>파견일자</_.DateText>
					<_.DateInput type="date" name="start_date" min={allDate} onChange={onChangeDateValue} />
				</_.DateInputWrapper>
				<_.DateInputWrapper>
					<_.DateText>종료일자</_.DateText>
					<_.DateInput type="date" name="end_date" min={String(trainDate.start_date) ? String(trainDate.start_date) : allDate} onChange={onChangeDateValue} />
				</_.DateInputWrapper>
			</_.DateInputContainer>
		</>
	);
}
