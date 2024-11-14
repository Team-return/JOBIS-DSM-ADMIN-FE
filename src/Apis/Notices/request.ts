import { AttachmentType } from "./response";

export interface NoticeWrite {
	title: string;
	content: string;
	attachments?: AttachmentRequest[];
}

export interface NoticeEdit {
	title: string;
	content: string;
	attachments: AttachmentRequest[];
}

export interface AttachmentRequest {
    url: string;
    type: AttachmentType;
}

export interface NoticeDelete {
	noticeId: string;
}