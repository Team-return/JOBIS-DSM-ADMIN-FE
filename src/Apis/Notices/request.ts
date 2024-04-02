export interface NoticeWrite {
	title: string;
	content: string;
	attachments: string[];
}

export interface NoticeDelete {
	noticeId: string;
}