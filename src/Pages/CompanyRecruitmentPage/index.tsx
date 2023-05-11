import * as _ from './style';
import { CompanyRecruitmentSearch } from '../../Components/CompanyRecruitment/RecruitmentForm/Search';
import { CompanyRecruitmentTable } from '../../Components/CompanyRecruitment/RecruitmentForm/Table';
import { Header } from '../../Components/Header';
import { useState } from 'react';
import { dataType } from '../../Apis/Companies/request';
import { useGetCompanyRecruitments } from '../../Hooks/useGetCompanyRecruitments';

export function CompanyRecruitmentPage() {
	const [searchQueryString, setSearchQueryString] = useState<dataType>({
		page: 1,
		company_type: '',
		region: '',
		company_name: '',
		industry: '',
	});
	const { data: companyRecruitment, refetch: refetchCompanyRecruitment, isLoading } = useGetCompanyRecruitments(searchQueryString);

	const AllSelectFormId: number[] =
		companyRecruitment! &&
		companyRecruitment.companies.map((companie) => {
			return companie.company_id;
		});

	return (
		<>
			<Header />
			<_.Wrapper>
				<CompanyRecruitmentSearch searchQueryString={searchQueryString} setSearchQueryString={setSearchQueryString} refetchCompanyRecruitment={refetchCompanyRecruitment} />
				<CompanyRecruitmentTable
					companyRecruitmentIsLoading={isLoading}
					companyRecruitment={companyRecruitment!}
					refetchCompanyRecruitment={refetchCompanyRecruitment}
					AllSelectFormId={AllSelectFormId}
					searchQueryString={searchQueryString}
					setSearchQueryString={setSearchQueryString}
				/>
			</_.Wrapper>
		</>
	);
}
