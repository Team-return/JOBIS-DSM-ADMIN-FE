import * as _ from './style';
import banner from '../../../Assets/PNG/banner.png';

export function BannerDetail() {
	return (
		<_.Container>
			<_.BannerImg src={banner} />
			<_.Wrapper>
				<_.TextWrapper>
					<_.Text>이동 되는 페이지</_.Text>
					<_.TextContent>체험형 현장실습</_.TextContent>
				</_.TextWrapper>
				<_.TextWrapper>
					<_.Text>표시 기간</_.Text>
					<_.TextContent>
						2024년 2월 24일 ~ 2024년 2월 27일
					</_.TextContent>
				</_.TextWrapper>
			</_.Wrapper>
		</_.Container>
	);
}
