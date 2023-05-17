import { useQuery } from 'react-query';
import { getApplicantInfo } from '../../Apis/Applications';
import { ApplicantInfoQueryStringType } from '../../Apis/Applications/request';

/** 지원서를 조회하는 api입니다. */
export function useGetApplicantInfo(applicationQueryString: ApplicantInfoQueryStringType) {
	return useQuery(['getApplicantInfo', applicationQueryString], () => getApplicantInfo(applicationQueryString), {
		refetchOnWindowFocus: true,
	});
}
