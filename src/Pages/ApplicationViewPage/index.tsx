import * as _ from './style';
import { Header } from '../../Components/Header';
import { useState } from 'react';
import { ApplicationViewSearch } from '../../Components/ApplicationView/Search';
import {
	ApplicantInfoQueryStringType,
	selectStudent,
} from '../../Apis/Applications/request';
import { useGetApplicantInfo } from '../../Hooks/ApiHooks/Applications';
import { ApplicationViewTable } from '../../Components/ApplicationView/Table';

export function ApplicationViewPage() {
	const [searchQueryString, setSearchQueryString] =
		useState<ApplicantInfoQueryStringType>({
			page: 1,
			application_status: '',
			student_name: '',
			recruitment_id: '',
		});
	const {
		data: application,
		refetch: refetchApplication,
		isLoading,
	} = useGetApplicantInfo(searchQueryString);

	const allSelectFormIdAndName: selectStudent[] =
		application! &&
		application.applications.map((companie) => {
			return { id: companie.application_id, name: companie.student_name };
		});

	return (
		<>
			<Header />
			<_.Wrapper>
				<ApplicationViewSearch
					setSearchQueryString={setSearchQueryString}
					refetchCompanyRecruitment={refetchApplication}
				/>
				<ApplicationViewTable
					applicationIsLoading={isLoading}
					application={application!}
					refetchApplication={refetchApplication}
					allSelectFormIdAndName={allSelectFormIdAndName}
					searchQueryString={searchQueryString}
					setSearchQueryString={setSearchQueryString}
				/>
			</_.Wrapper>
		</>
	);
}
