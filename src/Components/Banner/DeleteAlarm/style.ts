import styled from 'styled-components';

export const Container = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	gap: 40px;
	width: 444px;
	height: 176px;
	border-radius: 10px;
	background-color: #fff;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
	padding: 25px 30px 35px 40px;
`;

export const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const Title = styled.p`
	font-size: 20px;
	font-weight: 500;
`;

export const Contents = styled.p`
	font-size: 16px;
	font-weight: 400;
`;

export const BtnWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 10px;
`;

export const Cancle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 70px;
	height: 30px;
	font-size: 16px;
	font-weight: 400;
	background: var(--grayscale-30, #f7f7f7);
	cursor: pointer;
`;

export const Confirm = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 70px;
	height: 30px;
	font-size: 16px;
	font-weight: 400;
	color: white;
	background: var(--primary-20, #135c9d);
	cursor: pointer;
`;
