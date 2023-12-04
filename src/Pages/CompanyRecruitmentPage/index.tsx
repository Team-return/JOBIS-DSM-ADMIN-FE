import * as _ from './style';
import { CompanyRecruitmentSearch } from '../../Components/CompanyRecruitment/Search';
import { CompanyRecruitmentTable } from '../../Components/CompanyRecruitment/Table';
import { Header } from '../../Components/Header';
import { useCallback, useEffect } from 'react';
import { useGetCompanyRecruitments } from '../../Apis/Companies';
import { useCompanyRecruitmentQueryString } from '../../Store/State';

export function CompanyRecruitmentPage() {
	const { companyRecruitmentQueryString } =
		useCompanyRecruitmentQueryString();

	const companyRecruitmentQueries = useGetCompanyRecruitments(
		companyRecruitmentQueryString
	);
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
		refetchCompanyRecruitment();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			<_.Wrapper>
				<CompanyRecruitmentSearch
					refetchCompanyRecruitment={refetchCompanyRecruitment}
				/>
				<CompanyRecruitmentTable
					companyRecruitmentIsLoading={isLoading}
					companyRecruitment={companyRecruitmentData.data!}
					companyRecruitmentPageNum={companyRecruitmentPage}
					refetchCompanyRecruitment={companyRecruitmentData.refetch}
					allSelectFormId={allSelectFormId}
				/>
			</_.Wrapper>
		</>
	);
}
