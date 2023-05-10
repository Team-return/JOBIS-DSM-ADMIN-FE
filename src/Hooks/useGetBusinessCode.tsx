import { useQuery } from 'react-query';
import { getAllBusinessCode } from '../apis/Code';

export const useGetBusinessCode = () =>
	useQuery(['getBusinessCode'], () => getAllBusinessCode(), {
		refetchOnWindowFocus: true,
	});
