import { useState } from "react";
import { ApplicantInfoQueryStringType } from "../../../apis/Applications/request";
import { useGetApplicantInfo } from "../../../Hooks/useGetApplicantInfo";
import { StudentTable } from "../../../Components/RecruitmentForm/RecruitmentPopup/StudentTable";

export function RecruitmentRequestPopup () {
    const [applicationQueryString, setApplicationQueryString] = useState<ApplicantInfoQueryStringType>({
		application_status: '',
		student_name: '',
		company_id: 0,
	});

	const { data: application, refetch: refetchApplication } = useGetApplicantInfo(applicationQueryString);
    return(
		<></>
        // <StudentTable application={application} refetchApplication={refetchApplication} />
    )
}