import { CSSProperties, useEffect, useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';
import { useGetRecruitmentFormDetail } from '../../Apis/Recruitments';
import { useGetCompanyDetail } from '../../Apis/Companies';
import { hiringProgress } from '../../Utils/Translation';
import { regex } from '../../Utils/Regex';
import { Button } from '@team-return/design-system';

export const PDFFile = () => {
	const params = useParams();
	const [companyId, setCompanyId] = useState(0);
	const { data: recruitmentDetail, isLoading: recruitmentDetailLoading } =
		useGetRecruitmentFormDetail(params.id!);
	const { data: companyDetail, isLoading: companyDetailLoading } =
		useGetCompanyDetail(companyId.toString());
	const { buisness_number, phone_number } = regex;

	useEffect(() => {
		if (recruitmentDetail) {
			setCompanyId(recruitmentDetail?.company_id);
		}
	}, [recruitmentDetail]);

	const date = new Date();

	const converToPdf = async () => {
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
		<>
			{!recruitmentDetailLoading && !companyDetailLoading && (
				<Container>
					<DownloadButton>
						<Button onClick={converToPdf} iconName="Download">
							다운로드
						</Button>
					</DownloadButton>
					<Wrapper id="wrting">
						<HeaderLine />
						<Text
							$size={18}
							$margin={'6px 0 3px 0'}
							$weight={500}
						>{`${date.getFullYear()}학년도 3학년 채용형 현장실습생 모집의뢰서`}</Text>
						<HeaderLine />
						<TitleWrapper>
							<Text
								$size={15}
								$weight={500}
								$margin={'10px 0 2px 0'}
							>
								수&emsp;&emsp;신 :
								대덕소프트웨어마이스터고등학교 산학협력부
							</Text>
							<Text $size={15} $weight={500}>
								제&emsp;&emsp;목 : 채용형 현장실습생 모집 의뢰
							</Text>
							<Text
								$size={11}
								$weight={400}
								$margin={'4px 0 0 0'}
							>
								※ 필수 서류: 모집의뢰서,{' '}
								<strong style={{ textDecoration: 'underline' }}>
									사업자등록증 사본
								</strong>
								&emsp;&emsp;※ 회사소개서 첨부시 학생-기업 매칭
								참고자료 활용 가능
							</Text>
							<Text $size={11} $weight={400}>
								※ 필수서류 미제출 및{' '}
								<span style={{ color: '#D80000' }}>
									직인 날인이 빠진 경우 공문 접수가
									불가합니다.
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
								<td style={{ fontWeight: 700 }}>1</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									모집인원
								</td>
								<td colSpan={20}>
									{recruitmentDetail?.areas
										.map(
											(area) =>
												`${area.job
													.map((item) => item.name)
													.join(', ')}(${
													area.hiring
												}명)`
										)
										.join(' / ')}
								</td>
							</tr>
							<tr>
								<td style={{ fontWeight: 700 }}>2</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									기업명
								</td>
								<td colSpan={6} align="center">
									{companyDetail?.company_name}
								</td>
								<td
									colSpan={4}
									align="center"
									style={{ fontWeight: 700 }}
								>
									사업자등록번호
								</td>
								<td colSpan={10}>
									{buisness_number(
										companyDetail?.business_number || ''
									)}
								</td>
							</tr>
							<tr>
								<td style={{ fontWeight: 700 }}>3</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									업종형태
								</td>
								<td colSpan={6} align="center">
									{companyDetail?.business_area}
								</td>
								<td
									rowSpan={2}
									colSpan={4}
									align="center"
									style={{ fontWeight: 700 }}
								>
									연락처
								</td>
								<td
									rowSpan={2}
									colSpan={10}
								>{`대표번호: ${phone_number(
									companyDetail?.representative_phone_no || ''
								)}\n담당자(직위): ${
									companyDetail?.manager_name
								}\n연락처(cell): ${phone_number(
									companyDetail?.manager_phone_no || ''
								)}\ne-mail: ${companyDetail?.email}`}</td>
							</tr>
							<tr>
								<td style={{ fontWeight: 700 }}>4</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									{'앱/웹\n서비스명'}
								</td>
								<td colSpan={6} align="center">
									{companyDetail?.service_name}
								</td>
							</tr>
							<tr>
								<td style={{ fontWeight: 700 }}>5</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									근무지
								</td>
								<td colSpan={20}>
									{`${companyDetail?.main_address} ${companyDetail?.main_address_detail}`}
								</td>
							</tr>
							<tr>
								<td style={{ fontWeight: 700 }}>6</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									설립일자
								</td>
								<td colSpan={6} align="center">
									{companyDetail?.founded_at}
								</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									연매출액
								</td>
								<td colSpan={5} align="center">
									약{' '}
									{companyDetail?.take
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									억/원
								</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									근로자수
								</td>
								<td colSpan={3}>
									{companyDetail?.worker_number}명
								</td>
							</tr>
							<tr>
								<td style={{ fontWeight: 700 }}>7</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									회사소개
								</td>
								<td colSpan={20}>
									{companyDetail?.company_introduce}
								</td>
							</tr>
							<tr>
								<td style={{ fontWeight: 700 }}>8</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									{'현장\n실습생\n선발\n직무'}
								</td>
								<td colSpan={20}>
									{recruitmentDetail?.areas
										.map((area) =>
											area.job
												.map((item) => item.name)
												.join(', ')
										)
										.join(' / ')}
								</td>
							</tr>
							<tr>
								<td style={{ fontWeight: 700 }}>9</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									{'자격\n조건'}
								</td>
								<td colSpan={20}>
									{recruitmentDetail?.areas
										.map(
											(area) =>
												`${area.major_task}\n${
													area.preferential_treatment &&
													`(우대사항) ${area.preferential_treatment}\n`
												}`
										)
										.join('/\n')}
								</td>
							</tr>
							<tr>
								<td rowSpan={6} style={{ fontWeight: 700 }}>
									10
								</td>
								<td
									rowSpan={6}
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									{'현장\n실습생\n근무조건'}
								</td>
								<td
									colSpan={4}
									align="center"
									style={{ fontWeight: 700 }}
								>
									{'현장 실습생\n출근 및 근무'}
								</td>
								<td colSpan={16}>{`${
									recruitmentDetail?.working_hours
								} ${
									recruitmentDetail?.flexible_working
										? '유연근무제'
										: ''
								}`}</td>
							</tr>
							<tr>
								<td
									colSpan={4}
									align="center"
									style={{ fontWeight: 700 }}
								>
									{'수당 및\n채용 시\n급여 정보'}
								</td>
								<td colSpan={16}>
									{`현장 실습) 수당 ${recruitmentDetail?.train_pay
										.toString()
										.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											','
										)} 원\n`}
									{`채용 전환) 연봉 ${
										recruitmentDetail?.pay
											? `${recruitmentDetail.pay.replace(
													/\B(?=(\d{3})+(?!\d))/g,
													','
											  )}만원`
											: `추후협의`
									} \n`}
									{`※ 참고: 2024년 최저임금 2,060,740원(시급 9,860원)\n`}
									<span style={{ color: '#D80000' }}>
										※ 현장실습수당, 채용시 연봉정보 필수
										작성
									</span>
								</td>
							</tr>
							<tr>
								<td
									colSpan={4}
									align="center"
									style={{ fontWeight: 700 }}
								>
									기술스택
								</td>
								<td colSpan={16}>
									{recruitmentDetail?.areas
										.map((area) =>
											area.tech
												.map((item) => item.name)
												.join(', ')
										)
										.join(' / ')}
								</td>
							</tr>
							<tr>
								<td
									colSpan={4}
									align="center"
									style={{ fontWeight: 700 }}
								>
									사내 복지
								</td>
								<td colSpan={16}>
									{recruitmentDetail?.benefits}
								</td>
							</tr>
							<tr>
								<td
									rowSpan={2}
									colSpan={4}
									align="center"
									style={{ fontWeight: 700 }}
								>
									전형절차
								</td>
								<td rowSpan={2} colSpan={6} align="center">
									{recruitmentDetail?.hiring_progress
										.map(
											(progress) =>
												hiringProgress[progress]
										)
										.join(' → ')}
								</td>
								<td
									colSpan={5}
									align="center"
									style={{ fontWeight: 700 }}
								>
									병역특례기업
								</td>
								<td colSpan={5}>
									{recruitmentDetail?.military_support
										? 'O'
										: 'X'}
								</td>
							</tr>
							<tr>
								<td
									colSpan={5}
									align="center"
									style={{ fontWeight: 700 }}
								>
									{'산업기능요원 TO\n및 신청계획'}
								</td>
								<td colSpan={5}>
									{recruitmentDetail?.military_support
										? 'O'
										: 'X'}
								</td>
							</tr>
							<tr>
								<td style={{ fontWeight: 700 }}>11</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									필요서류
								</td>
								<td colSpan={7}>
									{recruitmentDetail?.submit_document}
								</td>
								<td
									colSpan={3}
									align="center"
									style={{ fontWeight: 700 }}
								>
									모집기간
								</td>
								<td colSpan={10}>
									{!recruitmentDetail?.start_date &&
									!recruitmentDetail?.end_date
										? '상시모집'
										: `${
												recruitmentDetail.end_date.split(
													'-'
												)[1]
										  }월 ${
												recruitmentDetail.end_date.split(
													'-'
												)[2]
										  }일 까지`}
								</td>
							</tr>
						</table>
						<DateWrapper>
							<Text $size={16} $weight={500}>
								{date.getFullYear()}년
							</Text>
							<Text $size={16} $weight={500}>
								{(date.getMonth() + 1)
									.toString()
									.padStart(2, '0')}
								월
							</Text>
							<Text $size={16} $weight={500}>
								{date.getDate().toString().padStart(2, '0')}일
							</Text>
						</DateWrapper>
						<DateWrapper style={{ gap: 20 }}>
							<Text
								$size={16}
								$weight={500}
								style={{ textDecoration: 'underline' }}
							>
								{companyDetail?.company_name}
							</Text>
							<Text $size={16} $weight={500}>
								대표
							</Text>
							<Text
								$size={16}
								$weight={500}
								style={{
									textDecoration: 'underline',
									letterSpacing: 20,
								}}
							>
								{companyDetail?.representative_name}
							</Text>
							<Text $size={16} $weight={500}>
								(인)
							</Text>
						</DateWrapper>
					</Wrapper>
				</Container>
			)}
		</>
	);
};

const DownloadButton = styled.div`
	position: fixed;
	right: 50px;
	bottom: 40px;
`;

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
