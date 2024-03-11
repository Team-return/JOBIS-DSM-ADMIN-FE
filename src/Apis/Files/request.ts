export interface PresignedUrlRequest {
    files: {
        type: string
        file_name: string
    }[]
}