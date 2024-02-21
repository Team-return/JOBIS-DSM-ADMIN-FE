import * as _ from './styled';
import templete from '../../Assets/PNG/templete.png';
import banner from '../../Assets/PNG/banner.png';
import search from '../../Assets/SVG/search.svg';
import { Button } from '@team-return/design-system';

export function CreateBanner() {
	return (
		<>
			<_.Container>
				<_.TempleteWrapper>
					<_.TemplteTitle>템플릿</_.TemplteTitle>
					<div>
						<_.TempleteImg src={banner} />
						<_.TempleteImg src={banner} />
						<_.TempleteImg src={banner} />
						<_.TempleteImg src={banner} />
						<_.TempleteImg src={banner} />
						<_.TempleteImg src={banner} />
						<_.TempleteImg src={banner} />
						<_.TempleteImg src={banner} />
						<_.TempleteImg src={banner} />
					</div>
				</_.TempleteWrapper>
				<_.Right>
					<_.CreateWrapper>
						<_.Title>배너 내용을 추가해주세요.</_.Title>
						<div>
							<_.BannerImg src={templete} />
							<_.InputWrapper>
								<_.Input placeholder="제목"></_.Input>
								<_.Input placeholder="제목"></_.Input>
								<_.Input placeholder="회사 이름 "></_.Input>
								<_.Input placeholder="설명"></_.Input>
							</_.InputWrapper>
							<_.LogoUpload>로고를 업로드 해 주세요</_.LogoUpload>
						</div>
					</_.CreateWrapper>
					<_.MovePage>
						<_.Title>
							배너를 누르면 이동 될 페이지를 선택해 주세요.
						</_.Title>
						<_.Table>
							<tr>
								<_.Td>
									<input type="radio" name="page" />
								</_.Td>
								<_.Name>
									<_.SearchIcon src={search} />
									<_.Search placeholder="기업명 검색 (기업 상세)"></_.Search>
								</_.Name>
							</tr>
							<tr>
								<_.Td>
									<input type="radio" name="page" />
								</_.Td>
								<_.Name>
									<_.SearchIcon src={search} />
									<_.Search placeholder="기업명 검색 (모집 의뢰서)"></_.Search>
								</_.Name>
							</tr>
							<tr>
								<_.Td>
									<input type="radio" name="page" />
								</_.Td>
								<_.Name>체험형 현장실습</_.Name>
							</tr>
							<tr>
								<_.Td>
									<input type="radio" name="page" />
								</_.Td>
								<_.Name>북마크</_.Name>
							</tr>
							<tr>
								<_.Td>
									<input type="radio" name="page" />
								</_.Td>
								<_.Name>페이지 이동 안 함</_.Name>
							</tr>
						</_.Table>
					</_.MovePage>
					<_.ButtonWrapper>
						<_.TimeWrapper>
							<_.Title>
								배너가 보여질 기간을 선택해 주세요.
							</_.Title>
							<_.Wrapper>
								<_.Time>
									<_.TimeTitle>시작</_.TimeTitle>
									<_.TimeInput type="date"></_.TimeInput>
								</_.Time>
								<_.Time>
									<_.TimeTitle>끝</_.TimeTitle>
									<_.TimeInput type="date"></_.TimeInput>
								</_.Time>
							</_.Wrapper>
						</_.TimeWrapper>
						<Button kind="Solid">배너 추가</Button>
					</_.ButtonWrapper>
				</_.Right>
			</_.Container>
		</>
	);
}
