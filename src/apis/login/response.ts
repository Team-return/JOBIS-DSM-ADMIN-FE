export interface AuthorizationResponse {
    access_token: string;
    access_expires_at: Date;
    refresh_token: string;
    authority: string;
}