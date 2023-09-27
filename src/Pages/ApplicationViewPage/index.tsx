import * as _ from './style';
import { Header } from '../../Components/Header';
import { useCallback, useState } from 'react';
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

	const application = useGetApplicantInfo(searchQueryString);
	const isLoading = application.some((result) => result.isLoading);
	const refetchApplication = useCallback(() => {
		application.forEach((result) => result.refetch());
	}, [application]);

	const allSelectFormIdAndName: selectStudent[] =
		application[0].data! &&
		application[0].data?.applications.map((companie) => {
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
					application={application[0].data!}
					applicationPageNum={application[1].data?.total_page_count!}
					refetchApplication={application[0].refetch}
					allSelectFormIdAndName={allSelectFormIdAndName}
					searchQueryString={searchQueryString}
					setSearchQueryString={setSearchQueryString}
				/>
			</_.Wrapper>
		</>
	);
}
