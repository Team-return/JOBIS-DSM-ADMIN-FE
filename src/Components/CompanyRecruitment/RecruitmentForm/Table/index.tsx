import { Button, CheckBox, Table } from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction, useState } from 'react';
import { Pagination } from '../../../../Utils/Pagination';
import { RecruitmentFormResponse } from '../../../../apis/Recruitments/response';
import { RecruitmentFormQueryStringType } from '../../../../apis/Recruitments/request';
import { useChangeRecruitmentsStatus } from '../../../../apis/Recruitments';

interface PropsType {
	recruitmentForm: RecruitmentFormResponse;
	refetchRecruitmentForm: () => void;
	AllSelectFormId: string[];
	searchRecruitmentFormQueryString: RecruitmentFormQueryStringType;
	setSearchRecruitmentFormQueryString: Dispatch<SetStateAction<RecruitmentFormQueryStringType>>;
}

export function RecruitmentFormTable({ recruitmentForm, refetchRecruitmentForm, AllSelectFormId, searchRecruitmentFormQueryString, setSearchRecruitmentFormQueryString }: PropsType) {
	const dataLength = recruitmentForm?.recruitments.length;
	const [clickedData, setClickedData] = useState<string[]>([]);
	const [changeStatus, setChangeStatus] = useState<string>('');

	let tableAllDatas: JSX.Element[][] | undefined = recruitmentForm?.recruitments.map((res, i) => {
		const job = res.recruitment_job.join(' / ');
		const type = () => {
			switch (res.company_type) {
				case 'LEAD':
					return '선도';
				case 'PARTICIPATING':
					return '참여';
				case 'CONTRACTING':
					return '협약';
				case 'DEFAULT':
					return '기본';
				default:
					return '기본';
			}
		};
		const status = () => {
			switch (res.recruitment_status) {
				case 'REQUESTED':
					return '접수요청';
				case 'READY':
					return '모집전';
				case 'RECRUITING':
					return '모집중';
				case 'DONE':
					return '모집종료';
				default:
					return '모집종료';
			}
		};

		const ClickCheckBox = () => {
			if (clickedData.includes(res.id)) {
				setClickedData(clickedData.filter((e) => e !== res.id));
			} else {
				setClickedData([...clickedData, res.id]);
			}
		};

		const openApplicationCountPage = (requested: boolean) => {
			if (requested) {
				window.open(`/RecruitmentRequestPopup?id=${res.id}`, '_blank', 'resizable=no,width=570,height=830,left=50,top=50');
			} else {
				window.open(`ApplicationPopup?id=${res.id}`, '_blank', 'resizable=no,width=570,height=830,left=50,top=50');
			}
		};

		return [
			<CheckBox checked={clickedData.includes(res.id)} onClick={ClickCheckBox} onChange={() => {}} />,
			<_.ContentText status={res.recruitment_status}>{status()}</_.ContentText>, // 상태
			<_.ContentText>{res.company_name}</_.ContentText>, // 회사 이름
			<_.ContentText>{job}</_.ContentText>, // 채용 직군
			<_.ContentText>{type()}</_.ContentText>, // 구분
			<_.ContentText>{res.recruitment_count}명</_.ContentText>, // 모집 인원 수
			<_.ContentText onClick={() => res.application_requested_count && openApplicationCountPage(true)} click={res.application_requested_count}>
				{res.application_requested_count}명
			</_.ContentText>, // 지원 요청 수
			<_.ContentText onClick={() => res.application_approved_count && openApplicationCountPage(false)} click={res.application_approved_count}>
				{res.application_approved_count}명
			</_.ContentText>, // 지원자 수
			<_.ContentText>{res.start}</_.ContentText>, // 모집 시작 날짜
			<_.ContentText>{res.end}</_.ContentText>, // 모집 종료 날짜
		];
	});

	for (let i = 0; i < 11 - (dataLength! % 11); i++) {
		tableAllDatas?.push([<></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>, <></>]);
	}

	const CheckAllBox = () => {
		if (clickedData.length === dataLength) {
			setClickedData([]);
		} else {
			setClickedData(AllSelectFormId);
		}
	};

	const ChangeStatusAPI = useChangeRecruitmentsStatus(changeStatus, clickedData, {
		onSuccess: () => {
			refetchRecruitmentForm();
			setClickedData([]);
			alert('썽공');
		},
	});

	const { isLoading } = ChangeStatusAPI;

	const ChangeStatusBtnClick = (statusName: string) => {
		setChangeStatus(statusName);
		setTimeout(() => ChangeStatusAPI.mutate());
	};

	return (
		<_.Container>
			<_.BtnWrapper>
				<Button
					kind="Ghost"
					size="S"
					disabled={isLoading || clickedData.length === 0}
					onClick={() => {
						ChangeStatusBtnClick('READY');
					}}
				>
					접수
				</Button>
				<Button
					kind="Ghost"
					size="S"
					disabled={isLoading || clickedData.length === 0}
					onClick={() => {
						ChangeStatusBtnClick('RECRUITING');
					}}
				>
					모집중
				</Button>
				<Button
					kind="Ghost"
					size="S"
					disabled={isLoading || clickedData.length === 0}
					onClick={() => {
						ChangeStatusBtnClick('DONE');
					}}
				>
					모집종료
				</Button>
			</_.BtnWrapper>
			<_.TableWrapper>
				<Table
					tableData={tableAllDatas}
					title={[
						<CheckBox disabled={!(recruitmentForm?.recruitments.length !== 0)} checked={clickedData.length !== 0 && clickedData.length === dataLength} onChange={CheckAllBox} />,
						<_.TitleText>상태</_.TitleText>,
						<_.TitleText>기업명</_.TitleText>,
						<_.TitleText>채용직군</_.TitleText>,
						<_.TitleText>구분</_.TitleText>,
						<_.TitleText>모집인원</_.TitleText>,
						<_.TitleText>지원요청</_.TitleText>,
						<_.TitleText>지원자</_.TitleText>,
						<_.TitleText>모집시작일</_.TitleText>,
						<_.TitleText>모집종료일</_.TitleText>,
					]}
					width={[3, 7, 18, 30, 6, 6, 6, 6, 10, 10]}
				/>
			</_.TableWrapper>
			<Pagination total={100} limit={10} data={searchRecruitmentFormQueryString} setData={setSearchRecruitmentFormQueryString} refetchRecruitmentForm={refetchRecruitmentForm} />
		</_.Container>
	);
}
