import { useQuery } from 'react-query';
import { getInternshipStudent } from '../../Apis/Applications';

/** 현장실습생 전환 눌렀을때 나오는 학생리스트를 조회하는 api입니다. */
export function useGetInternshipStudent(company_id: number) {
	return useQuery(['getInternshipStudent', company_id], () => getInternshipStudent(company_id), {
		refetchOnWindowFocus: true,
	});
}
