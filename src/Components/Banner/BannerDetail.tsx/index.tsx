import * as _ from './style';
import { useEffect, useState } from 'react';
import { useGetBannerList } from '../../../Apis/Banners';
import { BannerListProps } from '../../../Apis/Banners/response';
import { BannerNameType } from '../../../Apis/Banners/response';
import deleteimg from '../../../Assets/SVG/delete.svg';
interface Props {
	onDelete: (id: number) => void;
}

export function BannerDetail({ onDelete }: Props) {
	const [banners, setBanners] = useState<BannerListProps[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const BannersAPI = useGetBannerList(isOpen, {
		onSuccess: (data: any) => {
			setBanners(data.data.banners);
		},
		onError: () => {},
	});
	console.log(BannersAPI);

	useEffect(() => {
		if (isOpen) BannersAPI.mutate();
	}, [isOpen]);

	const BannerType = {
		RECRUITMENT: '모집의뢰서',
		BOOKMARK: '북마크',
		NONE: '페이지 이동 안함',
		INTERNSHIP: '체험형 현장실습 페이지',
		COMPANY: '기업 상세 페이지',
	};

	Object.freeze(BannerType);

	return (
		<_.Container>
			{banners &&
				banners.length > 0 &&
				banners.map((banner, index) => (
					<_.BannerDetails key={index}>
						<_.BannerImg src={banner.banner_url} />
						<_.DeleteBackground
							onClick={() => {
								onDelete(banner.banner_id);
							}}
						>
							<_.deleteImg src={deleteimg} />
						</_.DeleteBackground>
						<_.Wrapper>
							<_.TextWrapper>
								<_.Text>이동 되는 페이지</_.Text>
								<_.TextContent>
									{
										BannerType[
											banner.banner_type as keyof BannerNameType
										]
									}
								</_.TextContent>
							</_.TextWrapper>
							<_.TextWrapper>
								<_.Text>표시 기간</_.Text>
								<_.TextContent>
									{banner.start_date} ~ {banner.end_date}
								</_.TextContent>
							</_.TextWrapper>
						</_.Wrapper>
					</_.BannerDetails>
				))}
		</_.Container>
	);
}
