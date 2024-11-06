export interface QueryStringDataType {
	page: number;
	company_type: string;
	region: string;
	company_name: string;
	industry: string;
}

export interface EmployableCompaniesPropsType {
	company_name: string;
	company_type: string;
	year: string;
	page: number;
}

export interface CompanyInfoEditType {
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
	worker_number: number;
	take: number;
	service_name: string;
	company_profile_url: string;
	representative_phone_no: string;
	headquarter: boolean;
}
