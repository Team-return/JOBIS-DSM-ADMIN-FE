import { createBrowserRouter } from 'react-router-dom';
import { RecruitmentFormPage } from './Pages/RecruitmentFormPage';
import { LoginPage } from './Pages/LoginPage';
import { ApplicationPopup } from './Pages/PopUp/ApplicationPopup';
import { RecruitmentRequestPopup } from './Pages/PopUp/RecruitmentRequestPopup';
import { CompanyRecruitmentPage } from './Pages/CompanyRecruitmentPage';
import { Cookies } from 'react-cookie';
import { ReviewSubmissionPopup } from './Pages/PopUp/ReviewSubmissionPopup';
import { ApplicationViewPage } from './Pages/ApplicationViewPage';
import { StudentManagementPage } from './Pages/StudentManagementPage';

const cookies = new Cookies();

const Router = createBrowserRouter([
	{
		path: '',
		children: [
			{
				path: '/',
				element: cookies.get('access_token') ? <RecruitmentFormPage /> : <LoginPage />,
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
				path: 'RequestForm',
				element: <CompanyRecruitmentPage />,
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
		],
	},
]);

export default Router;
