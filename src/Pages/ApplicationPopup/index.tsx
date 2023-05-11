import { useState } from 'react';
import { useGetApplicantInfo } from '../../Hooks/useGetApplicantInfo';
import { ApplicantInfoQueryStringType } from '../../Apis/Applications/request';
import { StudentTable } from '../../Components/RecruitmentPopup/StudentTable';
import { DownloadTable } from '../../Components/RecruitmentPopup/DownloadTable';
import { Button } from '@team-return/design-system';
import * as _ from './style';

export function ApplicationPopup() {
	const id = new URLSearchParams(window.location.search).get('id');
	const [applicationQueryString] = useState<ApplicantInfoQueryStringType>({
		application_status: 'APPROVED',
		student_name: '',
		company_id: id ? id : '',
	});

	const { data: application, refetch: refetchApplication, isLoading } = useGetApplicantInfo(applicationQueryString);

	const [applicationAttachmentUrl, setApplicationAttachmentUrl] = useState<string[]>([]);
	return (
		<>
			<StudentTable
				application={application!}
				isRequest={false}
				refetchApplication={refetchApplication}
				setApplicationAttachmentUrl={setApplicationAttachmentUrl}
				applicationIsLoading={isLoading}
			/>
			<DownloadTable applicationAttachmentUrl={applicationAttachmentUrl!} />
			<_.BtnWrapper>
				<Button onClick={() => window.close()}>닫기</Button>
			</_.BtnWrapper>
		</>
	);
}
