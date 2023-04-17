import { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import RecruitmentFormSearch from '../../Components/RecruitmentFormCheck/Search';
import RecruitmentFormTable from '../../Components/RecruitmentFormCheck/Table';
import { useRecruitmentForm } from '../../Hooks/useRecruitments';
import * as _ from './style';
import { RecruitmentFormQueryStringType } from '../../apis/RecruitmentForm/request';

const RecruitmentFormPage = () => {
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

	const AllSelectFormId: string[] = recruitmentForm! && recruitmentForm.recruitments.map((res) => {
		return res.id;
	})

	return (
		<>
			<Header />
			<_.Wrapper>
				<RecruitmentFormSearch
					searchRecruitmentFormQueryString={searchRecruitmentFormQueryString}
					setSearchRecruitmentFormQueryString={setSearchRecruitmentFormQueryString}
					refetchRecruitmentForm={refetchRecruitmentForm}
				/>
				<RecruitmentFormTable AllSelectFormId={AllSelectFormId} recruitmentForm={recruitmentForm!} refetchRecruitmentForm={refetchRecruitmentForm} />
			</_.Wrapper>
		</>
	);
};

export default RecruitmentFormPage;
