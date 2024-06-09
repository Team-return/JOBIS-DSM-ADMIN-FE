import React from 'react';
import * as _ from './style';
import { Header } from '../../../Components/Header';
import { Link } from 'react-router-dom';
import { Button } from '@team-return/design-system';
import { useNoticeListData } from '../../../Apis/Notices';

export function NoticeListPage() {
	const { notices } = useNoticeListData();

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
							<_.Tbody>
								{notices.map((notice, index) => (
									<Link
										key={index}
										to={`/Notice/Detail/${notice.id}`}
									>
										<_.Tr>
											<_.NoticeNumber>
												{index + 1}
											</_.NoticeNumber>
											<_.NoticeTitle>
												{notice.title}
											</_.NoticeTitle>
											<_.NoticeDate>
												{notice.created_at.substring(
													0,
													10
												)}
											</_.NoticeDate>
										</_.Tr>
									</Link>
								))}
							</_.Tbody>
						</_.Table>
						<_.Bottom></_.Bottom>
					</_.Box>
				</_.Background>
			</_.Wrapper>
		</>
	);
}
