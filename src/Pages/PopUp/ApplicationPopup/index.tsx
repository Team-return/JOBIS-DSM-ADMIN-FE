import { useEffect, useState } from 'react';
import { ApplicantInfoQueryStringType } from '../../../Apis/Applications/request';
import { StudentTable } from '../../../Components/PopUp/RecruitmentPopup/StudentTable';
import { DownloadTable } from '../../../Components/PopUp/RecruitmentPopup/DownloadTable';
import { Button } from '@team-return/design-system';
import * as _ from './style';
import { AttachmentUrlType } from '../../../Apis/Applications/response';
import { useGetApplicantInfo } from '../../../Apis/Applications';

export function ApplicationPopup() {
	const date = new Date();
	const id = new URLSearchParams(window.location.search).get('id');
	const [applicationQueryString] = useState<ApplicantInfoQueryStringType>({
		application_status: 'APPROVED',
		student_name: '',
		recruitment_id: id ? id : '',
		year: date.getFullYear().toString(),
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
				isRequest={false}
				refetchApplication={refetchApplication}
				setApplicationAttachmentUrl={setApplicationAttachmentUrl}
				applicationIsLoading={isLoading}
			/>
			<DownloadTable
				applicationAttachmentUrl={applicationAttachmentUrl}
			/>
			<_.BtnWrapper>
				<Button onClick={window.close}>닫기</Button>
			</_.BtnWrapper>
		</>
	);
}
