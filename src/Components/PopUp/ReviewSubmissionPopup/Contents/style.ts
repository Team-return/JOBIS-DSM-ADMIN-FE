import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	background-color: #ffffff;
	padding: 15px 30px 25px 30px;
`;

export const TextWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
`;

export const ChoiceText = styled.div`
	font-size: 20px;
	font-weight: 400;
	color: #7f7f7f;
`;

export const StudentText = styled.div`
	font-size: 23px;
	font-weight: 500;
	margin-left: 10px;
`;

export const NottingBox = styled.div`
	width: 100%;
	height: 240px;
	border: 1px solid rgba(229, 229, 229, 1);
	background-color: #f7f7f7;
	font-size: 17px;
	color: #7f7f7f;
	font-weight: 400;
	padding: 15px;
	overflow: scroll;
`;

export const ContentsBox = styled.div`
	width: 100%;
	height: 240px;
	overflow: scroll;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const TitleWrapper = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
`;

export const Title = styled.div`
	width: 80%;
	height: 100%;
	border: 1px solid rgba(229, 229, 229, 1);
	background-color: #f7f7f7;
	display: flex;
	font-size: 22px;
	font-weight: 600;
	align-items: center;
	padding-left: 15px;
`;

export const Business = styled.div`
	width: 20%;
	height: 100%;
	border: 1px solid rgba(229, 229, 229, 1);
	background-color: #f7f7f7;
	display: flex;
	font-size: 18px;
	font-weight: 400;
	justify-content: center;
	align-items: center;
`;

export const Contents = styled.div`
	width: 100%;
	max-height: 130px;
	border: 1px solid rgba(229, 229, 229, 1);
	background-color: #f7f7f7;
	font-size: 18px;
	font-weight: 400;
	padding: 15px;
	word-break: break-all;
	overflow: scroll;
`;
