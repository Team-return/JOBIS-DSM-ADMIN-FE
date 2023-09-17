import { useQuery } from 'react-query';
import { getRequiredLicensesList } from '../../Apis/OpenApi';

/** 국가 자격 목록 조회하는 api입니다. */
export function useGetRequiredLicensesList(page: number, perPage: number) {
	return useQuery(
		['getRequiredLicensesList', page, perPage],
		() => getRequiredLicensesList(page, perPage),
		{
			refetchOnWindowFocus: true,
		}
	);
}
