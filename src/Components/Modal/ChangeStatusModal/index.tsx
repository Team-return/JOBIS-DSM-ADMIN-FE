import { applicationStatus } from '../../../Utils/Translation';
import * as _ from '../style';

interface PropsType {
	clickedData: number[];
	clickStudentName: string[];
	statusName: string;
}

export function ChangeStatusModal({
	clickedData,
	clickStudentName,
	statusName,
}: PropsType) {
	return (
		<>
			<_.ModalTitleText>
				{clickedData.length - 3 > 0
					? `${clickStudentName.join(', ')} 외 ${
							clickedData.length - 3
					  }명의 지원서를 ${
							applicationStatus[statusName]
					  }(으)로 바꾸시겠습니까?`
					: `${clickStudentName.join(', ')}의 지원서를 ${
							applicationStatus[statusName]
					  }(으)로 바꾸시겠습니까?`}
			</_.ModalTitleText>
			<_.ModalContentText>
				삭제하면 되돌릴 수 없습니다.
			</_.ModalContentText>
		</>
	);
}
