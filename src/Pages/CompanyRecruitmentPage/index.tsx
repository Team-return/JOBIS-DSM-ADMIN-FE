import * as _ from './style';
import { CompanyRecruitmentSearch } from '../../Components/CompanyRecruitment/Search';
import { CompanyRecruitmentTable } from '../../Components/CompanyRecruitment/Table';
import { Header } from '../../Components/Header';
import { useCallback, useEffect, useState } from 'react';
import { QueryStringDataType } from '../../Apis/Companies/request';
import { useGetCompanyRecruitments } from '../../Apis/Companies';

export function CompanyRecruitmentPage() {
	const [searchQueryString, setSearchQueryString] =
		useState<QueryStringDataType>({
			page: 1,
			company_type: '',
			region: '',
			company_name: '',
			industry: '',
		});

	const companyRecruitmentQueries =
		useGetCompanyRecruitments(searchQueryString);
	const companyRecruitmentData = companyRecruitmentQueries[0];
	const companyRecruitmentPage =
		companyRecruitmentQueries[1].data?.total_page_count!;
	const isLoading = companyRecruitmentQueries.some(
		(result) => result.isLoading
	);
	const refetchCompanyRecruitment = useCallback(() => {
		companyRecruitmentQueries.forEach((result) => result.refetch());
	}, [companyRecruitmentQueries]);

	const allSelectFormId: number[] =
		companyRecruitmentData.data! &&
		companyRecruitmentData.data?.companies.map((companie) => {
			return companie.company_id;
		});

	useEffect(() => {
		companyRecruitmentQueries[1].refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			<_.Wrapper>
				<CompanyRecruitmentSearch
					setSearchQueryString={setSearchQueryString}
					refetchCompanyRecruitment={refetchCompanyRecruitment}
				/>
				<CompanyRecruitmentTable
					companyRecruitmentIsLoading={isLoading}
					companyRecruitment={companyRecruitmentData.data!}
					companyRecruitmentPageNum={companyRecruitmentPage}
					refetchCompanyRecruitment={companyRecruitmentData.refetch}
					allSelectFormId={allSelectFormId}
					searchQueryString={searchQueryString}
					setSearchQueryString={setSearchQueryString}
				/>
			</_.Wrapper>
		</>
	);
}
