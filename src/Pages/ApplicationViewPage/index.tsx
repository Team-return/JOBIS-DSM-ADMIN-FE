import * as _ from './style';
import { Header } from '../../Components/Header';
import { useCallback, useState } from 'react';
import { ApplicationViewSearch } from '../../Components/ApplicationView/Search';
import {
	ApplicantInfoQueryStringType,
	selectStudent,
} from '../../Apis/Applications/request';
import { ApplicationViewTable } from '../../Components/ApplicationView/Table';
import { useGetApplicantInfo } from '../../Apis/Applications';

export function ApplicationViewPage() {
	const [searchQueryString, setSearchQueryString] =
		useState<ApplicantInfoQueryStringType>({
			page: 1,
			application_status: '',
			student_name: '',
			recruitment_id: '',
		});

	const applicationQueries = useGetApplicantInfo(searchQueryString);
	const applicationData = applicationQueries[0];
	const applicationPage = applicationQueries[1].data?.total_page_count!;
	const isLoading = applicationQueries.some((result) => result.isLoading);
	const refetchApplication = useCallback(() => {
		applicationQueries.forEach((result) => result.refetch());
	}, [applicationQueries]);

	const allSelectFormIdAndName: selectStudent[] =
		applicationData.data! &&
		applicationData.data?.applications.map((companie) => {
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
					application={applicationData.data!}
					applicationPageNum={applicationPage}
					refetchApplication={applicationData.refetch}
					allSelectFormIdAndName={allSelectFormIdAndName}
					searchQueryString={searchQueryString}
					setSearchQueryString={setSearchQueryString}
				/>
			</_.Wrapper>
		</>
	);
}
