import { useState } from 'react';
import * as _ from './style';
import { ApplicantInfoQueryStringType } from '../../apis/Applications/request';
import { useGetApplicantInfo } from '../../Hooks/useGetApplicantInfo';
import { StudentTable } from '../../Components/RecruitmentPopup/StudentTable';
import { DownloadTable } from '../../Components/RecruitmentPopup/DownloadTable';
import { Button } from '@team-return/design-system';
import { ApplicationAttachmentUrlType } from '../../apis/Applications/response';

export function RecruitmentRequestPopup() {
	const id = new URLSearchParams(window.location.search).get('id');
	const [applicationQueryString] = useState<ApplicantInfoQueryStringType>({
		application_status: 'REQUESTED',
		student_name: '',
		company_id: id ? id : '',
	});

	const { data: application, refetch: refetchApplication } = useGetApplicantInfo(applicationQueryString);

	const [applicationAttachmentUrl, setApplicationAttachmentUrl] = useState<ApplicationAttachmentUrlType[]>([]);
	return (
		<>
			<StudentTable application={application!} isRequest={true} refetchApplication={refetchApplication} setApplicationAttachmentUrl={setApplicationAttachmentUrl} />
			<DownloadTable applicationAttachmentUrl={applicationAttachmentUrl!} />
			<_.BtnWrapper>
				<Button onClick={() => window.close()}>닫기</Button>
			</_.BtnWrapper>
		</>
	);
}
