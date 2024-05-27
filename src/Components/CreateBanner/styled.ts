import styled from 'styled-components';

export const TempleteWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 558px;
	height: 1228px;
	background-color: white;
	padding: 16px 0px 0px 16px;
	border-radius: 4px;
	overflow: scroll;
	div {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}
`;

export const TemplteTitle = styled.p`
	color: #333333;
	font-size: 18px;
	font-weight: 600;
`;

export const Title = styled.p`
	color: #333333;
	font-size: 28px;
	font-weight: 600;
`;

export const TempleteImg = styled.img`
	width: 500px;
	height: 160px;
`;

export const CreateWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 28px;
	width: 1080px;
	height: 460px;
	background-color: white;
	border-radius: 4px;
	padding: 28px 0px 0px 40px;
`;

export const BannerImg = styled.img`
	width: 1000px;
	height: 320px;
	z-index: 0;
`;

export const CaptureWrapper = styled.div`
	width: 1000px;
	height: 320px;
`;

export const InputWrapper = styled.div<{
	hasValue: {
		title1: boolean;
		title2: boolean;
		companyName: boolean;
		description: boolean;
	};
}>`
	position: absolute;
	top: 35%;
	left: 90px;
	display: flex;
	flex-direction: column;
	gap: 15px;

	.title1 {
		color: white;
		font-size: ${(props) => (props.hasValue.title1 ? '24px' : '12px')};
		font-weight: ${(props) => (props.hasValue.title1 ? '700' : '500')};
	}

	.title2 {
		color: white;
		font-size: ${(props) => (props.hasValue.title1 ? '24px' : '12px')};
		font-weight: ${(props) => (props.hasValue.title2 ? '700' : '500')};
	}

	.companyName {
		color: ${(props) => (props.hasValue.companyName ? 'white' : 'black')};
		font-size: ${(props) => (props.hasValue.companyName ? '20px' : '12px')};
		font-weight: 500;
	}

	.description {
		color: ${(props) => (props.hasValue.description ? '#E5E5E5' : 'black')};
		font-size: ${(props) => (props.hasValue.description ? '14px' : '12px')};
		font-weight: 500;
	}
`;

export const Input = styled.input<{ hasValue: boolean }>`
	width: 250px;
	height: 34px;
	padding: 8px;
	border-radius: 12px;
	background-color: ${(props) => (props.hasValue ? 'transparent' : 'white')};
	transition: background-color 0.3s ease;

	&::placeholder {
		font-size: 12px;
		font-weight: 500;
		color: #cccccc;
	}
`;

export const LogoUpload = styled.div``;

export const FileInputContainer = styled.div`
	position: absolute;
	top: 35%;
	left: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 162px;
	height: 162px;
	border-radius: 12px;
	background-color: #ffffff;
	font-size: 12px;
	color: #cccccc;
`;

export const FileInput = styled.input`
	width: 100%;
	height: 100%;
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	cursor: pointer;
`;

export const MovePage = styled.div`
	display: flex;
	flex-direction: column;
	gap: 44px;
	width: 1080px;
	height: 390px;
	padding: 28px 40px 0px 40px;
	border-radius: 4px;
	background-color: white;
`;

export const Table = styled.table`
	display: flex;
	flex-direction: column;
	> tr {
		display: flex;
		border: 1px solid #e5e5e5;
	}
`;

export const CompanyNameSearch = styled.tr`
	position: relative;
`;

export const RecruitmentSearch = styled.tr`
	position: relative;
	z-index: 1;
`;

export const Td = styled.td`
	padding: 13px 9px;
	border-right: 1px solid #e5e5e5;
`;

export const Name = styled.td`
	display: flex;
	gap: 16px;
	padding: 11px 16px;
`;

export const SearchIcon = styled.img`
	width: 23px;
	height: 23px;
`;

export const Search = styled.input`
	width: 400px;
`;

export const SearchEx = styled.div`
	background-color: #f7f7f7;
	width: 967px;
	z-index: 2;
	position: absolute;
	left: 32px;
	top: 46px;
	border-top: 1px solid #cccccc;
	> div {
		padding: 11.5px 9px;
		display: flex;
		gap: 16px;
		border-right: 1px solid #cccccc;
		border-bottom: 1px solid #cccccc;
		border-left: 1px solid #cccccc;
	}
	> li {
		font-size: 22px;
		cursor: pointer;
	}
`;

export const recruitmentEx = styled.div`
	background-color: #f7f7f7;
	width: 967px;
	z-index: 2;
	position: absolute;
	left: 32px;
	top: 46px;
	border-top: 1px solid #cccccc;
	> div {
		padding: 11.5px 9px;
		display: flex;
		gap: 16px;
		border-right: 1px solid #cccccc;
		border-bottom: 1px solid #cccccc;
		border-left: 1px solid #cccccc;
	}
	> li {
		font-size: 22px;
		cursor: pointer;
	}
`;

export const TimeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
	width: 550px;
	height: 205px;
	border-radius: 4px;
	background-color: white;
	padding: 28px 0px 0px 40px;
`;

export const Time = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
`;

export const Wrapper = styled.div`
	display: flex;
	gap: 75px;
`;

export const TimeTitle = styled.p``;

export const TimeInput = styled.input`
	border: 1px solid #e5e5e5;
`;

export const Right = styled.div`
	display: flex;
	flex-direction: column;
	gap: 26px;
`;

export const Container = styled.div`
	display: flex;
	gap: 76px;
	padding: 116px 0px 0px 28px;
	background-color: #fafafa;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 370px;
`;
