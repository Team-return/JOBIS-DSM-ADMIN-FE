import { useCallback, useEffect, useState } from 'react';
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
	});

	const applicationQueries = useGetApplicantInfo(applicationQueryString);
	const applicationData = applicationQueries[0];
	const isLoading = applicationQueries.some((result) => result.isLoading);
	const refetchApplication = useCallback(() => {
		applicationQueries.forEach((result) => result.refetch());
	}, [applicationQueries]);

	const [applicationAttachmentUrl, setApplicationAttachmentUrl] = useState<
		AttachmentUrlType[]
	>([]);

	useEffect(() => {
		applicationQueries[1].refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<StudentTable
				application={applicationData.data!}
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
