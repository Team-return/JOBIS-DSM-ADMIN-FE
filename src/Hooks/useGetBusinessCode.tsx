import { useQuery } from 'react-query';
import { getAllBusinessCode } from '../Apiss/Code';

export const useGetBusinessCode = () =>
	useQuery(['getBusinessCode'], () => getAllBusinessCode(), {
		refetchOnWindowFocus: true,
	});
