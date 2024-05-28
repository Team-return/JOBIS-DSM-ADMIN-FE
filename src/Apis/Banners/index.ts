import { MutationOptions, useMutation, useQuery } from 'react-query';
import { instance } from '../axios';
import { BannerListResponse } from './response';

const router = '/banners';

export const useCreateBanners = (
	detail_id: number,
	banner_url: string,
	banner_type: string,
	start_date: string,
	end_date: string,
	options: MutationOptions
) => {
	const data = {
		detail_id,
		banner_url,
		banner_type,
		start_date,
		end_date,
	};
	return useMutation(async () => instance.post(`${router}`, data), {
		...options,
	});
};

export const useGetBannerList = (is_opened: boolean) => {
	const params = {
		is_opened,
	};
	return useQuery(['getBannerList', is_opened], async () => {
		const { data } = await instance.get<BannerListResponse>(
			`${router}/teacher`,
			{
				params,
			}
		);
		return data;
	});
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
