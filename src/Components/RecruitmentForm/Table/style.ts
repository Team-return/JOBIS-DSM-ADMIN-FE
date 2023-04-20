import styled from 'styled-components';

export const Container = styled.div`
	width: 97vw;
	background-color: #ffffff;
	border: 1px solid #e5e5e5;
	padding: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const BtnWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 93.85vw;
	gap: 15px;
	margin-bottom: 10px;
`;

export const TableWrapper = styled.div`
	width: 93.85vw;
	overflow: scroll;
`;

export const TitleText = styled.div`
	font-weight: 700;
	font-size: 20px;
	display: flex;
	justify-content: center;
`;

export const ContentText = styled.div<{ status?: string; click?: number }>`
	font-weight: 400;
	font-size: 18px;
	display: flex;
	justify-content: center;
	color: ${({ status }) => (status === 'REQUESTED' ? '#FF0000' : '#000000')};
	text-decoration: ${({ click }) => (click ? 'underline' : 'none')};
	text-underline-offset : 2px;
	text-decoration-thickness: 2px;
	cursor: ${({ click }) => (click ? 'pointer' : 'default')};
`;
