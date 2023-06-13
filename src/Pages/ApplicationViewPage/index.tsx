import * as _ from './style';
import { Header } from '../../Components/Header';
import { useState } from 'react';
import { ApplicationViewSearch } from '../../Components/ApplicationView/Search';
import { ApplicantInfoQueryStringType } from '../../Apis/Applications/request';
import { useGetApplicantInfo } from '../../Hooks/ApiHooks/Applications';
import { ApplicationViewTable } from '../../Components/ApplicationView/Table';

export function ApplicationViewPage() {
	const [searchQueryString, setSearchQueryString] = useState<ApplicantInfoQueryStringType>({
		page: 1,
		application_status: '',
		student_name: '',
		company_id: '',
	});
	const { data: application, refetch: refetchApplication, isLoading } = useGetApplicantInfo(searchQueryString);

	const allSelectFormId: number[] =
		application! &&
		application.applications.map((companie) => {
			return companie.application_id;
		});

	const allSelectStudent: string[] =
		application! &&
		application.applications.slice(0, 3).map((companie) => {
			return companie.student_name;
		});

	return (
		<>
			<Header />
			<_.Wrapper>
				<ApplicationViewSearch setSearchQueryString={setSearchQueryString} refetchCompanyRecruitment={refetchApplication} />
				<ApplicationViewTable
					applicationIsLoading={isLoading}
					application={application!}
					refetchApplication={refetchApplication}
					allSelectFormId={allSelectFormId}
					allSelectStudent={allSelectStudent}
					searchQueryString={searchQueryString}
					setSearchQueryString={setSearchQueryString}
				/>
			</_.Wrapper>
		</>
	);
}
