export interface BannerListProps {
	banner_id: number;
	banner_url: string;
	start_date: string;
	end_date: string;
	banner_type: string;
}

export interface BannerListResponse {
	banners: BannerListProps[];
}

export interface BannerNameType {
	RECRUITMENT: string;
	BOOKMARK: string;
	NONE: string;
	INTERNSHIP: string;
	COMPANY: string;
}
