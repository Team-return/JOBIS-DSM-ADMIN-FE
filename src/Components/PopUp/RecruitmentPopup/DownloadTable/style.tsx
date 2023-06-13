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
	overflow: scroll;
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
	font-weight: 400;
	height: 35px;
	overflow: scroll;
	font-size: 18px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ status }) => (status === 'REQUESTED' ? '#FF0000' : '#000000')};
	text-decoration: ${({ click }) => (click ? 'underline' : 'none')};
	text-underline-offset: 2px;
	text-decoration-thickness: 2px;
	cursor: ${({ click }) => (click ? 'pointer' : 'default')};
`;
