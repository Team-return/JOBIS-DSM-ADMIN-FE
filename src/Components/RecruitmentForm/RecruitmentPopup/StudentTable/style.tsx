import styled from 'styled-components';

export const Container = styled.div`
	width: 100vw;
	display: flex;
	justify-content: center;
`;

export const Wrapper = styled.div`
width: 93.5vw;
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
	text-underline-offset: 2px;
	text-decoration-thickness: 2px;
	cursor: ${({ click }) => (click ? 'pointer' : 'default')};
`;
