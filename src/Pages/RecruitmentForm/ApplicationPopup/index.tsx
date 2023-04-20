import { useState } from 'react';
import { useGetApplicantInfo } from '../../../Hooks/useGetApplicantInfo';
import { ApplicantInfoQueryStringType } from '../../../apis/Applications/request';

export function ApplicationPopup() {
	const [applicationQueryString, setApplicationQueryString] = useState<ApplicantInfoQueryStringType>({
		application_status: '',
		student_name: '',
		company_id: 0,
	});

	const { data: application, refetch: refetchApplication } = useGetApplicantInfo(applicationQueryString);

	return <>어플리케이션팝업</>;
}
