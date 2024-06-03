import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { LoginDataType } from './request';
import axios, { AxiosError } from 'axios';
import { useToastStore } from '@team-return/design-system';

const router = '/users';

/** 로그인 */
export const Login = (loginData: LoginDataType, checkBoxValue: boolean) => {
	const { append } = useToastStore();
	const navigator = useNavigate();
	const [, setCookies, removeCookies] = useCookies();

	return useMutation(
		async () =>
			axios.post(`${process.env.REACT_APP_BASE_URL}${router}/login`, {
				account_id: loginData.account_id,
				password: loginData.password,
				platform_type: 'WEB',
			}),
		{
			onSuccess: (res) => {
				if (res.data.authority !== 'TEACHER') {
					append({
						title: '해당 계정은 사용할 수 없어요.',
						message: '',
						type: 'RED',
					});
				} else {
					if (checkBoxValue) {
						setCookies('account_id', loginData.account_id, {
							path: '/'
						});
					} else {
						removeCookies('account_id');
					}
					const accessExpired = new Date(res.data.access_expires_at);
					const refreshExpired = new Date(
						res.data.refresh_expires_at
					);
					setCookies('refresh_token', res.data.refresh_token, {
						expires: refreshExpired,
						path: '/'
					});
					setCookies('access_token', res.data.access_token, {
						expires: accessExpired,
						path: '/'
					});
					navigator('/RecruitmentRequest');
				}
			},
			onError: (err: AxiosError<AxiosError>) => {
				if (err.response) {
					switch (err.response.status) {
						case 401:
							append({
								title: '비밀번호를 다시 확인해주세요.',
								message: '',
								type: 'RED',
							});
							break;
						case 404:
							append({
								title: '아이디와 비밀번호를 다시 확인해주세요.',
								message: '',
								type: 'RED',
							});
							break;
						case 500:
							append({
								title: '개발자에게 문의해주세요.',
								message: '',
								type: 'RED',
							});
							break;
					}
				} else {
					append({
						title: '네트워크 연결을 확인해주세요.',
						message: '',
						type: 'RED',
					});
				}
			},
		}
	);
};
