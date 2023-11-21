import { useCallback, useEffect, useState } from 'react';
import * as _ from './style';
import { RecruitmentFormQueryStringType } from '../../Apis/Recruitments/request';
import { Header } from '../../Components/Header';
import { RecruitmentFormSearch } from '../../Components/RecruitmentForm/Search';
import { RecruitmentFormTable } from '../../Components/RecruitmentForm/Table';
import { useGetRecruitmentForm } from '../../Apis/Recruitments';

export function RecruitmentFormPage() {
	const date = new Date(); // 현재 날짜 및 시간
	const iYear = date.getFullYear(); // 연도

	const [
		searchRecruitmentFormQueryString,
		setSearchRecruitmentFormQueryString,
	] = useState<RecruitmentFormQueryStringType>({
		year: String(iYear),
		company_name: '',
		start: ``,
		end: ``,
		status: '',
		winter_intern: null,
		page: 1,
	});
	const recruitmentFormQueries = useGetRecruitmentForm(
		searchRecruitmentFormQueryString
	);
	const recruitmentFormData = recruitmentFormQueries[0];
	const recruitmentFormPage =
		recruitmentFormQueries[1].data?.total_page_count!;
	const isLoading = recruitmentFormQueries.some((result) => result.isLoading);
	const allRefetchRecruitmentForm = useCallback(() => {
		recruitmentFormQueries.forEach((result) => result.refetch());
	}, [recruitmentFormQueries]);

	const allSelectFormId: string[] =
		recruitmentFormData.data! &&
		recruitmentFormData.data?.recruitments.map((recruitment) => {
			return recruitment.id;
		});

	useEffect(() => {
		recruitmentFormQueries[1].refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			<_.Wrapper>
				<RecruitmentFormSearch
					searchRecruitmentFormQueryString={
						searchRecruitmentFormQueryString
					}
					setSearchRecruitmentFormQueryString={
						setSearchRecruitmentFormQueryString
					}
					refetchRecruitmentForm={allRefetchRecruitmentForm}
				/>
				<RecruitmentFormTable
					allSelectFormId={allSelectFormId}
					recruitmentForm={recruitmentFormData.data!}
					recruitmentFormPageNum={recruitmentFormPage}
					refetchRecruitmentForm={recruitmentFormData.refetch}
					searchRecruitmentFormQueryString={
						searchRecruitmentFormQueryString
					}
					setSearchRecruitmentFormQueryString={
						setSearchRecruitmentFormQueryString
					}
					recruitmentFormIsLoading={isLoading}
				/>
			</_.Wrapper>
		</>
	);
}
