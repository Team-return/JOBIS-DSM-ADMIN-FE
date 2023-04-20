import { createBrowserRouter } from 'react-router-dom';
import { RecruitmentFormPage } from './Pages/RecruitmentForm/RecruitmentFormPage';
import { LoginPage } from './Pages/LoginPage';
import { ApplicationPopup } from './Pages/RecruitmentForm/ApplicationPopup';
import { RecruitmentRequestPopup } from './Pages/RecruitmentForm/RecruitmentRequestPopup';

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
				path: 'RequestForm',
				element: <></>,
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
