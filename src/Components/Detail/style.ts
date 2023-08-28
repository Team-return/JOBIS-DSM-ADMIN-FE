import { Input } from '@team-return/design-system';
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
	position: relative;
`;

export const Stack = styled.div<{ flexDirection?: string; width?: number }>`
	width: 100%;
	display: flex;
	width: ${({ width }) => (width ? width + '%' : '100%')};
	flex-direction: ${({ flexDirection }) =>
		flexDirection === 'column' ? 'column' : 'row'};
`;

export const TitleBox = styled.div<{ width?: number; height?: number }>`
	width: ${({ width }) => (width ? width + '%' : '10%')};
	height: ${({ height }) => (height ? height + 'px' : '75px')};
	border: 1px solid #e5e5e5;
	background: #fafafa;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #000;
	font-size: 20px;
	font-weight: 500;
`;

export const CompanyLogo = styled.img`
	height: 80px;
	width: 80px;
`;

export const LogoWrapper = styled.div`
	height: 80px;
	border: 1.5px solid #cccccc;
	position: relative;
	overflow: hidden;
`;

export const LogoEditWrapper = styled.div`
	position: relative;
`;

export const LogoEditImg = styled.img`
	position: absolute;
	height: 30px;
	border: 1px solid #7f7f7f;
	border-radius: 50%;
	padding: 2px;
	right: -8px;
	bottom: -8px;
	background-color: white;
	cursor: pointer;
`;

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: -30px 0 20px 0;
`;

export const Textarea = styled.textarea<{
	width?: number;
	height?: number;
	disabled?: boolean;
}>`
	width: ${({ width }) => (width ? width + '%' : '100%')};
	height: ${({ height }) => (height ? height + 'px' : '75px')};
	color: ${({ disabled }) => (disabled ? '#cccccc' : '#000000')};
	&::placeholder {
		color: ${({ disabled }) => (disabled ? '#cccccc' : '#7f7f7f')};
	}
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'auto')};
	border: 1px solid #e5e5e5;
	background-color: #ffffff;
	font-weight: 400;
	line-height: 26px;
	font-size: 18px;
	outline: none;
	padding: 15px;
`;

export const ContentBox = styled.div<{
	width?: number;
	height?: number;
	overflow?: string;
	longText?: boolean;
}>`
	width: ${({ width }) => (width ? width + '%' : '10%')};
	height: ${({ height }) => (height ? height + 'px' : '75px')};
	border: 1px solid #e5e5e5;
	background: #fff;
	padding: ${({ longText }) => (longText ? '30px' : 0)} 30px;
	color: #000;
	display: flex;
	align-items: ${({ longText }) => (longText ? 'flex-start' : 'center')};
	font-size: 16px;
	font-weight: 350;
	overflow: ${({ overflow }) => (overflow === 'scroll' ? 'scroll' : 'none')};
	white-space: pre-line;
	position: relative;
	.companyName {
		padding-right: 70px;
	}
`;

export const CustomInput = styled(Input)`
	:disabled {
		background-color: #f7f7f7;
		color: #7f7f7f;
	}
`;
