import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { useStudentManagementQueryString } from '../../../Store/State';

interface PropsType {
	refetchEmployableCompanies: () => void;
}

export function StudentManagementSearch({
	refetchEmployableCompanies,
}: PropsType) {
	const date = new Date(); // 현재 날짜 및 시간
	const iYear = date.getFullYear(); // 연도

	const {
		studentManagementQueryString,
		studentManagementQueryStringDropDown,
		studentManagementQueryStringHandler,
		setDefaultStudentManagementQueryString,
		setStudentManagementPage,
	} = useStudentManagementQueryString();

	/** 년도를 순서대로 배열로 만들어 저장합니다. */
	const yearData = Array.from({ length: 11 }, (_, i) =>
		(iYear - i).toString()
	);

	const search = () => {
		setStudentManagementPage();
		setTimeout(refetchEmployableCompanies);
	};

	return (
		<_.Container>
			<_.Wrapper>
				<_.TitleText>학년도</_.TitleText>
				<_.ContentWrapper width={13}>
					<DropDown
						width={90}
						option={yearData}
						value={studentManagementQueryString.year}
						onChange={(yearData) =>
							studentManagementQueryStringDropDown(
								'year',
								yearData
							)
						}
					/>
				</_.ContentWrapper>
				<_.TitleText>구분</_.TitleText>
				<_.ContentWrapper width={20}>
					<DropDown
						width={94}
						option={['전체', '선도기업', '참여기업']}
						value={studentManagementQueryString.company_type}
						onChange={(type) =>
							studentManagementQueryStringDropDown(
								'company_type',
								type
							)
						}
					/>
				</_.ContentWrapper>
				<_.TitleText>기업명</_.TitleText>
				<_.ContentWrapper width={34.5}>
					<Input
						width={96}
						name="company_name"
						iconName="Search"
						value={studentManagementQueryString.company_name}
						onChange={studentManagementQueryStringHandler}
						placeholder="기업명 입력"
					/>
				</_.ContentWrapper>
			</_.Wrapper>
			<_.ButtonWrapper>
				<Button onClick={search}>조회</Button>
				<Button
					kind="Gray"
					onClick={setDefaultStudentManagementQueryString}
					margin={[0, 10, 0, 0]}
				>
					초기화
				</Button>
			</_.ButtonWrapper>
		</_.Container>
	);
}
