import { useState, useCallback } from 'react';
import { Cookies } from 'react-cookie';
import { Input } from '@team-return/design-system';
import * as _ from './style';
import { Login } from '../../Apis/Login';
import { useForm } from '../../Hooks/useForm';

export function LoginCompo() {
	const cookie = new Cookies();
	const [inputTypeCheck, setInputTypeCheck] = useState(true);
	const [checkBoxValue, setCheckBoxValue] = useState(cookie.get('account_id') ? true : false);
	const { form: loginForm, handleChange } = useForm({
		account_id: cookie.get('account_id') || '',
		password: '',
	});

	const { account_id, password } = loginForm;

	const { mutate: handleLogin } = Login(loginForm, checkBoxValue);

	const handleClickEye = useCallback(() => {
		setInputTypeCheck((prev) => !prev);
	}, []);

	return (
		<_.Container>
			<_.Wrapper>
				<div>
					<_.TitleWrapper>
						<_.TitleText>선생님 로그인</_.TitleText>
						<_.TitleLine />
					</_.TitleWrapper>
					<_.InputWrapper>
						<_.ContentText>아이디</_.ContentText>
						<Input onChange={handleChange} width={100} name="account_id" error={false} value={account_id} kind="LineInput" placeHolder="이메일을 입력해주세요." disabled={false} />
					</_.InputWrapper>
					<_.InputWrapper>
						<_.ContentText>비밀번호</_.ContentText>
						<div>
							<Input
								onChange={handleChange}
								type={inputTypeCheck ? 'password' : 'text'}
								iconName={inputTypeCheck ? 'EyesClose' : 'EyesOpen'}
								iconClick={handleClickEye}
								width={100}
								name="password"
								error={false}
								value={password}
								kind="LineInput"
								placeHolder="비밀번호를 입력해주세요."
								disabled={false}
							/>
						</div>
					</_.InputWrapper>
					<_.CheckEmailWrapper>
						<_.CheckBox type="checkbox" checked={checkBoxValue} onChange={() => setCheckBoxValue((prev) => !prev)} />
						<_.CheckLogin>아이디 저장</_.CheckLogin>
					</_.CheckEmailWrapper>
					<_.LoginBtn onClick={() => handleLogin()} disabled={!(account_id && password)}>
						로그인
					</_.LoginBtn>
				</div>
			</_.Wrapper>
		</_.Container>
	);
}
