export interface BusinessCodeResponse {
	codes: BusinessCodeType[];
}

export interface BusinessCodeType {
	code: number;
	keyword: string;
}
