import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	padding: 30px 0 25px 30px;
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const TableWrapper = styled.div`
	width: 100%;
`;

export const TitleText = styled.div`
	font-weight: 700;
	font-size: 20px;
	display: flex;
`;

export const ContentText = styled.div<{ status?: string; click?: number }>`
	font-weight: 400;
	font-size: 18px;
	display: flex;
	justify-content: center;
	height: 100%;
	align-items: center;
	color: ${({ status }) => (status === 'REQUESTED' ? '#FF0000' : '#000000')};
	text-decoration: ${({ click }) => (click ? 'underline' : 'none')};
	text-underline-offset: 1.5px;
	text-decoration-thickness: 1.5px;
	cursor: ${({ click }) => (click ? 'pointer' : 'default')};
	text-align: center;
	word-break: keep-all;
`;
