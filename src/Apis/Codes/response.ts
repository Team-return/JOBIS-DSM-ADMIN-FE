export interface CodeResponse {
	codes: CodesType[];
}

export interface CodesType {
	code: number;
	keyword: string;
	job_type?: string;
}
