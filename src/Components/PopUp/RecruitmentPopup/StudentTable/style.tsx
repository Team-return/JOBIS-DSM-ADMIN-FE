import styled from 'styled-components';

export const Container = styled.div`
	width: 100vw;
	min-width: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 18px;
`;

export const TableWrapper = styled.div<{ isRequest: boolean }>`
	width: 93.5%;
	min-height: ${({ isRequest }) => (isRequest ? '320px' : '365px')};
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;

export const BtnWrapper = styled.div`
	width: 93.5%;
	display: flex;
	justify-content: flex-end;
`;

export const TitleText = styled.div`
	font-weight: 600;
	font-size: 20px;
	display: flex;
	justify-content: center;
`;

export const ContentText = styled.div<{ status?: string; click?: number }>`
	font-weight: 400;
	font-size: 18px;
	display: flex;
	justify-content: center;
	width: 100%;
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
