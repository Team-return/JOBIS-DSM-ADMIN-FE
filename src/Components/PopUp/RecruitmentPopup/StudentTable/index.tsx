import { Button, RadioButton, Table, useToastStore } from '@team-return/design-system';
import * as _ from './style';
import {
	ApplicationResponse,
	AttachmentUrlType,
} from '../../../../Apis/Applications/response';
import { useState } from 'react';
import { useChangeRequestStatus } from '../../../../Apis/Applications';

interface PropsType {
	application: ApplicationResponse;
	refetchApplication: () => void;
	isRequest?: boolean;
	setApplicationAttachmentUrl: React.Dispatch<
		React.SetStateAction<AttachmentUrlType[]>
	>;
	applicationIsLoading: boolean;
}

export function StudentTable({
	application,
	refetchApplication,
	setApplicationAttachmentUrl,
	isRequest,
	applicationIsLoading,
}: PropsType) {
	const { append } = useToastStore();
	const [clickId, setClickId] = useState<number[]>([]);

	/** 테이블의 length입니다. */
	const tableLength = isRequest ? 5 : 6;

	/** 로딩할 때 보여줄 빈 테이블입니다. */
	const loadingTableDataArray = Array.from({ length: tableLength }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
	]);

	/** 데이터 테이블 아래 보여줄 빈 테이블입니다. */
	const emptyTableData = Array.from(
		{ length: tableLength - application?.applications.length },
		() => [<></>, <></>, <></>, <></>]
	);

	/** 데이터 테이블입니다. */
	const tableAllDatas: JSX.Element[][] = application?.applications
		.map((student) => [
			<RadioButton
				name="student"
				onClick={() => {
					setClickId([student.application_id]);
					setApplicationAttachmentUrl(student.attachments);
				}}
			/>,
			<_.ContentText>{student.student_gcn}</_.ContentText>,
			<_.ContentText>{student.student_name}</_.ContentText>,
			<_.ContentText>{student.created_at}</_.ContentText>,
		])
		.concat(emptyTableData);

	/** 지원 요청 상태를 변경하는 api를 호출합니다. */
	const ChangeStatusAPI = useChangeRequestStatus(clickId, 'APPROVED', {
		onSuccess: () => {
			refetchApplication();
			append({
				title: '성공적으로 변경되었습니다.',
				message: '',
				type: 'BLUE',
			});
		},
		onError: () => {
			append({
				title: '변경에 실패했습니다.',
				message: '',
				type: 'RED',
			});
		},
	});

	/** 테이블의 title입니다. */
	const tableTitle: JSX.Element[] = [
		<RadioButton disabled={true} />,
		<_.TitleText>학번</_.TitleText>,
		<_.TitleText>이름</_.TitleText>,
		<_.TitleText>지원일자</_.TitleText>,
	];

	/** 테이블의 width입니다. */
	const tableWidth: number[] = [10, 24, 33, 33];

	/** 테이블의 margin입니다. */
	const buttonMargin: [number, number, number, number] = [10, 0, 0, 0];

	return (
		<_.Container>
			<_.TableWrapper isRequest={isRequest!}>
				<Table
					tableData={
						applicationIsLoading
							? loadingTableDataArray
							: tableAllDatas
					}
					title={tableTitle}
					width={tableWidth}
				/>
			</_.TableWrapper>
			<_.BtnWrapper>
				{isRequest && (
					<Button
						size="M"
						margin={buttonMargin}
						onClick={ChangeStatusAPI.mutate}
					>
						승인
					</Button>
				)}
			</_.BtnWrapper>
		</_.Container>
	);
}
