import { useCallback, useEffect } from 'react';
import * as _ from './style';
import { Header } from '../../Components/Header';
import { RecruitmentFormSearch } from '../../Components/RecruitmentForm/Search';
import { RecruitmentFormTable } from '../../Components/RecruitmentForm/Table';
import { useGetRecruitmentForm } from '../../Apis/Recruitments';
import { useRecruitmentFormQueryString } from '../../Store/State';

export function RecruitmentFormPage() {
	const { recruitmentFormQueryString } = useRecruitmentFormQueryString();

	const recruitmentFormQueries = useGetRecruitmentForm(
		recruitmentFormQueryString
	);
	const recruitmentFormData = recruitmentFormQueries[0];
	const recruitmentFormPage =
		recruitmentFormQueries[1].data?.total_page_count!;
	const recreuitmentFromCount = recruitmentFormQueries[2].data?.count!;
	const isLoading = recruitmentFormQueries.some((result) => result.isLoading);
	const allRefetchRecruitmentForm = useCallback(() => {
		recruitmentFormQueries.forEach((result) => result.refetch());
	}, [recruitmentFormQueries]);

	const allSelectFormId: string[] =
		recruitmentFormData.data! &&
		recruitmentFormData.data?.recruitments.map((recruitment) => {
			return recruitment.id.toString();
		});

	useEffect(() => {
		allRefetchRecruitmentForm();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			<_.Wrapper>
				<RecruitmentFormSearch
					refetchRecruitmentForm={allRefetchRecruitmentForm}
				/>
				<RecruitmentFormTable
					allSelectFormId={allSelectFormId}
					recruitmentForm={recruitmentFormData.data!}
					recruitmentFormPageNum={recruitmentFormPage}
					recreuitmentFromCount={recreuitmentFromCount}
					refetchRecruitmentForm={recruitmentFormData.refetch}
					recruitmentFormIsLoading={isLoading}
				/>
			</_.Wrapper>
		</>
	);
}
