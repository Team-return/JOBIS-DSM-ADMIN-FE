export interface CombinedStudentListResponse {
	field_trainees_response: InternshipStudentListType[];
	acceptances_response: EmploymentContractStudentListType[];
}

export interface InternshipStudentListType {
	application_id: number;
	student_gcn: string;
	student_name: string;
	start_date: string;
	end_date: string;
}

export interface EmploymentContractStudentListType {
	acceptance_id: number;
	student_gcn: string;
	student_name: string;
	contract_date: string;
}
