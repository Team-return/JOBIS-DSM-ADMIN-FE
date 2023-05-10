import { useState } from 'react';
import { useRecruitmentForm } from '../../Hooks/useRecruitments';
import * as _ from './style';
import { RecruitmentFormQueryStringType } from '../../apis/Recruitments/request';
import { Header } from '../../Components/Header';
import { RecruitmentFormSearch } from '../../Components/RecruitmentForm/Search';
import { RecruitmentFormTable } from '../../Components/RecruitmentForm/Table';

export function RecruitmentFormPage() {
	const date = new Date(); // 현재 날짜 및 시간
	const iYear = date.getFullYear(); // 연도

	const [searchRecruitmentFormQueryString, setSearchRecruitmentFormQueryString] = useState<RecruitmentFormQueryStringType>({
		year: String(iYear),
		company_name: '',
		start: ``,
		end: ``,
		status: '',
		page: 1,
	});
	const { data: recruitmentForm, refetch: refetchRecruitmentForm } = useRecruitmentForm(searchRecruitmentFormQueryString);

	const AllSelectFormId: string[] =
		recruitmentForm! &&
		recruitmentForm.recruitments.map((recruitment) => {
			return recruitment.id;
		});

	return (
		<>
			<Header />
			<_.Wrapper>
				<RecruitmentFormSearch
					searchRecruitmentFormQueryString={searchRecruitmentFormQueryString}
					setSearchRecruitmentFormQueryString={setSearchRecruitmentFormQueryString}
					refetchRecruitmentForm={refetchRecruitmentForm}
				/>
				<RecruitmentFormTable
					AllSelectFormId={AllSelectFormId}
					recruitmentForm={recruitmentForm!}
					refetchRecruitmentForm={refetchRecruitmentForm}
					searchRecruitmentFormQueryString={searchRecruitmentFormQueryString}
					setSearchRecruitmentFormQueryString={setSearchRecruitmentFormQueryString}
				/>
			</_.Wrapper>
		</>
	);
}
