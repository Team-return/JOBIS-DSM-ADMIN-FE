import { MutationOptions, useMutation, useQuery } from 'react-query';
import { instance } from '../axios';

const router = '/banners';

export const useCreateBanners = (
	banner_url: string,
	banner_type: string,
	start_date: string,
	end_date: string,
	options: MutationOptions
) => {
	const data = {
		banner_url,
		banner_type,
		start_date,
		end_date,
	};
	return useMutation(async () => instance.post(`${router}`, data), {
		...options,
	});
};

export const useGetBannerList = (
	is_opened: boolean,
	options: MutationOptions
) => {
	const params = {
		is_opened,
	};
	return useMutation(
		async () =>
			instance.get(`${router}/teacher`, {
				params: params,
			}),
		{
			...options,
		}
	);
};

export const useDeleteBanner = (
	banner_id: number,
	options: MutationOptions
) => {
	return useMutation(
		async () => {
			const { data } = await instance.delete(`${router}/${banner_id}`);
			return data;
		},
		{
			...options,
		}
	);
};
