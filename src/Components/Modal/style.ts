import styled from 'styled-components';

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
	width: 500px;
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

export const Container = styled.div`
	width: 600px;
	background-color: #ffffff;
	padding: 20px 30px 25px 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const TableWrapper = styled.div`
	width: 100%;
`;

export const TitleText = styled.div`
	font-weight: 700;
	font-size: 20px;
	display: flex;
	text-align: center;
	justify-content: center;
`;

export const ContentText = styled.div<{ status?: boolean; click?: boolean }>`
	font-weight: 400;
	font-size: 18px;
	display: flex;
	justify-content: center;
	color: ${({ status }) => (status ? '#FF0000' : '#000000')};
	text-decoration: ${({ click }) => (click ? 'underline' : 'none')};
	text-underline-offset: 2px;
	text-decoration-thickness: 2px;
	cursor: ${({ click }) => (click ? 'pointer' : 'default')};
`;

export const SearchWrapper = styled.div`
	width: 100%;
	height: 60px;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
`;

export const CompanyText = styled.div`
	font-size: 25px;
	font-weight: 500;
`;

export const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;
