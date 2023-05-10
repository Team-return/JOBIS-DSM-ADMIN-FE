import { useMutation } from 'react-query';
import { instance } from '../axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { LoginDataType } from './request';

const router = '/users';

export const Login = (loginData: LoginDataType, checkBoxValue: boolean) => {
	const navigator = useNavigate();
	const [, setCookies] = useCookies();

	return useMutation(async () => instance.post(`${router}/login`, loginData), {
		onSuccess: (res) => {
			if (res.data.authority !== 'TEACHER') {
				alert('아이디와 비밀번호를 다시 확인해주세요.');
			} else {
				if (checkBoxValue) {
					setCookies('account_id', loginData.account_id);
				}
				const accessExpired = new Date(res.data.access_expires_at);
				const refreshExpired = new Date(res.data.refresh_expires_at);
				setCookies('refresh_token', res.data.refresh_token, {
					expires: refreshExpired,
				});
				setCookies('access_token', res.data.access_token, {
					expires: accessExpired,
				});
				navigator('/RecruitmentRequest');
			}
		},
	});
};