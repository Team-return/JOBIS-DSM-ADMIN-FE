export interface ApplicationResponse {
	applications: ApplicationType[];
}

export interface ApplicationType {
	application_id: number;
	student_name: string;
	student_gcn: string;
	company_name: string;
	attachments: AttachmentUrlType[];
	created_at: string;
	application_status: string;
}

export interface AttachmentUrlType {
	url: string;
	type: string;
}

export interface InternshipStudentResponse {
	students: ApplicationType[];
}

export interface InternshipStudentType {
	application_id: number;
	student_name: string;
	student_gcn: string;
}
