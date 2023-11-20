export interface RecruitmentFormQueryStringType {
	year: string;
	company_name: string;
	start: string;
	end: string;
	status: string;
	page: number;
}

export interface EditRecruitmentRequest {
	required_licenses: string[];
	required_grade?: number | null;
	start_time: string;
	end_time: string;
	train_pay: number;
	pay: string | null;
	benefits: string | null;
	military: boolean;
	hiring_progress: string[];
	submit_document: string;
	start_date: string;
	end_date: string;
	etc: string | null;
}

export interface EditAreasType {
	job_codes: number[];
	tech_codes: number[];
	hiring: number;
	major_task: string;
}
