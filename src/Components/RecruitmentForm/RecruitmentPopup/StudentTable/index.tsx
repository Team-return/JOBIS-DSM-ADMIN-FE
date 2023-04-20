import { RadioButton, Table } from '@team-return/design-system';
import * as _ from './style';
import { ApplicationResponse } from '../../../../apis/Applications/response';

interface PropsType {
	application: ApplicationResponse;
	refetchApplication: () => void;
}

export function StudentTable({ application, refetchApplication }: PropsType) {
	// let tableAllDatas: JSX.Element[][] | undefined = application?.application.map((res, i) => {
	// 	const ClickCheckBox = () => {
	// 		if (clickedData.includes(res.id)) {
	// 			setClickedData(clickedData.filter((e) => e !== res.id));
	// 		} else {
	// 			setClickedData([...clickedData, res.id]);
	// 		}
	// 	};

	// 	return [
	// 		<RadioButton checked={clickedData.includes(res.id)} onClick={ClickCheckBox} onChange={() => {}} />,
	// 		<_.ContentText status={res.recruitment_status}>{status()}</_.ContentText>, // 상태
	// 		<_.ContentText>{res.company_name}</_.ContentText>, // 회사 이름
	// 		<_.ContentText>{job}</_.ContentText>, // 채용 직군
	// 		<_.ContentText>{type()}</_.ContentText>, // 구분
	// 		<_.ContentText>{res.recruitment_count}명</_.ContentText>, // 모집 인원 수
	// 		<_.ContentText onClick={() => res.application_requested_count && openApplicationCountPage(true)} click={res.application_requested_count}>
	// 			{res.application_requested_count}명
	// 		</_.ContentText>, // 지원 요청 수
	// 		<_.ContentText onClick={() => res.application_approved_count && openApplicationCountPage(false)} click={res.application_approved_count}>
	// 			{res.application_approved_count}명
	// 		</_.ContentText>, // 지원자 수
	// 		<_.ContentText>{res.start}</_.ContentText>, // 모집 시작 날짜
	// 		<_.ContentText>{res.end}</_.ContentText>, // 모집 종료 날짜
	// 	];
	// });

	// for (let i = 0; i < 11 - (dataLength! % 11); i++) {
	// 	tableAllDatas?.push([<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>]);
	// }

	return (
		<_.Container>
			<_.Wrapper>
				<Table
					// disabled={!(recruitmentForm?.recruitments.length !== 0)} checked={clickedData.length !== 0 && clickedData.length === dataLength} onChange={CheckAllBox}
					tableData={[[<RadioButton />, <_.ContentText>asdfasdf</_.ContentText>, <_.ContentText>asdfasdf</_.ContentText>, <_.ContentText>asdfasdf</_.ContentText>]]}
					title={[<RadioButton disabled={true} />, <_.TitleText>학번</_.TitleText>, <_.TitleText>이름</_.TitleText>, <_.TitleText>지원날짜</_.TitleText>]}
					width={[10, 24, 33, 33]}
				/>
			</_.Wrapper>
		</_.Container>
	);
}
