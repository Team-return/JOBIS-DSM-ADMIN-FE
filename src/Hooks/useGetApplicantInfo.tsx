import { useQuery } from 'react-query';
import { getApplicantInfo } from '../Apiss/Applications';
import { ApplicantInfoQueryStringType } from '../Apiss/Applications/request';

export const useGetApplicantInfo = (applicationQueryString: ApplicantInfoQueryStringType) =>
	useQuery(['getApplicantInfo'], () => getApplicantInfo(applicationQueryString), {
		refetchOnWindowFocus: true,
	});
