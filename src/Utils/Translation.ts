export const companyType: { [key: string]: string } = {
	LEAD: '선도',
	PARTICIPATING: '참여',
	CONTRACTING: '협약',
	DEFAULT: '기본',
};

export const applicationStatus: { [key: string]: string } = {
	REQUESTED: '승인요청',
	APPROVED: '승인',
	FAILED: '불합격',
	PASS: '합격',
	REJECTED: '반려',
	FIELD_TRAIN: '현장실습',
};

export const companyStatus: { [key: string]: string } = {
	전체: '',
	모집전: 'READY',
	모집중: 'RECRUITING',
	종료: 'DONE',
	접수요청: 'REQUESTED',
};

export const applicationStatusTextColor: { [key: string]: string } = {
	REQUESTED: '#F1C40F',
	APPROVED: '#2ECC71',
	FAILED: '#E74C3C',
	PASS: '#004079',
	REJECTED: '#F17B0F',
	FIELD_TRAIN: '#7401DF',
};
