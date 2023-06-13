import styled from 'styled-components';

export const Container = styled.div`
	width: 97%;
	height: 100px;
	background-color: #ffffff;
	border: 1px solid #e5e5e5;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
	z-index: 2;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 1.6%;
`;

export const Wrapper = styled.div`
	display: flex;
`;

export const TitleText = styled.div`
	width: 8%;
	height: 65px;
	background: #fafafa;
	border: 1px solid #e5e5e5;
	display: flex;
	align-items: center;
	padding-left: 15px;
	font-weight: 600;
	font-size: 18px;
`;

export const ContentWrapper = styled.div<{ width?: number }>`
	width: ${({ width }) => (width ? width + '%' : '28%')};
	height: 65px;
	background: #ffffff;
	border: 1px solid #e5e5e5;
	display: flex;
	align-items: center;
	padding-left: 1%;
	gap: 10px;
`;

export const DateInput = styled.input`
	border: 1px solid #e5e5e5;
	height: 40px;
	width: 45%;
	padding: 0px 10px;
	input[type='text']:-ms-clear {
		display: none;
	}
`;

export const Btn = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	margin-left: 30px;
	gap: 20px;
`;
