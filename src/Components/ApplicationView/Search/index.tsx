import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { getValueByKey } from '../../../Utils/useGetPropertyKey';
import { applicationStatus } from '../../../Utils/Translation';
import { useApplicationViewQueryString } from '../../../Store/State';

interface PropsType {
	refetchCompanyRecruitment: () => void;
}

export function ApplicationViewSearch({
	refetchCompanyRecruitment,
}: PropsType) {
	const {
		applicationViewQueryString,
		setDefaultApplicationViewQueryString,
		applicationViewQueryStringDropDown,
		applicationViewQueryStringHandler,
	} = useApplicationViewQueryString();

	return (
		<_.Container>
			<_.Wrapper>
				<_.TitleText>상태</_.TitleText>
				<_.ContentWrapper width={8.5}>
					<DropDown
						onChange={(type) =>
							applicationViewQueryStringDropDown(
								'application_status',
								getValueByKey(applicationStatus, type)
							)
						}
						width={95}
						option={[
							'전체',
							'승인요청',
							'승인',
							'합격',
							'불합격',
							'반려',
						]}
						value={
							applicationStatus[
								applicationViewQueryString.application_status
							]
						}
					/>
				</_.ContentWrapper>
				<_.TitleText>이름</_.TitleText>
				<_.ContentWrapper>
					<Input
						width={96}
						name="student_name"
						value={applicationViewQueryString.student_name}
						onChange={applicationViewQueryStringHandler}
						placeholder="검색어 입력"
						iconName="Search"
					/>
				</_.ContentWrapper>
				<_.Btn>
					<Button onClick={refetchCompanyRecruitment}>조회</Button>
					<Button
						kind="Gray"
						onClick={setDefaultApplicationViewQueryString}
					>
						초기화
					</Button>
				</_.Btn>
			</_.Wrapper>
		</_.Container>
	);
}
