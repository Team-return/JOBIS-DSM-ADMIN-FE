import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import LoginPage from './Components/Login';

function MainRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />}></Route>
				<Route path="/RecruitmentRequest" element={<Header />}></Route>
				<Route path="/RequestForm" element={<Header />}></Route>
				<Route path="/Student" element={<Header />}></Route>
				<Route path="/JobApplication" element={<Header />}></Route>
				{/*404page*/}
				<Route path="*" element="" />
			</Routes>
		</BrowserRouter>
	);
}

export default MainRouter;
