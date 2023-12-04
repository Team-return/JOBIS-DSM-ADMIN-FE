import * as _ from './style';
import { Header } from '../../Components/Header';
import { useCallback, useEffect, useState } from 'react';
import { ApplicationViewSearch } from '../../Components/ApplicationView/Search';
import {
	ApplicantInfoQueryStringType,
	selectStudent,
} from '../../Apis/Applications/request';
import { ApplicationViewTable } from '../../Components/ApplicationView/Table';
import { useGetApplicantInfo } from '../../Apis/Applications';
import { useApplicationViewQueryString } from '../../Store/State';

export function ApplicationViewPage() {
	const { applicationViewQueryString } = useApplicationViewQueryString();

	const applicationQueries = useGetApplicantInfo(applicationViewQueryString);
	const applicationData = applicationQueries[0];
	const applicationPage = applicationQueries[1].data?.total_page_count!;
	const isLoading = applicationQueries.some((result) => result.isLoading);
	const refetchApplication = useCallback(() => {
		applicationQueries.forEach((result) => result.refetch());
	}, [applicationQueries]);

	const allSelectFormIdAndName: selectStudent[] =
		applicationData.data! &&
		applicationData.data?.applications.map((companie) => {
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
					application={applicationData.data!}
					applicationPageNum={applicationPage}
					refetchApplication={applicationData.refetch}
					allSelectFormIdAndName={allSelectFormIdAndName}
				/>
			</_.Wrapper>
		</>
	);
}
