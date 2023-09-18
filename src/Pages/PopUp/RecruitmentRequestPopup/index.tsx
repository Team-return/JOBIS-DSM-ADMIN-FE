import { useState } from 'react';
import * as _ from './style';
import { ApplicantInfoQueryStringType } from '../../../Apis/Applications/request';
import { useGetApplicantInfo } from '../../../Hooks/ApiHooks/Applications';
import { StudentTable } from '../../../Components/PopUp/RecruitmentPopup/StudentTable';
import { DownloadTable } from '../../../Components/PopUp/RecruitmentPopup/DownloadTable';
import { Button } from '@team-return/design-system';
import { AttachmentUrlType } from '../../../Apis/Applications/response';

export function RecruitmentRequestPopup() {
	const id = new URLSearchParams(window.location.search).get('id');
	const [applicationQueryString] = useState<ApplicantInfoQueryStringType>({
		application_status: 'REQUESTED',
		student_name: '',
		recruitment_id: id ? id : '',
	});

	const {
		data: application,
		refetch: refetchApplication,
		isLoading,
	} = useGetApplicantInfo(applicationQueryString);

	const [applicationAttachmentUrl, setApplicationAttachmentUrl] = useState<
		AttachmentUrlType[]
	>([]);
	return (
		<>
			<StudentTable
				application={application!}
				isRequest={true}
				refetchApplication={refetchApplication}
				setApplicationAttachmentUrl={setApplicationAttachmentUrl}
				applicationIsLoading={isLoading}
			/>
			<DownloadTable
				applicationAttachmentUrl={applicationAttachmentUrl!}
			/>
			<_.BtnWrapper>
				<Button onClick={() => window.close()}>닫기</Button>
			</_.BtnWrapper>
		</>
	);
}
