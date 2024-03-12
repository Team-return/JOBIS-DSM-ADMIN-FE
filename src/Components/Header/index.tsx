import * as _ from './style';
import logo from '../../Assets/PNG/logo.png';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
	const location = useLocation();

	/** path를 체크하는 함수입니다. */
	const clickedStatus = (path: string) => {
		return location.pathname.includes(path);
	};

	return (
		<_.Container>
			<Link to="/">
				<_.LogoImg src={logo} alt="로고입니다." />
			</Link>
			<_.NavBtnWrapper>
				<Link to="/RecruitmentRequest">
					<_.NavBtn
						clicked={
							clickedStatus('RecruitmentRequest') ||
							location.pathname === '/'
						}
						width={124}
					>
						모집의뢰서
					</_.NavBtn>
				</Link>
				<Link to="/Company">
					<_.NavBtn clicked={clickedStatus('Company')} width={68}>
						기업
					</_.NavBtn>
				</Link>
				<Link to="/Student">
					<_.NavBtn clicked={clickedStatus('Student')} width={68}>
						학생
					</_.NavBtn>
				</Link>
				<Link to="/JobApplication">
					<_.NavBtn
						clicked={clickedStatus('JobApplication')}
						width={86}
					>
						지원서
					</_.NavBtn>
				</Link>
				<Link to="/Notice">
					<_.NavBtn clicked={clickedStatus('Notice')} width={68}>
						공지
					</_.NavBtn>
				</Link>
				<Link to="/Banner">
					<_.NavBtn clicked={clickedStatus('Banner')} width={68}>
						배너
					</_.NavBtn>
				</Link>
			</_.NavBtnWrapper>
		</_.Container>
	);
}
