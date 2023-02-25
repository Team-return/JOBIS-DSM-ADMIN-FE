import * as _ from "./Login.style"
import CloseEye from "../../Assets/SVG/CloseEye.svg"
import OpenEye from "../../Assets/SVG/OpenEye.svg"
import { useState } from "react"
import { Button, Input } from "@team-return/design-system"

const Login = () => {
    const [inputTypeCheck, setInputTypeCheck] = useState<boolean>(true)
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputs;

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
                        <Input onChange={InputValueChange} width={317} name="email" error={false} value={email} kind="LineInput" placeHolder="이메일을 입력해주세요." disabled={false} />
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
                    <_.LoginBtn>로그인</_.LoginBtn>
                </div>
            </_.Wrapper>
        </_.Container>
    )
}

export default Login