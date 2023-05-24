export type StatusType = 'REQUESTED' | 'APPROVED' | 'FAILED' | 'PASS' | 'REJECTED' | '';

export interface ApplicantInfoQueryStringType {
	page?: number;
	application_status: string | StatusType;
	student_name: string;
	company_id: string;
}

export interface TrainDate {
	start_date: Date;
	end_date: Date;
}

export interface RejectReason {
	reason: string;
}
