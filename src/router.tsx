import { createBrowserRouter } from 'react-router-dom';
import { RecruitmentFormPage } from './Pages/RecruitmentFormPage';
import { LoginPage } from './Pages/LoginPage';
import { ApplicationPopup } from './Pages/PopUp/ApplicationPopup';
import { RecruitmentRequestPopup } from './Pages/PopUp/RecruitmentRequestPopup';
import { CompanyRecruitmentPage } from './Pages/CompanyRecruitmentPage';
import { ReviewSubmissionPopup } from './Pages/PopUp/ReviewSubmissionPopup';
import { ApplicationViewPage } from './Pages/ApplicationViewPage';
import { StudentManagementPage } from './Pages/StudentManagementPage';
import { CompanyDetailPage } from './Pages/CompanyDetailPage';
import { RecruitmentFormDetailPage } from './Pages/RecruitmentFormDetailPage';
import { NoticeListPage } from './Pages/NoticePage/NoticeListPage';
import { NoticeDetailPage } from './Pages/NoticePage/NoticeDetailPage';
import { NoticeWritePage } from './Pages/NoticePage/NoticeWritePage';
import { NoticeEditPage } from './Pages/NoticePage/NoticeEditPage';
import { BannerPage } from './Pages/BannerPage';
import { CreateBannerPage } from './Pages/CreateBannerPage';

const Router = createBrowserRouter([
	{
		path: '',
		children: [
			{
				path: '/',
				element: <RecruitmentFormPage />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'RecruitmentRequest',
				element: <RecruitmentFormPage />,
			},
			{
				path: 'RecruitmentRequest/:id',
				element: <RecruitmentFormDetailPage />,
			},
			{
				path: 'Company',
				element: <CompanyRecruitmentPage />,
			},
			{
				path: 'Company/:id',
				element: <CompanyDetailPage />,
			},
			{
				path: 'Student',
				element: <StudentManagementPage />,
			},
			{
				path: 'JobApplication',
				element: <ApplicationViewPage />,
			},
			{
				path: 'ApplicationPopup',
				element: <ApplicationPopup />,
			},
			{
				path: 'RecruitmentRequestPopup',
				element: <RecruitmentRequestPopup />,
			},
			{
				path: 'ReviewSubmissionPopup',
				element: <ReviewSubmissionPopup />,
			},
			{
				path: 'Notice',
				element: <NoticeListPage />,
				path: 'Banner',
				element: <BannerPage />,
			},
			{
				path: 'Notice/Detail',
				element: <NoticeDetailPage />,
			},
			{
				path: 'Notice/Write',
				element: <NoticeWritePage />,
			},
			{
				path: 'Notice/Edit',
				element: <NoticeEditPage />,
			},
			{
				path: 'CreateBanner',
				element: <CreateBannerPage />,
			},
		],
	},
]);

export default Router;
