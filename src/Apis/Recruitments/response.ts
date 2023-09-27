export interface RecruitmentFormResponse {
	recruitments: RecruitmentFormType[];
}

export interface RecruitmentFormType {
	id: string;
	recruitment_status: string;
	company_name: string;
	company_type: string;
	recruitment_job: string;
	recruitment_count: number;
	application_requested_count: number;
	application_approved_count: number;
	start: string;
	end: string;
	military_support: boolean;
}

export interface RecruitmentFormDetailResponse {
	company_id: number;
	company_profile_url: string;
	company_name: string;
	areas: AreasType[];
	preferential_treatment: string;
	required_grade: number | null;
	work_hours: number;
	required_licenses: string[];
	hiring_progress: string[];
	train_pay: number;
	pay: number;
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
}