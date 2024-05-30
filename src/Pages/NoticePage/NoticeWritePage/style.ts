import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100vw;
	min-width: 1400px;
	background: #fafafa;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 95px;
	padding-bottom: 11px;
	overflow: scroll;
`;

export const InputCount = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-left: auto;
`;

export const Box = styled.div`
    width: 1298px;
	height: 971px;
	background-color: white;
	border: 1px solid #E5E5E5;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: scroll;
`;

export const Title = styled.div`
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    margin-left: 24px;
    margin-top: 24px;
    align-self: flex-start;
    margin-bottom: 25px;
`;

export const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
`;

export const WriteDateWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 56px;
    align-items: center;
`;

export const Text = styled.div`
    font-size: 24px;
    font-weight: 500;
`;

export const TitleWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 80px;
    align-items: center;
`;

export const Input = styled.input`
    width: 575px;
    height: 46px;
    border: 1px solid #999999;
    padding-left: 10px;
    font-size: 16px;
    border-radius: 4px;
`;

export const TextWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 80px;
`;

export const InputWrapper = styled.div`
    width: 575px;
    height: 400px;
    border: 1px solid #999999;
    border-radius: 4px;
    padding: 10px;
    overflow: auto;
    background-color: white;
    display: flex;
    flex-direction: column;
`;

export const TextInput = styled.textarea`
    width: 100%;
    height: 90%;
    font-size: 16px;
    border: none;
    resize: none;
    white-space: pre-line;
`;

export const FileWrap = styled.div`
    display: flex;
    flex-direction: row;
    gap: 37px;
    /* align-items: center; */
`;

export const AddFile = styled.div`
    width: 575px;
    height: 46px;
    background-color: #FAFAFA;
    cursor: pointer;
    font-size: 16px;
    align-items: center;
    display: flex;
    padding: 16px;
    font-weight: 400;
    justify-content: space-between;
`;

export const ButtonWrap = styled.div`
    margin-top: 68px;
    margin-left: auto;
`;

export const AddFileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
	align-items: center;
	width: 28px;
	height: 28px;
	border-radius: 50%;
	background-color: #135C9D;
	cursor: pointer;
`;