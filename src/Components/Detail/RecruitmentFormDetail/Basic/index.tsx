import { Button, Stack, Text } from '@team-return/design-system';
import { RecruitmentFormDetailResponse } from '../../../../Apis/Recruitments/response';
import { hiringProgress } from '../../../../Utils/Translation';
import * as _ from '../../style';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface PropsType {
	recruitmentFormDetail: RecruitmentFormDetailResponse;
	setCanEdit: Dispatch<SetStateAction<boolean>>;
}

export function RecruitmentFormDetailBasic({
	recruitmentFormDetail,
	setCanEdit,
}: PropsType) {
	const navigate = useNavigate();

	return (
		<_.Container>
			<_.Wrapper>
				<Stack direction="column">
					<_.BackWrapper onClick={() => navigate(-1)}>
						<_.BackIcon icon="Chevron" />
						<Text margin={[0, 0, -4, 0]} size="Body2">
							뒤로가기
						</Text>
					</_.BackWrapper>
					<_.LogoWrapper>
						<_.CompanyLogo
							src={`${process.env.REACT_APP_FILE_URL}${recruitmentFormDetail?.company_profile_url}`}
						/>
					</_.LogoWrapper>
				</Stack>
				<Stack gap={10}>
					<Button
						size="M"
						onClick={() =>
							navigate(
								`/pdf/${recruitmentFormDetail.recruitment_id}`
							)
						}
					>
						모집의뢰서 미리보기
					</Button>
					<Button size="M" onClick={() => setCanEdit(true)}>
						수정
					</Button>
				</Stack>
			</_.Wrapper>

			<_.Stack>
				<_.TitleBox>기업명</_.TitleBox>
				<_.ContentBox width={40}>
					{recruitmentFormDetail?.company_name}
				</_.ContentBox>
				<_.TitleBox>모집기간</_.TitleBox>
				<_.ContentBox width={40}>
					{recruitmentFormDetail?.start_date
						? `${recruitmentFormDetail?.start_date.replace(
								/-/g,
								'.'
						  )} ~ ${recruitmentFormDetail?.end_date.replace(
								/-/g,
								'.'
						  )}`
						: '상시모집'}
				</_.ContentBox>
			</_.Stack>

			<_.Stack>
				<_.TitleBox height={recruitmentFormDetail?.areas.length * 325}>
					모집분야
				</_.TitleBox>
				<_.Stack flexDirection="column" width={90}>
					{recruitmentFormDetail?.areas.map((area, i) => (
						<_.Stack key={area.id}>
							<_.TitleBox height={325} width={5}>
								{i + 1}
							</_.TitleBox>
							<_.Stack flexDirection="column" width={95}>
								<_.Stack>
									<_.TitleBox height={125}>
										채용인원
									</_.TitleBox>
									<_.ContentBox height={125} width={15}>
										{area.hiring}명
									</_.ContentBox>
									<_.TitleBox height={125}>분야</_.TitleBox>
									<_.ContentBox
										height={125}
										width={15}
										overflow="scroll"
										longText={true}
									>
										{area.job
											.map((item) => item.name)
											.join(' / ')}
									</_.ContentBox>
									<_.TitleBox height={125}>
										사용기술
									</_.TitleBox>
									<_.ContentBox
										height={125}
										width={40}
										overflow="scroll"
										longText={true}
									>
										{area.tech
											.map((item) => item.name)
											.join(' / ')}
									</_.ContentBox>
								</_.Stack>
								<_.Stack>
									<_.TitleBox height={200}>
										주요업무
									</_.TitleBox>
									<_.ContentBox
										height={200}
										width={40}
										longText={true}
										overflow="scroll"
									>
										{area.major_task}
									</_.ContentBox>
									<_.TitleBox height={200}>
										우대사항
									</_.TitleBox>
									<_.ContentBox
										height={200}
										width={40}
										longText={true}
										overflow="scroll"
									>
										{area.preferential_treatment || '-'}
									</_.ContentBox>
								</_.Stack>
							</_.Stack>
						</_.Stack>
					))}
				</_.Stack>
			</_.Stack>

			<_.Stack>
				<_.TitleBox>자격요건</_.TitleBox>
				<_.Stack flexDirection="column" width={90}>
					<_.Stack flexDirection="column" width={100}>
						<_.Stack>
							<_.TitleBox>국가자격증</_.TitleBox>
							<_.ContentBox
								width={60}
								longText={true}
								overflow="scroll"
							>
								{recruitmentFormDetail?.required_licenses.join(
									', '
								) || '-'}
							</_.ContentBox>
							<_.TitleBox>성적</_.TitleBox>
							<_.ContentBox width={20}>
								{recruitmentFormDetail?.required_grade
									? `${recruitmentFormDetail?.required_grade}%`
									: '-'}
							</_.ContentBox>
						</_.Stack>
					</_.Stack>
				</_.Stack>
			</_.Stack>

			<_.Stack>
				<_.TitleBox height={275}>근무조건</_.TitleBox>
				<_.Stack flexDirection="column" width={90}>
					<_.Stack flexDirection="column" width={100}>
						<_.Stack>
							<_.TitleBox>근무시간</_.TitleBox>
							<_.ContentBox width={23}>
								{recruitmentFormDetail?.working_hours.replace(
									/^(\d{2}:\d{2}):\d{2}$/,
									'$1'
								)}
							</_.ContentBox>
							<_.TitleBox>실습수당</_.TitleBox>
							<_.ContentBox width={23}>
								{recruitmentFormDetail?.train_pay
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								원/월
							</_.ContentBox>
							<_.TitleBox>정규직전환시</_.TitleBox>
							<_.ContentBox width={24}>
								{recruitmentFormDetail?.pay
									? `${recruitmentFormDetail?.pay
											.toString()
											.replace(
												/\B(?=(\d{3})+(?!\d))/g,
												','
											)}만원/연`
									: '-'}
							</_.ContentBox>
						</_.Stack>
						<_.Stack>
							<_.TitleBox height={200}>복리후생</_.TitleBox>
							<_.ContentBox
								height={200}
								width={90}
								longText={true}
							>
								{recruitmentFormDetail?.benefits || '-'}
							</_.ContentBox>
						</_.Stack>
					</_.Stack>
				</_.Stack>
			</_.Stack>

			<_.Stack>
				<_.TitleBox height={350}>채용절차</_.TitleBox>
				<_.Stack flexDirection="column" width={90}>
					<_.Stack flexDirection="column" width={100}>
						<_.Stack>
							<_.TitleBox>채용절차</_.TitleBox>
							<_.ContentBox width={60}>
								{recruitmentFormDetail?.hiring_progress
									.map(
										(progress, i) =>
											`${hiringProgress[progress]}${
												recruitmentFormDetail
													.hiring_progress.length !==
												i + 1
													? ' → '
													: ''
											}`
									)
									.join('')}
							</_.ContentBox>
							<_.TitleBox>
								병역특례
								<br />
								신청계획
							</_.TitleBox>
							<_.ContentBox width={20}>
								{recruitmentFormDetail?.military ? 'O' : 'X'}
							</_.ContentBox>
						</_.Stack>
						<_.Stack>
							<_.TitleBox>제출서류</_.TitleBox>
							<_.ContentBox width={90}>
								{recruitmentFormDetail?.submit_document}
							</_.ContentBox>
						</_.Stack>
						<_.Stack>
							<_.TitleBox height={200}>기타사항</_.TitleBox>
							<_.ContentBox
								height={200}
								width={90}
								longText={true}
							>
								{recruitmentFormDetail?.etc || '-'}
							</_.ContentBox>
						</_.Stack>
					</_.Stack>
				</_.Stack>
			</_.Stack>
		</_.Container>
	);
}
