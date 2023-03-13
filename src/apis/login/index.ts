import { useMutation } from 'react-query';
import { instance } from '../axios';
import { LoginDataType } from './request';
import { Cookies } from 'react-cookie';

const router = '/users';
const cookie = new Cookies();

export const Login = (loginData: LoginDataType) => {
    return useMutation(
        async () => instance.post(`${router}/login`, loginData),
        {
            onSuccess: (res) => {
                if (res.data.authority !== "TEACHER") {
                    alert("아이디와 비밀번호를 다시 확인해주세요.")
                }
                else {
                    cookie.set('access_token', res.data.access_token);
                }
            }
        },
    );
};