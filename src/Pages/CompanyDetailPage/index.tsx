import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CompanyDetailBasic } from '../../Components/Detail/CompanyDetail/Basic';
import { CompanyDetailEdit } from '../../Components/Detail/CompanyDetail/Edit';
import { Header } from '../../Components/Header';
import { useGetCompanyDetail } from '../../Hooks/ApiHooks/Companies';
import * as _ from './style';

export function CompanyDetailPage() {
	const params = useParams();
	const { data: companyDetailInfo, refetch: refetchCompanyDetailInfo } =
		useGetCompanyDetail(params.id!);
	const [canEdit, setCanEdit] = useState(false);
	return (
		<>
			<Header />
			<_.Wrapper>
				{canEdit ? (
					<CompanyDetailEdit
						companyDetailInfo={companyDetailInfo!}
						setCanEdit={setCanEdit}
						refetchCompanyDetailInfo={refetchCompanyDetailInfo}
					/>
				) : (
					<CompanyDetailBasic
						companyDetailInfo={companyDetailInfo!}
						setCanEdit={setCanEdit}
					/>
				)}
			</_.Wrapper>
		</>
	);
}
