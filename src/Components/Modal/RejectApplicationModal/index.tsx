import { Dispatch, SetStateAction } from 'react';
import * as _ from '../style';

interface PropsType {
	clickedData: number[];
	clickStudentName: string[];
	setRejectReason: Dispatch<SetStateAction<string>>;
}

export function RejectApplicationModal({
	clickedData,
	clickStudentName,
	setRejectReason,
}: PropsType) {
	return (
		<>
			<_.ModalTitleText>
				{clickedData.length - 3 > 0
					? `${clickStudentName.join(', ')} 외 ${
							clickedData.length - 3
					  }명의 지원서를 반려(으)로 바꾸시겠습니까?`
					: `${clickStudentName.join(
							', '
					  )}의 지원서를 반려(으)로 바꾸시겠습니까?`}
			</_.ModalTitleText>
			<_.ModalContentText>
				반려상태로 변경하려면 먼저 반려사유를 입력해야합니다.
			</_.ModalContentText>
			<_.RejectReasonTextarea
				onChange={(e) => setRejectReason(e.target.value)}
			/>
		</>
	);
}
