import { useNoticeDetailData } from '../../../Apis/Notices';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../../Components/Header';
import { Icon } from '@team-return/design-system';
import { useDeleteNotice } from '../../../Apis/Notices';
import * as _ from './style';
import { AttachedBox } from '../../../Components/Notice/AttachedBox';

export function NoticeDetailPage() {
	const { id } = useParams<{ id: any }>();
	const { noticeDetail } = useNoticeDetailData(id);
	const items = [noticeDetail];

	const navigate = useNavigate();
	const { mutate: deleteNotice } = useDeleteNotice(id, {
		onSuccess: () => {
			navigate('/Notice');
		},
		onError: (error) => {
			console.error('notice delete error:', error);
		},
	});

	const handleDeleteClick = () => {
		if (window.confirm('공지사항을 삭제하시겠습니까?')) {
			deleteNotice();
		}
	};

	return (
		<>
			<Header />
			<_.Wrapper>
				<_.Background>
					<_.Box>
						<_.HeaderWrapper>
							<_.Title>{noticeDetail?.title}</_.Title>
							<_.IconWrapper>
								<_.IconBox>
									<Icon
										icon="Trash"
										color={'gray90'}
										size={40}
										onClick={handleDeleteClick}
									></Icon>
								</_.IconBox>
								<_.IconBox>
									<Icon
										icon="EditPencil"
										color={'gray90'}
										size={26}
									></Icon>
								</_.IconBox>
							</_.IconWrapper>
						</_.HeaderWrapper>
						<_.Date>
							{noticeDetail?.created_at.substring(0, 10)}
						</_.Date>
						<_.Contents>{noticeDetail?.content}</_.Contents>
						{items?.map((item) => (
							<AttachedBox props={item?.attachments || []} />
						))}
					</_.Box>
				</_.Background>
			</_.Wrapper>
		</>
	);
}
