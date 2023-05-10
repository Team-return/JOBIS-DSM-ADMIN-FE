export interface AuthorizationResponse {
	access_token: string;
	access_expires_at: Date;
	refresh_token: string;
	refresh_expires_at: Date;
	authority: string;
}
