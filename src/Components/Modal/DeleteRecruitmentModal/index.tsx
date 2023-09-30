import * as _ from '../style';

export function DeleteRecruitmentModal() {
	return (
		<>
			<_.ModalTitleText>
				해당 모집의뢰서를 삭제하시겠습니까?
			</_.ModalTitleText>
			<_.ModalContentText>
				삭제하면 되돌릴 수 없습니다.
			</_.ModalContentText>
		</>
	);
}
