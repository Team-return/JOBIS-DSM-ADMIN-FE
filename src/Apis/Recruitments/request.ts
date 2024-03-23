export interface RecruitmentFormQueryStringType {
	year: string;
	company_name: string;
	start: string;
	end: string;
	status: string;
	winter_intern: boolean | null;
	page: number;
}

export interface EditRecruitmentRequest {
	required_licenses: string[];
	required_grade?: number | null;
	start_time: string;
	end_time: string;
	working_hours: string;
	train_pay: number;
	pay: string | null;
	benefits: string | null;
	military: boolean;
	hiring_progress: string[];
	submit_document: string;
	start_date: string | null;
	end_date: string | null;
	etc: string | null;
	flexible_working: boolean;
}

export interface EditAreasType {
	job_codes: number[];
	tech_codes: number[];
	hiring: number;
	major_task: string;
	preferential_treatment: string;
}
