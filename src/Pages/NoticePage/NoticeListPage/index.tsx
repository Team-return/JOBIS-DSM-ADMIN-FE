import React from 'react';
import * as _ from './style';
import { Header } from '../../../Components/Header';
import { Link } from 'react-router-dom';
import { Button } from '@team-return/design-system';

export function NoticeListPage() {
	return (
		<>
			<Header />
			<_.Wrapper>
				<_.Background>
					<_.TitleWrapper>
						<_.Title>공지사항</_.Title>
						<Link to={'/Notice/Write'}>
							<Button size="M">+ 공지 추가하기</Button>
						</Link>
					</_.TitleWrapper>
					<_.Box>
						<_.Table>
							<_.Thead>
								<tr>
									<_.HeaderNumber>번호</_.HeaderNumber>
									<_.HeaderTitle>제목</_.HeaderTitle>
									<_.HeaderDate>작성일</_.HeaderDate>
								</tr>
							</_.Thead>
							<Link to={'/Notice/Detail'}>
								<_.Tbody>
									<_.Tr>
										<_.NoticeNumber>12</_.NoticeNumber>
										<_.NoticeTitle>
											[중요] 오리엔테이션날 일정 안내
										</_.NoticeTitle>
										<_.NoticeDate>2024-01-16</_.NoticeDate>
									</_.Tr>
								</_.Tbody>
							</Link>
						</_.Table>
						<_.Bottom></_.Bottom>
					</_.Box>
				</_.Background>
			</_.Wrapper>
		</>
	);
}
