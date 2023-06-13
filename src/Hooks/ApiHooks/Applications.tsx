import { useQuery } from 'react-query';
import { getApplicantInfo } from '../../Apis/Applications';
import { ApplicantInfoQueryStringType } from '../../Apis/Applications/request';
import { getInternshipStudent } from '../../Apis/Applications';
import { getAllRecruitmentForm } from '../../Apis/Recruitments';
import { RecruitmentFormQueryStringType } from '../../Apis/Recruitments/request';

/** 모집의뢰서를 조회하는 api입니다. */
export function useGetRecruitmentForm(
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType
) {
	return useQuery(
		['getAllRecruitmentForm', searchRecruitmentFormQueryString],
		() => getAllRecruitmentForm(searchRecruitmentFormQueryString),
		{
			refetchOnWindowFocus: true,
		}
	);
}

/** 현장실습생 전환 눌렀을때 나오는 학생리스트를 조회하는 api입니다. */
export function useGetInternshipStudent(company_id: number) {
	return useQuery(
		['getInternshipStudent', company_id],
		() => getInternshipStudent(company_id),
		{
			refetchOnWindowFocus: true,
		}
	);
}

/** 지원서를 조회하는 api입니다. */
export function useGetApplicantInfo(
	applicationQueryString: ApplicantInfoQueryStringType
) {
	return useQuery(
		['getApplicantInfo', applicationQueryString],
		() => getApplicantInfo(applicationQueryString),
		{
			refetchOnWindowFocus: true,
		}
	);
}
