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

export const TableWrapper = styled.div`
	width: 93.5%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`;

export const TitleWrapper = styled.div`
	margin-bottom: 7px;
	margin-left: 5px;
	width: 93.5%;
	display: flex;
`;

export const TextWrapper = styled.div`
	width: 100%;
	padding: 0 5px 0 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const TitleText = styled.div`
	font-weight: 600;
	font-size: 20px;
	display: flex;
	justify-content: center;
`;

export const ContentText = styled.div<{ status?: string; click?: number }>`
	display: flex;
	align-items: center;
	height: 100%;
	width: 73%;
	color: ${({ status }) => (status === 'REQUESTED' ? '#FF0000' : '#000000')};
	font-size: 18px;
	text-decoration: ${({ click }) => (click ? 'underline' : 'none')};
	text-underline-offset: 1.5px;
	text-decoration-thickness: 1.5px;
	font-weight: 400;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	word-break: break-all;
	cursor: ${({ click }) => (click ? 'pointer' : 'default')};
	text-align: center;
`;
