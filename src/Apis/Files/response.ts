export interface PresignedUrlResponse {
    urls: {
            file_path: string,
            pre_signed_url: string,
            url: string
    }[]
}