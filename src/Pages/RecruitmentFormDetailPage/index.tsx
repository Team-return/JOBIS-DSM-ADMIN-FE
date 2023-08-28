import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecruitmentFormDetailBasic } from '../../Components/Detail/RecruitmentFormDetail/Basic';
import { RecruitmentFormDetailEdit } from '../../Components/Detail/RecruitmentFormDetail/Edit';
import { Header } from '../../Components/Header';
import { useGetRecruitmentFormDetail } from '../../Hooks/ApiHooks/Recruitments';
import * as _ from './style';

export function RecruitmentFormDetailPage() {
	const params = useParams();
	const {
		data: recruitmentFormDetailInfo,
		refetch: refetchRecruitmentFormDetailInfo,
	} = useGetRecruitmentFormDetail(params.id!);
	const [canEdit, setCanEdit] = useState(false);

	return (
		<>
			<Header />
			<_.Wrapper>
				{canEdit ? (
					<RecruitmentFormDetailEdit
					recruitmentFormDetail={recruitmentFormDetailInfo!}
					setCanEdit={setCanEdit}
				/>
				) : (
					<RecruitmentFormDetailBasic
					recruitmentFormDetail={recruitmentFormDetailInfo!}
					setCanEdit={setCanEdit}
				/>
				)}
			</_.Wrapper>
		</>
	);
}
