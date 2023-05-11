import { useQuery } from 'react-query';
import { getAllBusinessCode } from '../Apis/Code';

export const useGetBusinessCode = () =>
	useQuery(['getBusinessCode'], () => getAllBusinessCode(), {
		refetchOnWindowFocus: true,
	});
