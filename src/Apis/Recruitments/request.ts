export type StatusType = 'REQUESTED' | 'READY' | 'RECRUITING' | 'DONE' | '';

export interface RecruitmentFormQueryStringType {
	year: string;
	company_name: string;
	start: string;
	end: string;
	status: StatusType;
	page: number;
}
