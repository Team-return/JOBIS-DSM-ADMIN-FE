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
	height: 100%;
	align-items: center;
	justify-content: center;
	color: ${({ color }) => color};
	text-align: center;
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
	align-items: center;
	gap: 4px;
	width: 100px;
	height: 100%;
	cursor: pointer;
`;

export const NotingFileText = styled.div`
	display: flex;
	gap: 10px;
`;

export const DownLoadWrapper = styled.div`
	position: absolute;
	z-index: 100;
	background-color: white;
	gap: 20px;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
	padding-bottom: 20px;
`;

export const CountNum = styled.div`
	margin-right: 30px;
`;

export const FileDownloadWrapper = styled.div`
	max-width: 645px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 30px;
	color: black;
	gap: 15px;
`;

export const MiddleText = styled.div`
	font-size: 19px;
	font-weight: 700;
	margin: 30px 0 0 25px;
	color: black;
`;
