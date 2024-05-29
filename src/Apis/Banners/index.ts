import { MutationOptions, useMutation, useQuery } from 'react-query';
import { instance } from '../axios';
import { BannerListResponse } from './response';
import { useToastStore } from '@team-return/design-system';

const router = '/banners';

export const useCreateBanners = (
	detail_id: number,
	banner_type: string,
	start_date: string,
	end_date: string
) => {
	const data = {
		detail_id,
		banner_type,
		start_date,
		end_date,
	};
	const { append } = useToastStore();

	return useMutation(
		async (banner_url: string) =>
			instance.post(`${router}`, { ...data, banner_url }),
		{
			onSuccess: () => {
				append({
					title: '성공적으로 추가되었습니다.',
					message: '',
					type: 'GREEN',
				});
			},
			onError: () => {
				append({
					title: '추가에 실패했습니다.',
					message: '',
					type: 'RED',
				});
			},
		}
	);
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
