export type StatusType = 'REQUESTED' | 'APPROVED' | '';

export interface ApplicantInfoQueryStringType {
	application_status: StatusType;
	student_name: string;
	company_id: number;
}
