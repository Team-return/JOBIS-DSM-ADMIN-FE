import * as _ from './style';

interface DeleteAlarmProps {
	onCancel: () => void;
	onConfirm: () => void;
}

export function DeleteAlarm({ onCancel, onConfirm }: DeleteAlarmProps) {
	return (
		<_.Container>
			<_.TextWrapper>
				<_.Title>선택한 배너를 삭제하시겠습니까?</_.Title>
				<_.Contents>삭제하면 되돌릴 수 없습니다.</_.Contents>
			</_.TextWrapper>
			<_.BtnWrapper>
				<_.Cancle onClick={onCancel}>취소</_.Cancle>
				<_.Confirm onClick={onConfirm}>확인</_.Confirm>
			</_.BtnWrapper>
		</_.Container>
	);
}
