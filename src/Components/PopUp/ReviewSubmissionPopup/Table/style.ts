import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	background-color: #ffffff;
	padding: 20px 30px 25px 30px;
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
	height: 310px;
`;

export const TitleText = styled.div`
	font-weight: 700;
	font-size: 20px;
	display: flex;
	text-align: center;
	justify-content: center;
`;

export const ContentText = styled.div<{ status?: boolean; click?: boolean }>`
	font-weight: 400;
	font-size: 18px;
	display: flex;
	justify-content: center;
	color: ${({ status }) => (status ? '#FF0000' : '#000000')};
	text-decoration: ${({ click }) => (click ? 'underline' : 'none')};
	text-underline-offset: 2px;
	text-decoration-thickness: 2px;
	cursor: ${({ click }) => (click ? 'pointer' : 'default')};
`;

export const SearchWrapper = styled.div`
	width: 100%;
	height: 60px;
	display: flex;
	align-items: center;
`;

export const CompanyText = styled.div`
	font-size: 25px;
	font-weight: 500;
`;

export const InputWrapper = styled.div`
	width: 100%;
	display: flex;
`;
