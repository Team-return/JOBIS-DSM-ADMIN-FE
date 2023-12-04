import { ChangeEvent } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ApplicantInfoQueryStringType } from '../Apis/Applications/request';

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
/** 선택한 카테코리 state */
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
