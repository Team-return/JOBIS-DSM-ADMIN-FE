import * as _ from "./Login.style"
import { useState } from "react"
import { Input } from "@team-return/design-system"
import { Login } from "../../apis/login"

const LoginPage = () => {
    const [inputTypeCheck, setInputTypeCheck] = useState<boolean>(true)
    const [inputs, setInputs] = useState({
        account_id: "",
        password: "",
    });

    const { account_id, password } = inputs;

    const InputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const ClickEye = () => {
        setInputTypeCheck(!inputTypeCheck)
    }

    const LoginAPI = Login(inputs);

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
                        <Input onChange={InputValueChange} width={317} name="account_id" error={false} value={account_id} kind="LineInput" placeHolder="이메일을 입력해주세요." disabled={false} />
                    </_.InputWrapper>
                    <_.InputWrapper>
                        <_.ContentText>비밀번호</_.ContentText>
                        <_.PasswordWrapper>
                            <Input onChange={InputValueChange} type={inputTypeCheck ? "password" : "text"} iconName={inputTypeCheck ? "EyesClose" : "EyesOpen"} iconClick={ClickEye} width={317} name="password" error={false} value={password} kind="LineInput" placeHolder="비밀번호를 입력해주세요." disabled={false} />
                        </_.PasswordWrapper>
                    </_.InputWrapper>
                    <_.CheckEmailWrapper>
                        <_.CheckBox type="checkbox" />
                        <_.CheckLogin>아이디 저장</_.CheckLogin>
                    </_.CheckEmailWrapper>
                    <_.LoginBtn onClick={() => LoginAPI.mutate()} disabled={!(account_id && password)}>로그인</_.LoginBtn>
                </div>
            </_.Wrapper>
        </_.Container>
    )
}

export default LoginPage