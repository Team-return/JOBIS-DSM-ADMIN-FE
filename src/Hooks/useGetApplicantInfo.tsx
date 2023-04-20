import { useQuery } from 'react-query';
import { getApplicantInfo } from '../apis/Applications';
import { ApplicantInfoQueryStringType } from '../apis/Applications/request';

export const useGetApplicantInfo = (applicationQueryString: ApplicantInfoQueryStringType) =>
	useQuery(['getApplicantInfo'], () => getApplicantInfo(applicationQueryString), {
		refetchOnWindowFocus: true,
	});
