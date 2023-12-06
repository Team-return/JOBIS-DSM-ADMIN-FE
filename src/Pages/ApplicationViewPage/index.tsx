import * as _ from './style';
import { Header } from '../../Components/Header';
import { useEffect } from 'react';
import { ApplicationViewSearch } from '../../Components/ApplicationView/Search';
import { selectStudent } from '../../Apis/Applications/request';
import { ApplicationViewTable } from '../../Components/ApplicationView/Table';
import { useGetApplicantInfo } from '../../Apis/Applications';
import { useApplicationViewQueryString } from '../../Store/State';

export function ApplicationViewPage() {
	const { applicationViewQueryString } = useApplicationViewQueryString();

	const {
		data: applicationData,
		isLoading,
		refetch: refetchApplication,
	} = useGetApplicantInfo(applicationViewQueryString);

	const applicationPage = applicationData?.applications?.length! / 10! + 1;

	const allSelectFormIdAndName: selectStudent[] =
		applicationData! &&
		applicationData?.applications.map((companie) => {
			return {
				id: companie.application_id,
				name: companie.student_name,
				status: companie.application_status,
			};
		});

	useEffect(() => {
		refetchApplication();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			<_.Wrapper>
				<ApplicationViewSearch
					refetchCompanyRecruitment={refetchApplication}
				/>
				<ApplicationViewTable
					applicationIsLoading={isLoading}
					application={applicationData!}
					applicationPageNum={applicationPage}
					refetchApplication={refetchApplication}
					allSelectFormIdAndName={allSelectFormIdAndName}
				/>
			</_.Wrapper>
		</>
	);
}
