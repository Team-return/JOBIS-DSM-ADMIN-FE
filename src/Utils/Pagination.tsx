import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface PropsType {
	total: number;
	limit: number;
	data: any;
	setData: Dispatch<SetStateAction<any>>;
	refetch: () => void;
}

/** 페이지네이션을 구현한 함수입니다. */
export function Pagination({ total, limit, data, setData, refetch }: PropsType) {
	const numPages = Math.ceil(total / limit);

	const changePageNumber = (num: number) => {
		setData((prevData: any) => ({ ...prevData, page: num }));
		setTimeout(refetch);
	};

	return (
		<Nav>
			<Button onClick={() => changePageNumber(data.page - 1)} disabled={data.page === 1}>
				&lt;
			</Button>
			{Array.from({ length: numPages }, (_, i) => (
				<Text key={i + 1} onClick={() => changePageNumber(i + 1)} focus={data.page === i + 1}>
					{i + 1}
				</Text>
			))}
			<Button onClick={() => changePageNumber(data.page + 1)} disabled={data.page === numPages}>
				&gt;
			</Button>
		</Nav>
	);
}

const Text = styled.div<{ focus: boolean }>`
	font-size: 20px;
	color: ${({ focus }) => (focus ? '#111111' : '#7f7f7f')};
	font-weight: 400;
	cursor: pointer;
	&:hover {
		cursor: ${({ focus }) => (focus ? 'not-allowed' : 'pointer')};
		text-decoration: ${({ focus }) => (focus ? 'none' : 'underline')};
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
