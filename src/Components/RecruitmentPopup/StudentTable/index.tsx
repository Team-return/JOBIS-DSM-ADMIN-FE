import { Button, RadioButton, Table } from '@team-return/design-system';
import * as _ from './style';
import { ApplicationResponse } from '../../../apis/Applications/response';
import { useState } from 'react';
import { useChangeRequestStatus } from '../../../apis/Applications';

interface PropsType {
	application: ApplicationResponse;
	refetchApplication: () => void;
	isRequest?: boolean;
	setApplicationAttachmentUrl: React.Dispatch<React.SetStateAction<string[]>>;
}

export function StudentTable({ application, refetchApplication, setApplicationAttachmentUrl, isRequest }: PropsType) {
	const [clickId, setClickId] = useState<number[]>([]);
	const tableLength = isRequest ? 5 : 6;
	const emptyTableData = Array.from({ length: tableLength - application?.applications.length }, () => [<></>, <></>, <></>, <></>]);
	const tableAllDatas: JSX.Element[][] = application?.applications
		.map((student) => [
			<RadioButton
				onClick={() => {
					setClickId([student.application_id]);
					setApplicationAttachmentUrl(student.application_attachment_url);
				}}
			/>,
			<_.ContentText>{student.student_gcn}</_.ContentText>,
			<_.ContentText>{student.student_name}</_.ContentText>,
			<_.ContentText>{student.created_at}</_.ContentText>,
		])
		.concat(emptyTableData);

	const ChangeStatusAPI = useChangeRequestStatus(clickId, 'APPROVED', {
		onSuccess: () => {
			refetchApplication();
			alert('썽공');
		},
	});

	const tableTitle: JSX.Element[] = [<RadioButton disabled={true} />, <_.TitleText>학번</_.TitleText>, <_.TitleText>이름</_.TitleText>, <_.TitleText>지원일자</_.TitleText>];
	const tableWidth: number[] = [10, 24, 33, 33];

	const buttonMargin: [number, number, number, number] = [10, 0, 0, 0];

	return (
		<_.Container>
			<_.TableWrapper isRequest={isRequest!}>
				<Table tableData={tableAllDatas} title={tableTitle} width={tableWidth} />
			</_.TableWrapper>
			<_.BtnWrapper>
				{isRequest && (
					<Button size="M" margin={buttonMargin} onClick={ChangeStatusAPI.mutate}>
						승인
					</Button>
				)}
			</_.BtnWrapper>
		</_.Container>
	);
}
