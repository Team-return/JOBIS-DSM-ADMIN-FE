import * as _ from './style';
import { useGetBannerList } from '../../../Apis/Banners';
import { BannerNameType } from '../../../Apis/Banners/response';
import deleteimg from '../../../Assets/SVG/delete.svg';
import { BannerType } from '../../../Utils/Translation';
interface Props {
	onDelete: (id: number) => void;
	isOpen: boolean;
}

export function BannerDetail({ onDelete, isOpen }: Props) {
	const { data } = useGetBannerList(isOpen);

	Object.freeze(BannerType);

	return (
		<_.Container>
			{data?.banners.map((banner) => (
				<_.BannerDetails key={banner.id}>
					<_.BannerImg src={banner.banner_url} />
					<_.DeleteBackground
						onClick={() => {
							onDelete(banner.id);
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
