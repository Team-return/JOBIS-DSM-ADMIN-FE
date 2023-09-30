import { theme } from '@team-return/design-system';
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	width: 730px;
`;

export const DndItemWrapper = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid ${theme.color.gray50};
	width: 300px;
	height: 50px;
	border-radius: 8px;
	margin-bottom: 5px;
`;

export const DndWrapper = styled.div`
	margin-top: 14px;
	width: 330px;
	height: 320px;
	overflow: scroll;
`;

export const DndText = styled.div`
	font-size: 14px;
	color: ${theme.color.gray60};
	font-weight: 600;
	margin-left: 2px;
`

export const ProgressWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 400px;
	height: 360px;
	background-color: white;
	padding-top: 40px;
	margin-left: 30px;
`;

export const Title = styled.div`
	font-size: 22px;
	font-weight: 600;
`;

export const ProgressListWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
	width: 390px;
	height: 240px;
`;

export const Card = styled.div<{ isSelect: boolean }>`
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;
	font-size: 17px;
	color: ${({ isSelect }) => (isSelect ? theme.color.blue : '#A5A5A5')};
	font-weight: 500;
	border: 1.5px solid
		${({ isSelect }) => (isSelect ? theme.color.blue : theme.color.gray50)};
	border-radius: 8px;
	cursor: pointer;
	&:hover {
		border: 1.5px solid
			${({ isSelect }) => (isSelect ? null : theme.color.gray60)};
		color: ${({ isSelect }) => (isSelect ? null : theme.color.gray70)};
	}
`;

export const SuccessBtn = styled.button`
	background: #ffffff;
	border: 1.5px solid #0f4c82;
	background-color: #0f4c82;
	color: white;
	border-radius: 3px;
	width: 390px;
	height: 40px;
	cursor: pointer;
	:disabled {
		background-color: ${theme.color.gray50};
		border: 1.5px solid ${theme.color.gray50};
		cursor: not-allowed;
	}
`;

export const SelectIconImg = styled.img`
	position: absolute;
	top: -7px;
	right: -7px;
`;
