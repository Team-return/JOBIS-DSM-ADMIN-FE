export interface CompanyRecruitmentResponse {
	companies: CompanyRecruitmentType[];
}

export interface CompanyRecruitmentType {
	company_id: number;
	company_name: string;
	region: string;
	business_area: string;
	workers_count: number;
	take: number;
	convention: boolean;
	personal_contact: boolean;
	company_type: string;
	recent_recruit_year: number;
	total_acceptance_count: number;
	review_count: number;
}
