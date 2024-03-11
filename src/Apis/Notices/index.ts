import { NoticeWrite } from "./request";
import { useMutation } from "react-query";
import { instance } from "../axios";

export const useNoticeWriteData = (noticeData: NoticeWrite) => {
    const formData = new FormData()
    noticeData.attachments.forEach((attachment) => { formData.append('file', attachment) })
    
    return useMutation(
        async () => {
            const { data } = await instance.post(`${process.env.REACT_APP_BASE_URL}/notices`, {...noticeData, attachments: formData});
            return data;
        },
        {
            onError: (error: Error) => {
                console.error("공지 작성에 실패하였습니다:", error.message);
            }
        }
    )
}

