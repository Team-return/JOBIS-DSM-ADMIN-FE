import { ChangeEvent } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ApplicantInfoQueryStringType } from '../Apis/Applications/request';
import {
	EmployableCompaniesPropsType,
	QueryStringDataType,
} from '../Apis/Companies/request';
import { RecruitmentFormQueryStringType } from '../Apis/Recruitments/request';

const date = new Date(); // 현재 날짜 및 시간
const iYear = date.getFullYear(); // 연도

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

interface recruitmentFormQueryStringState {
	recruitmentFormQueryString: RecruitmentFormQueryStringType;
	recruitmentFormQueryStringHandler: (
		e: ChangeEvent<HTMLInputElement>
	) => void;
	recruitmentFormQueryStringDropDown: (name: string, value: any) => void;
	setDefaultRecruitmentFormQueryString: () => void;
	setRecruitmentFormQueryString: (
		queryString: RecruitmentFormQueryStringType
	) => void;
}

export const useRecruitmentFormQueryString =
	create<recruitmentFormQueryStringState>()(
		devtools((set) => ({
			recruitmentFormQueryString: {
				year: String(iYear),
				company_name: '',
				start: ``,
				end: ``,
				status: '',
				winter_intern: null,
				page: 1,
			},
			recruitmentFormQueryStringHandler: (e) =>
				set((prev) => ({
					recruitmentFormQueryString: {
						...prev.recruitmentFormQueryString,
						[e.target.name]: e.target.value,
					},
				})),
			recruitmentFormQueryStringDropDown: (name, value) =>
				set((prev) => ({
					recruitmentFormQueryString: {
						...prev.recruitmentFormQueryString,
						[name]: value,
					},
				})),
			setDefaultRecruitmentFormQueryString: () =>
				set({
					recruitmentFormQueryString: {
						year: String(iYear),
						company_name: '',
						start: ``,
						end: ``,
						status: '',
						winter_intern: null,
						page: 1,
					},
				}),
			setRecruitmentFormQueryString: (queryString) =>
				set({
					recruitmentFormQueryString: queryString,
				}),
		}))
	);

interface studentManagementQueryStringState {
	studentManagementQueryString: EmployableCompaniesPropsType;
	studentManagementQueryStringHandler: (
		e: ChangeEvent<HTMLInputElement>
	) => void;
	studentManagementQueryStringDropDown: (name: string, value: any) => void;
	setDefaultStudentManagementQueryString: () => void;
	setStudentManagementQueryString: (
		queryString: EmployableCompaniesPropsType
	) => void;
}

export const useStudentManagementQueryString =
	create<studentManagementQueryStringState>()(
		devtools((set) => ({
			studentManagementQueryString: {
				company_name: '',
				company_type: '',
				year: String(date.getFullYear()),
				page: 1,
			},
			studentManagementQueryStringHandler: (e) =>
				set((prev) => ({
					studentManagementQueryString: {
						...prev.studentManagementQueryString,
						[e.target.name]: e.target.value,
					},
				})),
			studentManagementQueryStringDropDown: (name, value) =>
				set((prev) => ({
					studentManagementQueryString: {
						...prev.studentManagementQueryString,
						[name]: value,
					},
				})),
			setDefaultStudentManagementQueryString: () =>
				set({
					studentManagementQueryString: {
						company_name: '',
						company_type: '',
						year: String(date.getFullYear()),
						page: 1,
					},
				}),
			setStudentManagementQueryString: (queryString) =>
				set({
					studentManagementQueryString: queryString,
				}),
		}))
	);
