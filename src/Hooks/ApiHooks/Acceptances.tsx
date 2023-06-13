import { useQuery } from 'react-query';
import { getCombinedStudentList } from '../../Apis/Acceptances';

/** 현장실습 학생과 근로계약 학생을 조회하는 api입니다. */
export function useGetCombinedStudentList(company_id: number) {
	return useQuery(['getCombinedStudentList', company_id], () => getCombinedStudentList(company_id), {
		refetchOnWindowFocus: true,
		enabled: company_id !== 0,
	});
}
