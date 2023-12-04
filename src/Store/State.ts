import { ChangeEvent } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ApplicantInfoQueryStringType } from '../Apis/Applications/request';
import { QueryStringDataType } from '../Apis/Companies/request';

interface applicationViewQueryStringState {
	applicationViewQueryString: ApplicantInfoQueryStringType;
	applicationViewQueryStringHandler: (
		e: ChangeEvent<HTMLInputElement>
	) => void;
	applicationViewQueryStringDropDown: (name: string, value: any) => void;
	setDefaultApplicationViewQueryString: () => void;
	setApplicationViewQueryString: (
		queryString: ApplicantInfoQueryStringType
	) => void;
}

export const useApplicationViewQueryString =
	create<applicationViewQueryStringState>()(
		devtools((set) => ({
			applicationViewQueryString: {
				page: 1,
				application_status: '',
				student_name: '',
				recruitment_id: '',
			},
			applicationViewQueryStringHandler: (e) =>
				set((prev) => ({
					applicationViewQueryString: {
						...prev.applicationViewQueryString,
						[e.target.name]: e.target.value,
					},
				})),
			applicationViewQueryStringDropDown: (name, value) =>
				set((prev) => ({
					applicationViewQueryString: {
						...prev.applicationViewQueryString,
						[name]: value,
					},
				})),
			setDefaultApplicationViewQueryString: () =>
				set({
					applicationViewQueryString: {
						page: 1,
						application_status: '',
						student_name: '',
						recruitment_id: '',
					},
				}),
			setApplicationViewQueryString: (queryString) =>
				set({
					applicationViewQueryString: queryString,
				}),
		}))
	);

interface companyRecruitmentQueryStringState {
	companyRecruitmentQueryString: QueryStringDataType;
	companyRecruitmentQueryStringHandler: (
		e: ChangeEvent<HTMLInputElement>
	) => void;
	companyRecruitmentQueryStringDropDown: (name: string, value: any) => void;
	setDefaultCompanyRecruitmentQueryString: () => void;
	setCompanyRecruitmentQueryString: (
		queryString: QueryStringDataType
	) => void;
}

export const useCompanyRecruitmentQueryString =
	create<companyRecruitmentQueryStringState>()(
		devtools((set) => ({
			companyRecruitmentQueryString: {
				page: 1,
				company_type: '',
				region: '',
				company_name: '',
				industry: '',
			},
			companyRecruitmentQueryStringHandler: (e) =>
				set((prev) => ({
					companyRecruitmentQueryString: {
						...prev.companyRecruitmentQueryString,
						[e.target.name]: e.target.value,
					},
				})),
			companyRecruitmentQueryStringDropDown: (name, value) =>
				set((prev) => ({
					companyRecruitmentQueryString: {
						...prev.companyRecruitmentQueryString,
						[name]: value,
					},
				})),
			setDefaultCompanyRecruitmentQueryString: () =>
				set({
					companyRecruitmentQueryString: {
						page: 1,
						company_type: '',
						region: '',
						company_name: '',
						industry: '',
					},
				}),
			setCompanyRecruitmentQueryString: (queryString) =>
				set({
					companyRecruitmentQueryString: queryString,
				}),
		}))
	);
