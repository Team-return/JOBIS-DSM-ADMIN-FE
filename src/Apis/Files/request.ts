export interface PresignedUrlRequest {
	files: FileInfoType[];
}

export interface FileInfoType {
	type: string;
	file_name: string;
}
