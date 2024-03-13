import { CSSProperties } from 'react';
import styled from 'styled-components';
import ImgImg from './img.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const PDFFile = () => {
	const date = new Date();

	const converToPdf = async () => {
		const date = new Date();

		const canvas = await html2canvas(document.querySelector('#wrting')!);
		const imageFile = canvas.toDataURL('image/svg');
		const doc = new jsPDF('p', 'mm', 'a4');
		const pageWidth = doc.internal.pageSize.getWidth();
		const pageHeight = doc.internal.pageSize.getHeight();

		const widthRatio = pageWidth / canvas.width;
		const customHeight = canvas.height * widthRatio;
		doc.addImage(imageFile, 'svg', 0, 0, pageWidth, customHeight);
		let heightLeft = customHeight;
		let heightAdd = -pageHeight;

		while (heightLeft >= pageHeight) {
			doc.addPage();
			doc.addImage(
				imageFile,
				'svg',
				0,
				heightAdd,
				pageWidth,
				customHeight
			);
			heightLeft -= pageHeight;
			heightAdd -= pageHeight;
		}
		doc.save(`모집의뢰서.pdf`);
	};

	return (
		<Container>
			{/* <img
				src={ImgImg}
				alt=""
				style={{ width: '595px', height: '842px' }}
			/> */}
			<button onClick={converToPdf}>다운로드</button>
			<Wrapper id="wrting">
				<HeaderLine />
				<Text
					$size={18}
					$margin={'6px 0 3px 0'}
					$weight={500}
				>{`${date.getFullYear()}학년도 3학년 채용형 현장실습생 모집의뢰서`}</Text>
				<HeaderLine />
				<TitleWrapper>
					<Text $size={15} $weight={500} $margin={'10px 0 2px 0'}>
						수&emsp;&emsp;신 : 대덕소프트웨어마이스터고등학교
						산학협력부
					</Text>
					<Text $size={15} $weight={500}>
						제&emsp;&emsp;목 : 채용형 현장실습생 모집 의뢰
					</Text>
					<Text $size={11} $weight={400} $margin={'4px 0 0 0'}>
						※ 필수 서류: 모집의뢰서,{' '}
						<strong style={{ textDecoration: 'underline' }}>
							사업자등록증 사본
						</strong>
						&emsp;&emsp;※ 회사소개서 첨부시 학생-기업 매칭 참고자료
						활용 가능
					</Text>
					<Text $size={11} $weight={400}>
						※ 필수서류 미제출 및{' '}
						<span style={{ color: '#D80000' }}>
							직인 날인이 빠진 경우 공문 접수가 불가합니다.
						</span>
					</Text>
				</TitleWrapper>
				<table
					style={{
						width: '100%',
						height: '100%',
						tableLayout: 'fixed',
					}}
				>
					<tr>
						<td>1</td>
						<td colSpan={3} align="center">
							모집인원
						</td>
						<td colSpan={20}></td>
					</tr>
					<tr>
						<td>2</td>
						<td colSpan={3} align="center">
							기업명
						</td>
						<td colSpan={6}></td>
						<td colSpan={4} align="center">
							사업자등록번호
						</td>
						<td colSpan={10}></td>
					</tr>
					<tr>
						<td>3</td>
						<td colSpan={3} align="center">
							업종형태
						</td>
						<td colSpan={6}></td>
						<td rowSpan={2} colSpan={4} align="center">
							연락처
						</td>
						<td colSpan={10}></td>
					</tr>
					<tr>
						<td>4</td>
						<td colSpan={3} align="center">
							{'앱/웹\n서비스명'}
						</td>
						<td colSpan={6}></td>
						<td colSpan={10}></td>
					</tr>
					<tr>
						<td>5</td>
						<td colSpan={3} align="center">
							근무지
						</td>
						<td colSpan={20}></td>
					</tr>
					<tr>
						<td>6</td>
						<td colSpan={3} align="center">
							설립일자
						</td>
						<td colSpan={6}></td>
						<td colSpan={3} align="center">
							연매출액
						</td>
						<td colSpan={5}></td>
						<td colSpan={3} align="center">
							근로자수
						</td>
						<td colSpan={3}></td>
					</tr>
					<tr>
						<td>7</td>
						<td colSpan={3} align="center">
							회사소개
						</td>
						<td colSpan={20}></td>
					</tr>
					<tr>
						<td>8</td>
						<td colSpan={3} align="center">
							{'현장\n실습생\n선발\n직무'}
						</td>
						<td colSpan={20}></td>
					</tr>
					<tr>
						<td>9</td>
						<td colSpan={3} align="center">
							{'자격\n조건'}
						</td>
						<td colSpan={20}></td>
					</tr>
					<tr>
						<td rowSpan={6}>10</td>
						<td rowSpan={6} colSpan={3} align="center">
							{'현장\n실습생\n근무조건'}
						</td>
						<td colSpan={4} align="center">
							{'현장 실습생\n출근 및 근무'}
						</td>
						<td colSpan={16}></td>
					</tr>
					<tr>
						<td colSpan={4} align="center">
							{'수당 및\n채용 시\n급여 정보'}
						</td>
						<td colSpan={16}></td>
					</tr>
					<tr>
						<td colSpan={4} align="center">
							식사 제공
						</td>
						<td colSpan={16}></td>
					</tr>
					<tr>
						<td colSpan={4} align="center">
							사내 복지
						</td>
						<td colSpan={16}></td>
					</tr>
					<tr>
						<td rowSpan={2} colSpan={4} align="center">
							전형절차
						</td>
						<td rowSpan={2} colSpan={6}></td>
						<td colSpan={5} align="center">
							병역특례기업
						</td>
						<td colSpan={5}></td>
					</tr>
					<tr>
						<td colSpan={5} align="center">
							{'산업기능요원 TO\n및 신청계획'}
						</td>
						<td colSpan={5}></td>
					</tr>
					<tr>
						<td>11</td>
						<td colSpan={3} align="center">
							필요서류
						</td>
						<td colSpan={7}></td>
						<td colSpan={3} align="center">
							모집기간
						</td>
						<td colSpan={10}></td>
					</tr>
				</table>
				<DateWrapper>
					<DateText>2024년</DateText>
					<DateText>03월</DateText>
					<DateText>06일</DateText>
				</DateWrapper>
			</Wrapper>
		</Container>
	);
};

const Container = styled.div`
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Wrapper = styled.div`
	min-height: 842px;
	width: 595px;
	border: 1px solid black;
	padding: 50px 40px;
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
`;

const HeaderLine = styled.div`
	height: 1.5px;
	width: 100%;
	background-color: black;
`;

const TitleWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Text = styled.span<{
	$size: number;
	$margin?: CSSProperties['margin'];
	$weight: CSSProperties['fontWeight'];
}>`
	font-size: ${({ $size }) => $size}px;
	margin: ${({ $margin }) => $margin};
	font-weight: ${({ $weight }) => $weight};
`;

const DateWrapper = styled.footer`
	display: flex;
	gap: 30px;
	margin: 20px auto;
`;

const DateText = styled.span`
	font-size: 16px;
	font-weight: 500;
`;
