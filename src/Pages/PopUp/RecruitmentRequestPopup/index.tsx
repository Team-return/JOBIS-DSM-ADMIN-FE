import { useEffect, useState } from 'react';
import * as _ from './style';
import { ApplicantInfoQueryStringType } from '../../../Apis/Applications/request';
import { StudentTable } from '../../../Components/PopUp/RecruitmentPopup/StudentTable';
import { DownloadTable } from '../../../Components/PopUp/RecruitmentPopup/DownloadTable';
import { Button } from '@team-return/design-system';
import { AttachmentUrlType } from '../../../Apis/Applications/response';
import { useGetApplicantInfo } from '../../../Apis/Applications';

export function RecruitmentRequestPopup() {
	const id = new URLSearchParams(window.location.search).get('id');
	const [applicationQueryString] = useState<ApplicantInfoQueryStringType>({
		application_status: 'REQUESTED',
		student_name: '',
		recruitment_id: id ? id : '',
		year: '',
	});

	const {
		data: applicationData,
		isLoading,
		refetch: refetchApplication,
	} = useGetApplicantInfo(applicationQueryString);

	const [applicationAttachmentUrl, setApplicationAttachmentUrl] = useState<
		AttachmentUrlType[]
	>([]);

	useEffect(() => {
		refetchApplication();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<StudentTable
				application={applicationData!}
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
