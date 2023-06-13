export interface CompanyRecruitmentResponse {
	companies: CompanyRecruitmentType[];
	total_page_count: number;
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

export interface EmployableCompaniesResponse {
	companies: EmployableCompaniesType[];
}

export interface EmployableCompaniesType {
	company_id: number;
	company_name: string;
	field_trainee_count: number;
	contract_count: number;
}
