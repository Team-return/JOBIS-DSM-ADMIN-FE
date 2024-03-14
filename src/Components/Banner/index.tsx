import { Button } from '@team-return/design-system';
import * as _ from './style';
import { BannerDetail } from './BannerDetail.tsx';
import { useState } from 'react';

export function Banner() {
	const [bannerStatus, setBannerStatus] = useState('current');

	const handleBtnClick = (status: 'current' | 'notPublished') => {
		setBannerStatus(status);
	};
	return (
		<_.Container>
			<_.Wrapper>
				<Button kind="Solid">+ 배너 만들기</Button>
				<Button kind="Ghost">선택</Button>
			</_.Wrapper>
			<_.BannerWrapper>
				<_.Wrapper>
					{bannerStatus === 'current' ? (
						<_.Title>현재 게시되어있는 배너</_.Title>
					) : (
						<_.Title>아직 게시되어있지 않은 배너</_.Title>
					)}
					<_.ButtonWrapper>
						<_.Btn
							onClick={() => handleBtnClick('current')}
							active={bannerStatus === 'current'}
						>
							현재 게시 된 배너
						</_.Btn>
						<_.Btn
							onClick={() => handleBtnClick('notPublished')}
							active={bannerStatus === 'notPublished'}
						>
							아직 게시 안 된 배너
						</_.Btn>
					</_.ButtonWrapper>
				</_.Wrapper>
				<BannerDetail />
				<BannerDetail />
				<BannerDetail />
			</_.BannerWrapper>
		</_.Container>
	);
}
