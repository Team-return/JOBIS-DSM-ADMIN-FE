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
	SEND: '전송',
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
	SEND: '#135C9D',
};

export const hiringProgress: { [key: string]: string } = {
	CULTURE_INTERVIEW: '컬쳐핏면접',
	DOCUMENT: '서류전형',
	TASK: '과제 제출',
	LIVE_CODING: '라이브코딩',
	TECH_INTERVIEW: '기술면접',
	FINAL_INTERVIEW: '최종면접',
	PERSONALITY: '인적성 테스트',
	AI: 'AI면접',
	CODING_TEST: '코딩테스트',
};

export const winterIntern: { [key: string]: boolean | null } = {
	체험형: true,
	채용형: false,
};
