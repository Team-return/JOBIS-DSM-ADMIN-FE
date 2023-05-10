import { useState } from 'react';
import * as _ from './style';
import { ApplicantInfoQueryStringType } from '../../Apis/Applications/request';
import { useGetApplicantInfo } from '../../Hooks/useGetApplicantInfo';
import { StudentTable } from '../../Components/RecruitmentPopup/StudentTable';
import { DownloadTable } from '../../Components/RecruitmentPopup/DownloadTable';
import { Button } from '@team-return/design-system';

export function RecruitmentRequestPopup() {
	const id = new URLSearchParams(window.location.search).get('id');
	const [applicationQueryString] = useState<ApplicantInfoQueryStringType>({
		application_status: 'REQUESTED',
		student_name: '',
		company_id: id ? id : '',
	});

	const { data: application, refetch: refetchApplication } = useGetApplicantInfo(applicationQueryString);

	const [applicationAttachmentUrl, setApplicationAttachmentUrl] = useState<string[]>([]);
	return (
		<>
			<StudentTable application={application!} isRequest={true} refetchApplication={refetchApplication} setApplicationAttachmentUrl={setApplicationAttachmentUrl} />
			<DownloadTable applicationAttachmentUrl={applicationAttachmentUrl!} setApplicationAttachmentUrl={setApplicationAttachmentUrl} />
			<_.BtnWrapper>
				<Button onClick={() => window.close()}>닫기</Button>
			</_.BtnWrapper>
		</>
	);
}