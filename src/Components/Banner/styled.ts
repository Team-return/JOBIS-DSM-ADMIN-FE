import styled from 'styled-components';

export const Container = styled.div`
	width: 1000px;
	min-width: 1400px;
	background: #ffffff;
	border: 1px solid #e5e5e5;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;
	padding-top: 52px;
	padding-bottom: 11px;
	padding: 52px 30px;
	overflow: scroll;
`;

export const ButtonWrapper = styled.div`
	width: 940px;
	display: flex;
	justify-content: space-between;
`;

export const BannerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const Title = styled.p`
	font-size: 24px;
	font-weight: 500;
	letter-spacing: 0.48px;
`;

export const BannerImg = styled.img`
	width: 940px;
	height: 300px;
`;
