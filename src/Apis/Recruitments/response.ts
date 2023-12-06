export interface RecruitmentFormResponse {
	recruitments: RecruitmentFormType[];
}

export interface RecruitmentFormType {
	application_approved_count: number;
	application_requested_count: number;
	company_id: number;
	company_name: string;
	company_type: string;
	end_date: string;
	hiring_jobs: string;
	id: number;
	start_date: string;
	status: string;
	total_hiring_count: number;
}

export interface RecruitmentFormDetailResponse {
	company_id: number;
	company_profile_url: string;
	company_name: string;
	areas: AreasType[];
	required_grade: number | null;
	start_time: string;
	end_time: string;
	required_licenses: string[];
	hiring_progress: string[];
	train_pay: number;
	pay: string | null;
	benefits: string | null;
	military: true;
	submit_document: string;
	start_date: string;
	end_date: string;
	etc: string | null;
}

export interface AreasType {
	id: number;
	job: string[];
	tech: string[];
	hiring: number;
	major_task: string;
	preferential_treatment: string | null;
}
