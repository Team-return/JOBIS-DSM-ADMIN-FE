import styled from 'styled-components';

export const Container = styled.div`
	width: 97%;
	background-color: #ffffff;
	border: 1px solid #e5e5e5;
	padding: 50px 30px 25px 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const BtnWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	gap: 15px;
	margin-bottom: 10px;
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
	height: 100%;
	align-items: center;
	color: ${({ status }) => (status ? '#FF0000' : '#000000')};
	text-decoration: ${({ click }) => (click ? 'underline' : 'none')};
	text-underline-offset: 1.5px;
	text-decoration-thickness: 1.5px;
	cursor: ${({ click }) => (click ? 'pointer' : 'default')};
	text-align: center;
	word-break: keep-all;
`;
