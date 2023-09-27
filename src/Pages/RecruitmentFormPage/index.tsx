import { useCallback, useState } from 'react';
import * as _ from './style';
import { RecruitmentFormQueryStringType } from '../../Apis/Recruitments/request';
import { Header } from '../../Components/Header';
import { RecruitmentFormSearch } from '../../Components/RecruitmentForm/Search';
import { RecruitmentFormTable } from '../../Components/RecruitmentForm/Table';
import { useGetRecruitmentForm } from '../../Hooks/ApiHooks/Recruitments';

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
		page: 1,
	});
	const recruitmentForm = useGetRecruitmentForm(
		searchRecruitmentFormQueryString
	);
	const isLoading = recruitmentForm.some((result) => result.isLoading);
	const allRefetchRecruitmentForm = useCallback(() => {
		recruitmentForm.forEach((result) => result.refetch());
	}, [recruitmentForm]);

	const allSelectFormId: string[] =
		recruitmentForm[0].data! &&
		recruitmentForm[0].data?.recruitments.map((recruitment) => {
			return recruitment.id;
		});

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
					recruitmentForm={recruitmentForm[0].data!}
					recruitmentFormPageNum={
						recruitmentForm[1].data?.total_page_count!
					}
					refetchRecruitmentForm={recruitmentForm[0].refetch}
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
