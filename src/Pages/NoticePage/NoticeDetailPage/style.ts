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

export const Box = styled.div`
    width: 1311px;
    height: 1000px;
    background-color: white;
    border: 1px solid #E5E5E5;
    display: flex;
    /* justify-content: center; */
`;

export const ContentWrap = styled.div`
	display: flex;
	text-align: left;
	margin-top: 40px;
	margin-left: 62px;
	flex-direction: column;
	gap: 24px;
	margin-right: 62px;
`;

export const HeaderWrap = styled.div`
	display: flex;
`;

export const Title = styled.div`
	font-size: 32px;
	font-weight: 700;
	color: #333333;
`;

export const Date = styled.div`
	font-size: 24px;
	font-weight: 500;
`;

export const Contents = styled.div`
	font-size: 16px;
`;

export const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	border: 1px solid ;
	background-color: white;
	cursor: pointer;
`;

export const IconBox = styled.div`
	display: flex;
	gap: 12px;
	margin-left: auto;
`;

export const FileBox = styled.div`
	display: flex;
	width: 1187px;
	height: 118px;
	border-top: 2px solid #135C9D;
	border-bottom: 2px solid #135C9D;
	padding: 16px;
	gap: 24px;
	overflow: scroll;
`;

export const File = styled.div`
	font-size: 18px;
	font-weight: 500;
`;

export const FileWrap = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const Files = styled.div`
	display: flex;
	justify-content: center;
	gap: 6px;
`;

export const FileTitle = styled.div`
	font-size: 18px;
	font-weight: 400;
`;