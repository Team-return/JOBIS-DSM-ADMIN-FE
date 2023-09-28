import * as _ from './style';
import { CompanyRecruitmentSearch } from '../../Components/CompanyRecruitment/Search';
import { CompanyRecruitmentTable } from '../../Components/CompanyRecruitment/Table';
import { Header } from '../../Components/Header';
import { useCallback, useState } from 'react';
import { QueryStringDataType } from '../../Apis/Companies/request';
import { useGetCompanyRecruitments } from '../../Hooks/ApiHooks/Companies';

export function CompanyRecruitmentPage() {
	const [searchQueryString, setSearchQueryString] =
		useState<QueryStringDataType>({
			page: 1,
			company_type: '',
			region: '',
			company_name: '',
			industry: '',
		});

	const companyRecruitment = useGetCompanyRecruitments(searchQueryString);
	const isLoading = companyRecruitment.some((result) => result.isLoading);
	const refetchCompanyRecruitment = useCallback(() => {
		companyRecruitment.forEach((result) => result.refetch());
	}, [companyRecruitment]);

	const allSelectFormId: number[] =
		companyRecruitment[0].data! &&
		companyRecruitment[0].data?.companies.map((companie) => {
			return companie.company_id;
		});

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
					companyRecruitment={companyRecruitment[0].data!}
					companyRecruitmentPageNum={
						companyRecruitment[1].data?.total_page_count!
					}
					refetchCompanyRecruitment={companyRecruitment[0].refetch}
					allSelectFormId={allSelectFormId}
					searchQueryString={searchQueryString}
					setSearchQueryString={setSearchQueryString}
				/>
			</_.Wrapper>
		</>
	);
}
