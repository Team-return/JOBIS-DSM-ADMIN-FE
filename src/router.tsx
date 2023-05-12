import { createBrowserRouter } from 'react-router-dom';
import { RecruitmentFormPage } from './Pages/RecruitmentFormPage';
import { LoginPage } from './Pages/LoginPage';
import { ApplicationPopup } from './Pages/ApplicationPopup';
import { RecruitmentRequestPopup } from './Pages/RecruitmentRequestPopup';
import { CompanyRecruitmentPage } from './Pages/CompanyRecruitmentPage';
import { Cookies } from 'react-cookie';

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
				element: <></>,
			},
			{
				path: 'JobApplication',
				element: <></>,
			},
			{
				path: 'ApplicationPopup',
				element: <ApplicationPopup />,
			},
			{
				path: 'RecruitmentRequestPopup',
				element: <RecruitmentRequestPopup />,
			},
		],
	},
]);

export default Router;
