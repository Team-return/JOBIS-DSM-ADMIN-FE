import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 36px;
`;

export const BannerDetails = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	gap: 20px;
`;

export const DeleteBackground = styled.div`
	position: absolute;
	top: 15px;
	right: 15px;
	width: 36px;
	height: 36px;
	border-radius: 50px;
	background: var(--primary-30, #0f4c82);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const deleteImg = styled.img`
	width: 32px;
	height: 32px;
`;

export const Wrapper = styled.div`
	width: 1000px;
	display: flex;
	justify-content: space-between;
`;
export const BannerImg = styled.div<{ src: string }>`
	width: 1000px;
	height: 300px;
	background-image: url(${(props) => props.src});
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
`;

export const TextWrapper = styled.div`
	display: flex;
	gap: 5px;
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
