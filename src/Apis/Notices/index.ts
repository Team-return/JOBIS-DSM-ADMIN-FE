import { NoticeWrite, NoticeEdit } from './request';
import { MutationOptions, useMutation } from 'react-query';
import { instance } from '../axios';
import { NoticeListResponse } from './response';
import { useCallback, useEffect, useState } from 'react';
import { NoticeDetailResponse } from './response';
import { useToastStore } from '@team-return/design-system';

const router = '/notices';

/** 공지사항 작성 */
export const useNoticeWriteData = () => {
	const { append } = useToastStore();
	return useMutation(
		async (noticeData: NoticeWrite) => {
			const { data } = await instance.post(`${router}`, noticeData);
			return data;
		},
		{
			onError: () => {
				append({
					title: '공지 작성에 실패했습니다.',
					message: '',
					type: 'RED',
				});
			},
		}
	);
};

/** 공지사항 수정 */
export const useNoticeEditData = (noticeId: string) => {
	const { append } = useToastStore();
	return useMutation(
		async (noticeData: NoticeEdit) => {
			const { data } = await instance.patch(
				`${router}/${noticeId}`,
				noticeData
			);
			return data;
		},
		{
			onError: () => {
				append({
					title: '공지 수정에 실패했습니다.',
					message: '',
					type: 'RED',
				});
			},
		}
	);
};

/** 공지사항 상세보기 조회 */
export const useNoticeDetailData = (noticeId: string) => {
	const [noticeDetail, setNoticeDetail] =
		useState<NoticeDetailResponse | null>(null);
	const { append } = useToastStore();

	const fetchNoticeDetail = (noticeId: string) => {
		return instance
			.get(`${router}/${noticeId}`)
			.then((response) => {
				const data = response.data;
				const fetchedNoticeDetail: NoticeDetailResponse = {
					title: data.title,
					content: data.content,
					created_at: new Date(data.created_at).toISOString(),
					attachments: data.attachments
						? data.attachments.map((attachment: any) => ({
								url: attachment.url,
								type: attachment.type,
						  }))
						: [],
				};

				setNoticeDetail(fetchedNoticeDetail);
			})
			.catch(() => {
				append({
					title: '공지 상세보기에 실패했습니다.',
					message: '',
					type: 'RED',
				});
			});
	};

	useState(() => {
		fetchNoticeDetail(noticeId);
	});

	return { noticeDetail };
};

/** 공지사항 리스트 조희 */
export const useNoticeListData = () => {
	const [notices, setNotices] = useState<NoticeListResponse[]>([]);
	const { append } = useToastStore();

	const fetchNoticeList = useCallback(() => {
		return instance
			.get(`${router}`)
			.then((response) => {
				const data = response.data;

				const fetchedNotices: NoticeListResponse[] = data.notices.map(
					(notice: any) => ({
						id: notice.id,
						title: notice.title,
						created_at: new Date(notice.created_at).toISOString(),
					})
				);
				setNotices(fetchedNotices);
			})
			.catch(() => {
				append({
					title: '공지 상세보기에 실패했습니다.',
					message: '',
					type: 'RED',
				});
			});
	}, [append]);

	useEffect(() => {
		fetchNoticeList();
	}, [fetchNoticeList]);

	return { notices };
};

/** 공지사항 삭제 */
export const useDeleteNotice = (noticeId: string, options: MutationOptions) => {
	return useMutation(
		async () =>
			instance.delete(`${router}/${noticeId}`, {
				data: { 'notice-id': noticeId },
			}),
		{
			...options,
		}
	);
};
