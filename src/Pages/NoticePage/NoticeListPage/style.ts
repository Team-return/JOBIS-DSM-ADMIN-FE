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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 48px;
    gap: 40px;
`;

export const Table = styled.table`
    display: flex;
    table-layout: fixed;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Thead = styled.thead`
	display: flex;
	justify-content: center;
	align-items: center;
	border-top: 2px solid #7F7F7F;
	width: 1139px;
	height: 70px;
	background-color: #F7F7F7;
	border-bottom: 0.5px solid #7F7F7F;
`;

export const HeaderNumber = styled.th`
	width: 192px;
	font-size: 16px;
	padding: 2px 4px 2px 4px;
`;

export const HeaderTitle = styled.th`
	width: 755px;
	font-size: 16px;
	padding: 2px 4px 2px 4px;
`;

export const HeaderDate = styled.th`
	width: 192px;
	font-size: 16px;
	padding: 2px 4px 2px 4px;
`;

export const Tbody = styled.tbody`
	display: flex;
	justify-content: center;
	align-items: center;
	border-collapse: collapse;
`;

export const Tr = styled.tr`
	height: 70px;
	border-bottom: 0.5px solid #7F7F7F;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const NoticeNumber = styled.td`
	border: none;
	width: 192px;
	font-size: 16px;
	color: #002C53;
	display: flex;
	justify-content: center;
	font-weight: 500;
`;

export const NoticeTitle = styled.td`
	border: none;
	width: 755px;
	color: 16px;
	display: flex;
	justify-content: center;
	font-weight: 500;
`;

export const NoticeDate = styled.td`
	border: none;
	width: 192px;
	color: 16px;
	display: flex;
	justify-content: center;
	font-weight: 500;
`;

export const Bottom = styled.div`
	margin-bottom: 98px;
`;

export const Background = styled.div`
	width: 1298px;
	height: 971px;
	background-color: white;
	border: 1px solid #E5E5E5;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: scroll;
`;

export const TitleWrapper = styled.div`
	display: flex;
	margin-top: 24px;
`;

export const Title = styled.div`
	font-size: 40px;
	color: #333333;
	font-weight: 700;
	margin-right: 800px;
`;

export const Button = styled.button`
	padding: 8px 49px;
`;