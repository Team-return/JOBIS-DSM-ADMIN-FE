import { useMutation } from 'react-query';
import { instance } from '../axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { LoginDataType } from './request';
import { AxiosError } from 'axios';

const router = '/users';

export const Login = (loginData: LoginDataType, checkBoxValue: boolean) => {
	const navigator = useNavigate();
	const [, setCookies, removeCookies] = useCookies();

	return useMutation(
		async () => instance.post(`${router}/login`, loginData),
		{
			onSuccess: (res) => {
				if (res.data.authority !== 'TEACHER') {
					alert('해당 계정은 사용할 수 없어요.');
				} else {
					if (checkBoxValue) {
						setCookies('account_id', loginData.account_id);
					} else {
						removeCookies('account_id');
					}
					const accessExpired = new Date(res.data.access_expires_at);
					const refreshExpired = new Date(
						res.data.refresh_expires_at
					);
					setCookies('refresh_token', res.data.refresh_token, {
						expires: refreshExpired,
					});
					setCookies('access_token', res.data.access_token, {
						expires: accessExpired,
					});
					navigator('/RecruitmentRequest');
				}
			},
			onError: (err: AxiosError<AxiosError>) => {
				console.log(err);
				if (err.response) {
					switch (err.response.status) {
						case 401:
							alert('비밀번호를 다시 확인해주세요.');
							break;
						case 404:
							alert('아이디와 비밀번호를 다시 확인해주세요.');
							break;
						case 500:
							return alert('개발자에게 문의해주세요.');
					}
				} else {
					alert('네트워크 연결을 확인해주세요.');
				}
			},
		}
	);
};
