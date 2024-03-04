export type StatusType =
	| 'REQUESTED'
	| 'APPROVED'
	| 'FAILED'
	| 'PASS'
	| 'REJECTED'
	| 'SEND'
	| '';

export interface ApplicantInfoQueryStringType {
	page?: number;
	application_status: string | StatusType;
	student_name: string;
	recruitment_id: string;
	year: string;
}

export interface TrainDate {
	start_date: string;
	end_date: string;
}

export interface RejectReason {
	reason: string;
}

export interface selectStudent {
	id: number;
	name: string;
	status: string;
}
