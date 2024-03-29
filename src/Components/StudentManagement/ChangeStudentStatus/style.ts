import styled from 'styled-components';

export const Container = styled.div<{ height?: number }>`
	width: 85%;
	height: ${({ height }) => (height ? height + 'px' : '310px')};
	background: #fafafa;
	border: 1px solid #e5e5e5;
	margin-top: 69px;
	padding: 30px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const Line = styled.div`
	border: 1px solid #e5e5e5;
	width: 106%;
	margin-left: -10px;
	z-index: 2;
`;

export const TitleText = styled.div`
	color: #333333;
	font-size: 16px;
	font-weight: 500;
`;

export const ContentText = styled.div`
	color: #7f7f7f;
	font-size: 14px;
	font-weight: 500;
	height: 100%;
	align-items: center;
`;

export const DateInput = styled.input`
	border: 1px solid #e5e5e5;
	height: 40px;
	width: 120px;
	padding: 0px 10px;
	margin-left: 8px;
`;

export const PlusIcon = styled.div<{ click: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background-color: ${({ click }) => (click ? '#135C9D' : '#7F7F7F')};
	cursor: ${({ click }) => (click ? 'pointer' : 'not-allowed')};
`;

export const IconWrapper = styled.div<{ click: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	border: 1px solid ${({ click }) => (click ? '#E74C3C' : '#7F7F7F')};
	background-color: white;
	cursor: ${({ click }) => (click ? 'pointer' : 'not-allowed')};
`;
