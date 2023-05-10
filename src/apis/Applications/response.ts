export interface ApplicationResponse {
	applications: ApplicationType[];
}

export interface ApplicationType {
	application_id: number;
	student_name: string;
	student_gcn: string;
	company_name: string;
	application_attachment_url: string[];
	created_at: string;
	application_status: string;
}
