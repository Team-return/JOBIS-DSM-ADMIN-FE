import { Header } from '../../../Components/Header';
import * as _ from './style';
import { Icon } from '@team-return/design-system';
import { Link } from 'react-router-dom';

export function NoticeDetailPage() {
	return (
		<>
			<Header />
			<_.Wrapper>
				<_.Box>
					<_.ContentWrap>
						<_.HeaderWrap>
							<_.Title>[중요] 신입생 오리엔테이션 안내</_.Title>
							<_.IconBox>
								<_.IconWrapper>
									<Icon size={40} icon="Trash"></Icon>
								</_.IconWrapper>
								<_.IconWrapper>
									<Link to={'/Notice/Edit'}>
										<Icon
											size={40}
											icon="EditPencil"
										></Icon>
									</Link>
								</_.IconWrapper>
							</_.IconBox>
						</_.HeaderWrap>
						<_.Date>2024-03-09</_.Date>
						<_.Contents>
							신입생 오리엔테이션 책자에 있는 입학전 과제의
							양식입니다. 첨부파일을 다운받아 사용하시고, 영어와
							전공은 특별한 양식이 없으니 내용에 맞게 작성하여
							학교 홈페이지에 제출하시기 바랍니다. 신입생
							오리엔테이션 책자에 있는 입학전 과제의 양식입니다.
							첨부파일을 다운받아 사용하시고, 영어와 전공은 특별한
							양식이 없으니 내용에 맞게 작성하여 학교 홈페이지에
							제출하시기 바랍니다. 신입생 오리엔테이션 책자에 있는
							입학전 과제의 양식입니다. 첨부파일을 다운받아
							사용하시고, 영어와 전공은 특별한 양식이 없으니
							내용에 맞게 작성하여 학교 홈페이지에 제출하시기
							바랍니다.신입생 오리엔테이션 책자에 있는 입학전
							과제의 양식입니다. 첨부파일을 다운받아 사용하시고,
							영어와 전공은 특별한 양식이 없으니 내용에 맞게
							작성하여 학교 홈페이지에 제출하시기 바랍니다. 신입생
							오리엔테이션 책자에 있는 입학전 과제의 양식입니다.
							첨부파일을 다운받아 사용하시고, 영어와 전공은 특별한
							양식이 없으니 내용에 맞게 작성하여 학교 홈페이지에
							제출하시기 바랍니다.
						</_.Contents>
						<_.FileBox>
							<_.File>첨부파일</_.File>
							<_.FileWrap>
								<_.Files>
									<_.FileTitle>
										2024학년도 신입생 과제.hwp
									</_.FileTitle>
									<Icon
										size={20}
										icon="Download"
										cursor="pointer"
										color="blue"
									></Icon>
								</_.Files>
								<_.Files>
									<_.FileTitle>
										2024학년도 신입생 과제.hwp
									</_.FileTitle>
									<Icon
										size={20}
										icon="Download"
										cursor="pointer"
										color="blue"
									></Icon>
								</_.Files>
								<_.Files>
									<_.FileTitle>
										2024학년도 신입생 과제.hwp
									</_.FileTitle>
									<Icon
										size={20}
										icon="Download"
										cursor="pointer"
										color="blue"
									></Icon>
								</_.Files>
								<_.Files>
									<_.FileTitle>
										2024학년도 신입생 과제.hwp
									</_.FileTitle>
									<Icon
										size={20}
										icon="Download"
										cursor="pointer"
										color="blue"
									></Icon>
								</_.Files>
							</_.FileWrap>
						</_.FileBox>
					</_.ContentWrap>
				</_.Box>
			</_.Wrapper>
		</>
	);
}
