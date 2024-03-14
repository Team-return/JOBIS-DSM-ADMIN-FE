import styled from 'styled-components';

interface BtnProps {
	bannerStatus?: 'current' | 'notPublished';
	active?: boolean;
}

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 40px;
`;

export const Wrapper = styled.div`
	width: 1000px;
	display: flex;
	justify-content: space-between;
`;

export const BannerWrapper = styled.div`
	min-width: 1000px;
	background: #ffffff;
	border: 1px solid #e5e5e5;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
	padding: 52px 30px;
	overflow: scroll;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const ButtonWrapper = styled.div`
	display: flex;
`;

export const Btn = styled.div<BtnProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 180px;
	height: 45px;
	font-size: 16px;
	font-weight: 500;
	background-color: ${(props) => (props.active ? '#E0EBF6' : '#ffffff')};
	border: 1px solid ${(props) => (props.active ? '#0F4C82' : '#333333')};

	&:first-child {
		border-radius: 8px 0px 0px 8px;
	}

	&:last-child {
		border-radius: 0px 8px 8px 0px;
	}
`;

export const BannerImg = styled.img`
	width: 1000px;
	height: 300px;
`;

export const TextWrapper = styled.div`
	display: flex;
	gap: 5px;
`;

export const Title = styled.p`
	font-size: 24px;
	font-weight: 500;
	letter-spacing: 0.48px;
`;

export const Text = styled.p`
	font-size: 18px;
	font-weight: 600;
	color: #444444;
`;

export const TextContent = styled.p`
	font-size: 18px;
	font-weight: 600;
	color: #000000;
`;
