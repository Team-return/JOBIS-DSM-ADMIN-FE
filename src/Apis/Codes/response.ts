export interface CodeResponse {
	codes: CodeType[];
}

export interface CodeType {
	code: number;
	keyword: string;
	job_type?: string;
}
