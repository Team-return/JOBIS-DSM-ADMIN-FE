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

export interface EmployableCompaniesResponse {
	companies: EmployableCompaniesType[];
}

export interface EmployableCompaniesType {
	company_id: number;
	company_name: string;
	field_trainee_count: number;
	contract_count: number;
}

export interface CompanyDetailResponse {
	business_number: string;
	company_name: string;
	company_profile_url: string;
	company_introduce: string;
	main_zip_code: string;
	main_address: string;
	main_address_detail: string;
	sub_zip_code: string | null;
	sub_address: string | null;
	sub_address_detail: string | null;
	manager_name: string;
	manager_phone_no: string;
	sub_manager_name: string | null;
	sub_manager_phone_no: string | null;
	fax: string | null;
	email: string;
	representative_name: string;
	representative_phone_no: string;
	founded_at: string;
	worker_number: number;
	take: number;
	recruitment_id: number | null;
	attachments: string[];
	service_name: string;
	business_area: string;
	business_area_code: number;
	biz_registration_url: string;
	headquarter: boolean;
}
