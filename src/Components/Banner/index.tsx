import { Button } from '@team-return/design-system';
import banner from '../../Assets/PNG/banner.png';
import * as _ from './styled';

export function Banner() {
	return (
		<_.Container>
			<_.ButtonWrapper>
				<Button kind="Solid">+ 배너 만들기</Button>
				<Button kind="Ghost">선택</Button>
			</_.ButtonWrapper>
			<_.BannerWrapper>
				<_.Title>현재 보여지는 배너</_.Title>
				<_.BannerImg src={banner} />
				<_.BannerImg src={banner} />
				<_.BannerImg src={banner} />
				<_.BannerImg src={banner} />
			</_.BannerWrapper>
		</_.Container>
	);
}
