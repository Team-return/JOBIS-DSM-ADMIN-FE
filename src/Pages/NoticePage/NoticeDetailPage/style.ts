import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100vw;
	min-width: 1400px;
	background: #fafafa;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 95px;
	padding-bottom: 11px;
	overflow: scroll;
`;

export const Background = styled.div`
	width: 1311px;
	height: 1000px;
	background-color: white;
	border: 1px solid #E5E5E5;
	display: flex;
	flex-direction: column;
	overflow: scroll;
	padding: 40px 62px 40px 62px;
`;

export const Box = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

export const Title = styled.div`
	font-weight: 700;
	font-size: 32px;	
`;

export const Date = styled.div`
	font-weight: 500;
	font-size: 24px;
`;

export const Contents = styled.div`
	font-size: 16px;
	font-weight: 400;
	white-space: pre-line;
`;

export const AttachedBox = styled.div`
	display: flex;
	/* width: 1187px; */
	width: 100%;
	height: auto;
	margin-top: 32px;
	padding: 16px;
	border-top: 2px solid #135C9D;
	border-bottom: 1px solid #135C9D;
	gap: 28px;
`;

export const AttachmentTitle = styled.div`
	font-weight: 500;
	font-size: 18px;
`;

export const Attachments = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	justify-content: center;
`;

export const HeaderWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

export const IconWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 12px;
	margin-left: auto;
`

export const IconBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	border: 1px solid black;
	background-color: white;
	cursor: pointer;
`;