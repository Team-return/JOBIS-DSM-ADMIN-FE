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

	const ClickRadioBtn = (id: number, applicationAttachmentUrl: string[]) => {
		setClickId([id]);
		setApplicationAttachmentUrl(applicationAttachmentUrl);
	};

	let tableAllDatas: JSX.Element[][] | undefined = application?.applications.map((res, i) => {
		return [
			<RadioButton onClick={() => ClickRadioBtn(res.application_id, res.application_attachment_url)} />,
			<_.ContentText>{res.student_gcn}</_.ContentText>, // 상태
			<_.ContentText>{res.student_name}</_.ContentText>, // 회사 이름
			<_.ContentText>{res.created_at}</_.ContentText>, // 채용 직군
		];
	});

	for (let i = 0; i < tableLength - application?.applications.length; i++) {
		tableAllDatas?.push([<></>, <></>, <></>, <></>]);
	}

	const ChangeStatusAPI = useChangeRequestStatus(clickId, 'APPROVED', {
		onSuccess: () => {
			refetchApplication();
			alert('썽공');
		},
	});

	return (
		<_.Container>
			<_.TableWrapper isRequest={isRequest!}>
				<Table
					tableData={tableAllDatas}
					title={[<RadioButton disabled={true} />, <_.TitleText>학번</_.TitleText>, <_.TitleText>이름</_.TitleText>, <_.TitleText>지원일자</_.TitleText>]}
					width={[10, 24, 33, 33]}
				/>
			</_.TableWrapper>
			<_.BtnWrapper>
				{isRequest && (
					<Button size="M" margin={[10, 0, 0, 0]} onClick={ChangeStatusAPI.mutate}>
						승인
					</Button>
				)}
			</_.BtnWrapper>
		</_.Container>
	);
}
