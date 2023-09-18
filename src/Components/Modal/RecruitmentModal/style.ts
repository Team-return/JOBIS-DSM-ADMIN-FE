import styled from 'styled-components';
import { theme } from '@team-return/design-system';

export const Container = styled.div`
	border: 3px solid white;
	width: 700px;
	padding: 50px;
	height: 80vh;
	overflow: scroll;
	border-radius: 10px;
	background-color: white;
`;

export const BigWrapper = styled.div`
	margin-bottom: 80px;
`;

export const CardWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	overflow: scroll;
	width: 100%;
	min-height: 50px;
	padding: 10px 12px;
	margin-top: 15px;
	border: 1px solid ${theme.color.gray50};
	border-radius: 3px;
	background-color: ${theme.color.gray20};
`;

export const Card = styled.button`
	color: black;
	border: none;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
	padding: 17px;
	background: ${theme.color.gray10};
	border-radius: 2px;
	height: 25px;
	display: flex;
	align-items: center;
	font-size: 15px;
	font-weight: 400;
	outline: none;
	white-space: nowrap;
	position: relative;
	cursor: default;
`;

export const AddTechButton = styled(Card)`
	color: ${theme.color.gray60};
	cursor: pointer;
`;

export const XIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 15px;
	height: 15px;
	border: 1px solid black;
	background-color: black;
	border-radius: 50%;
	margin-left: 7px;
	margin-top: -1px;
	cursor: pointer;
	position: absolute;
	right: -3px;
	top: -3px;
`;

export const SmallWrapper = styled.div`
	display: flex;
	align-items: center;
	position: relative;
`;

export const Field = styled.div`
	margin-left: 40px;
`;

export const FieldTitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin-top: 19px;
`;

export const BtnWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

export const CancleBtn = styled.button`
	background: #ffffff;
	border: 1.5px solid #0f4c82;
	color: #0f4c82;
	border-radius: 3px;
	width: 93px;
	height: 40px;
	margin-right: 15px;
	cursor: pointer;
`;

export const SuccessBtn = styled.button`
	background: #ffffff;
	border: 1.5px solid #0f4c82;
	background-color: #0f4c82;
	color: white;
	border-radius: 3px;
	width: 93px;
	height: 40px;
	cursor: pointer;
	:disabled {
		background-color: ${theme.color.gray50};
		border: 1.5px solid ${theme.color.gray50};
		cursor: not-allowed;
	}
`;

export const FieldTitle = styled.h3`
	height: 39px;
	margin: 15px 0px;
`;

export const Input = styled.input<{ marginTop?: number }>`
	width: 180px;
	height: 45px;
	font-size: 15px;
	padding: 10px 42px 10px 15px;
	outline: none;
	border-radius: 2px;
	border: 1px solid ${theme.color.gray50};
	background: ${theme.color.gray20};
	margin-top: ${({ marginTop }) => marginTop + 'px'};
`;

export const Textarea = styled.textarea`
	width: 100%;
	min-height: 110px;
	margin-top: 15px;
	font-size: 15px;
	padding: 10px 25px 10px 15px;
	outline: none;
	border-radius: 2px;
	border: 1px solid ${theme.color.gray50};
	background: ${theme.color.gray20};
	resize: none;
`;

export const NumText = styled.div`
	color: black;
	font-weight: 400;
	margin-top: 6px;
	position: absolute;
	left: 148px;
	top: 23px;
`;

export const JobCard = styled.button<{ colorBool: boolean }>`
	height: 39px;
	padding: 0px 20px;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
	border-radius: 5px;
	margin-right: 10px;
	border: none;
	background-color: ${(props) => (props.colorBool ? '#0F4C82' : 'white')};
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: ${(props) => (props.colorBool ? 'white' : 'black')};
	cursor: pointer;
`;

export const FieldWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 30px 0px;
`;

export const ContentsText = styled.div`
	font-weight: 400;
	font-size: 14px;
	color: #7f7f7f;
	margin-top: 10px;
	text-align: left;
`;

export const Title = styled.div`
	font-size: 22px;
	font-weight: 700;
	text-align: left;
`;

export const SearchIconWrapper = styled.div`
	position: absolute;
	right: 12px;
	top: 12px;
`;

export const SearchTechWrapper = styled.div<{ height: number }>`
	position: absolute;
	width: 180px;
	border: 1px solid ${theme.color.gray50};
	background-color: white;
	display: flex;
	flex-direction: column;
	height: ${({ height }) => height + 'px'};
	max-height: 130px;
	right: 0;
	top: 45px;
	white-space: nowrap;
	overflow: scroll;
	z-index: 2;
`;

export const SearchTechCard = styled.div`
	width: 100%;
	padding: 15px;
	background-color: white;
	font-size: 17px;
	cursor: pointer;
`;
