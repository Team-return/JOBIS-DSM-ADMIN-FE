import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Wrapper = styled.div`
    width: 490px;
    height: 609px;
    background: #FFFFFF;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const TitleWrapper = styled.div`
    display: flex;
    margin-bottom: 60px;
`

export const TitleText = styled.div`
    font-weight: 500;
    font-size: 40px;
`

export const TitleLine = styled.div`
    width: 1.3px;
    height: 40px;
    background-color: #333333;
    margin-left: 33px;
`

export const ContentText = styled.div`
    font-weight: 400;
    font-size: 18px;
    font-style: normal;
    margin-bottom: 20px;
`

export const ContentInput = styled.input`
    width: 285px;
    height: 23px;
    border: none;
    border-bottom: 1px solid #E5E5E5;
    outline: none;
    padding: 15px 5px;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 400;
`

export const InputWrapper = styled.div`
    margin-top: 40px;
`

export const PasswordWrapper = styled.div`
& > .passwordInput {
    width: 265px;
    padding-right: 30px;
}
`

export const EyeImg = styled.img`
    position: absolute;
    margin-left: -27px;
    margin-top: 22px;
`

export const CheckEmailWrapper = styled.div`
    height: 24px;
    display: flex;
    margin-top: 55px;
    padding-left: 5px;
    margin-bottom: -5px;
`

export const CheckBox = styled.input`
    width: 15px;
    height: 15px;
`

export const CheckLogin = styled.div`
    font-size: 14px;
    color: #7F7F7F;
    margin-left: 5px;
`

export const LoginBtn = styled.button`
    font-weight: 400;
    font-size: 15px;
    color: #FFFFFF;
    border: none;
    width: 317px;
    height: 45px;
    background: #333333;
    margin-top: 20px;
`