import styled from "styled-components";

export const ModalTitleText = styled.div`
	font-weight: 600;
	font-size: 18px;
	margin-bottom: 10px;
`;

export const ModalContentText = styled.div`
	font-weight: 400;
	font-size: 14px;
	color: #444444;
`;

export const RejectReasonTextarea = styled.textarea`
	width: 100%;
	height: 120px;
	margin-top: 15px;
	background: #f7f7f7;
	border: 1px solid #e5e5e5;
	border-radius: 5px;
	resize: none;
	padding: 10px;
`;

export const DateInputContainer = styled.div`
	display: flex;
	margin-top: 25px;
`;

export const DateInputWrapper = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	gap: 10px;
`;

export const DateText = styled.div`
	font-weight: 400;
	font-size: 14px;
	color: #7f7f7f;
`;

export const DateInput = styled.input`
	border: 1px solid #e5e5e5;
	height: 40px;
	width: 60%;
	padding: 0px 10px;
	input[type='text']:-ms-clear {
		display: none;
	}
`;
