import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/index';
import RecruitmentFormPage from './Pages/RecruitmentFormPage';

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
		],
	},
]);

export default Router;
