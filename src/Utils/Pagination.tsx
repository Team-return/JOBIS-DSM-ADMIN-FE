import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { RecruitmentFormQueryStringType } from '../apis/Recruitments/request';

interface PropsType {
	total: number;
	limit: number;
	data: RecruitmentFormQueryStringType;
	setData: Dispatch<SetStateAction<RecruitmentFormQueryStringType>>;
}

export function Pagination({ total, limit, data, setData }: PropsType) {
	const numPages = Math.ceil(total / limit);

	const changePageNumber = (num: number) => {
		setData({
			...data,
			page: num,
		});
	};

	return (
		<>
			<Nav>
				<Button
					onClick={() => {
						changePageNumber(data?.page - 1);
					}}
					disabled={data?.page === 1}
				>
					&lt;
				</Button>
				{Array(numPages)
					.fill(numPages)
					.map((_, i) => {
						return (
							<Text
								key={i + 1}
								onClick={() => {
									changePageNumber(i + 1);
								}}
								aria-disabled={true}
							>
								{i + 1}
							</Text>
						);
					})}
				<Button
					onClick={() => {
						changePageNumber(data?.page + 1);
					}}
					disabled={data?.page === numPages}
				>
					&gt;
				</Button>
			</Nav>
		</>
	);
}

const Text = styled.div`
	font-size: 20px;
	color: #7f7f7f;
	font-weight: 400;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
	&:disabled {
		color: black;
	}
`;

const Nav = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	margin-top: 25px;
`;

const Button = styled.button`
	border: none;
	border-radius: 8px;
	padding: 8px;
	margin: 0;
	color: #7f7f7f;
	background-color: transparent;
	font-weight: 400;
	font-size: 20px;
	cursor: pointer;
	&:hover {
		color: black;
	}
	&:disabled {
		color: #cccccc;
		cursor: not-allowed;
	}
`;
