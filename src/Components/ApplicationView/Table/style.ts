import styled from 'styled-components';

export const Container = styled.div`
	width: 97%;
	background-color: #ffffff;
	border: 1px solid #e5e5e5;
	padding: 50px 30px 25px 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const BtnWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	gap: 15px;
	margin-bottom: 10px;
`;

export const TableWrapper = styled.div`
	width: 100%;
	overflow: scroll;
`;

export const TitleText = styled.div`
	font-weight: 700;
	font-size: 20px;
	display: flex;
	text-align: center;
	justify-content: center;
`;

export const ContentText = styled.div<{ color?: string }>`
	font-weight: 400;
	font-size: 18px;
	display: flex;
	justify-content: center;
	color: ${({ color }) => color};
`;

export const OpenBoxWrapper = styled.div`
	width: 100%;
	font-weight: 350;
	font-size: 18px;
	color: #7f7f7f;
	margin-left: 40px;
`;

export const UnfoldImgWrapper = styled.div`
	display: flex;
	gap: 10px;
	width: 92px;
	cursor: pointer;
`;

export const NotingFileText = styled.div`
	display: flex;
	gap: 10px;
`;

export const DownLoadWrapper = styled.div`
	position: absolute;
	background-color: white;
	width: 30%;
	gap: 20px;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
`;

export const CountNum = styled.div`
	margin-right: 30px;
`;

export const FileDownloadWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 30px;
	color: black;
`;