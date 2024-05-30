import { Button } from '@team-return/design-system';
import * as _ from './style';
import { BannerDetail } from './BannerDetail.tsx';
import { useState } from 'react';
import { useDeleteBanner } from '../../Apis/Banners';
import { Link } from 'react-router-dom';
import { DeleteAlarm } from './DeleteAlarm';
import { useQueryClient } from 'react-query';

export function Banner() {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [showDeleteAlarm, setShowDeleteAlarm] = useState(false);
	const [id, setId] = useState<number | null>(null);

	const queryClient = useQueryClient();

	const handleBtnClick = () => {
		setIsOpen(!isOpen);
	};

	const onDelete = async () => {
		if (id) {
			await DeleteBannersAPI.mutateAsync();
			queryClient.fetchQuery(['getBannerList']);
			window.location.reload();
		}
		setShowDeleteAlarm(false);
	};

	const DeleteBannersAPI = useDeleteBanner(id!, {
		onSuccess: () => {},
		onError: () => {},
	});

	return (
		<_.Container>
			<_.Wrapper>
				<Link to="/CreateBanner">
					<Button kind="Solid">+ 배너 만들기</Button>
				</Link>
			</_.Wrapper>
			<_.BannerWrapper>
				<_.Wrapper>
					{isOpen === false ? (
						<_.Title>아직 게시되어있지 않은 배너</_.Title>
					) : (
						<_.Title>현재 게시되어있는 배너</_.Title>
					)}
					<_.ButtonWrapper>
						<_.Btn
							onClick={() => handleBtnClick()}
							active={isOpen === true}
						>
							현재 게시 된 배너
						</_.Btn>
						<_.Btn
							onClick={() => handleBtnClick()}
							active={isOpen === false}
						>
							아직 게시 안 된 배너
						</_.Btn>
					</_.ButtonWrapper>
				</_.Wrapper>
				<BannerDetail
					onDelete={(id) => {
						setId(id);
						setShowDeleteAlarm(true);
					}}
					isOpen={isOpen}
				/>
			</_.BannerWrapper>
			{showDeleteAlarm && (
				<DeleteAlarm
					onCancel={() => setShowDeleteAlarm(false)}
					onConfirm={onDelete}
				/>
			)}
		</_.Container>
	);
}
