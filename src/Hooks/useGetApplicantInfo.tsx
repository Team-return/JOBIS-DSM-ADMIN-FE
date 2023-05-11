import { useQuery } from 'react-query';
import { getApplicantInfo } from '../Apis/Applications';
import { ApplicantInfoQueryStringType } from '../Apis/Applications/request';

export const useGetApplicantInfo = (applicationQueryString: ApplicantInfoQueryStringType) =>
	useQuery(['getApplicantInfo'], () => getApplicantInfo(applicationQueryString), {
		refetchOnWindowFocus: true,
	});
