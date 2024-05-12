import { NoticeWrite, NoticeEdit } from "./request";
import { MutationOptions, useMutation } from "react-query";
import { instance } from "../axios";
import { NoticeListResponse } from "./response";
import { useEffect, useState } from "react";
import { NoticeDetailResponse } from "./response";

/** 공지사항 작성 */
export const useNoticeWriteData = () => {
    return useMutation(
        async (noticeData: NoticeWrite) => {
            const { data } = await instance.post(`/notices`, noticeData);
            return data;
        },
        {
            onError: (error: Error) => {
                console.error("notice write error:", error.message);
            }
        }
    )
}

/** 공지사항 수정 */
export const useNoticeEditData = (noticeId: string) => {
    return useMutation(
        async (noticeData: NoticeEdit) => {
            const { data } = await instance.patch(`/notices/${noticeId}`, noticeData);
            return data;
        },
        {
            onError: (error: Error) => {
                console.error("notice edit error: ", error);
                
            }
        }
    )
}

/** 공지사항 상세보기 조회 */
export const useNoticeDetailData = (noticeId: string) => {
    const [noticeDetail, setNoticeDetail] = useState<NoticeDetailResponse | null>(null);
    
    useEffect(() => {
        const fetchNoticeDetail = async () => {
            
            try {
                const response = await instance.get(`${process.env.REACT_APP_BASE_URL}/notices/${noticeId}`);
                const data = response.data;

                const fetchedNoticeDetail: NoticeDetailResponse = {
                    title: data.title,
                    content: data.content,
                    created_at: new Date(data.created_at).toISOString(),
                    attachments: data.attachments.map((attachment: any) => ({
                        url: attachment.url,
                        type: attachment.type
                    }))
                };
                setNoticeDetail(fetchedNoticeDetail);
            } catch (error: any) {
                console.error('notice detail error:', error.message);
            }
        };
        fetchNoticeDetail();
    }, [noticeId]);

    return { noticeDetail };
};

/** 공지사항 리스트 조희 */
export const useNoticeListData = () => {
    const [notices, setNotices] = useState<NoticeListResponse[]>([]);

    useEffect(() => {
        const fetchNoticeList = async () => {
            try {
                const response = await instance.get(`${process.env.REACT_APP_BASE_URL}/notices`);
                const data = response.data;

                const fetchedNotices: NoticeListResponse[] = data.notices.map((notice: any) => ({
                    id: notice.id,
                    title: notice.title,
                    created_at: new Date(notice.created_at).toISOString()
                }));
                setNotices(fetchedNotices);
            } catch (error: any) {
                console.error('notice list error: ', error.message);
            }
        };
        fetchNoticeList();
    }, []);

    return { notices };
}

/** 공지사항 삭제 */
export const useDeleteNotice = (noticeId: string, options: MutationOptions) => {
    return useMutation(
        async () => instance.delete(`${process.env.REACT_APP_BASE_URL}/notices/${noticeId}`, { data: { "notice-id": noticeId } }),
        {
            ...options
        }
    )
}
