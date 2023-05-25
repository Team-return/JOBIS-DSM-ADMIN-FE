export interface RecruitmentFormResponse {
	recruitments: RecruitmentFormType[];
	total_page_count: number;
}

export interface RecruitmentFormType {
	id: string;
	recruitment_status: string;
	company_name: string;
	company_type: string;
	recruitment_job: [];
	recruitment_count: number;
	application_requested_count: number;
	application_approved_count: number;
	start: string;
	end: string;
	military_support: boolean;
}
