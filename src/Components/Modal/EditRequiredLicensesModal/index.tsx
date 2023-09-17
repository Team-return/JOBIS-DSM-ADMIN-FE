import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import * as _ from './style';
import { useGetRequiredLicensesList } from '../../../Hooks/ApiHooks/RequiredLicensesList';
import { editRecruitmentRequest } from '../../../Apis/Recruitments/request';
import { useModalContext } from '../../../Utils/Modal';

interface PropsType {
	requiredLicensesArray: string[];
	setRecruitmentFormDetailInfo: Dispatch<
		SetStateAction<editRecruitmentRequest>
	>;
}

export function EditRequiredLicensesModal({
	requiredLicensesArray,
	setRecruitmentFormDetailInfo,
}: PropsType) {
	const { closeModal } = useModalContext();
	const [search, setSearch] = useState('');
	const { data: requiredLicenses } = useGetRequiredLicensesList(1, 1972);
	const requiredLicensesNames = requiredLicenses?.data.map(
		(requiredLicense) => requiredLicense.종목명
	);
	const requiredLicensesFilteringData = requiredLicensesNames?.filter(
		(requiredLicense, i) =>
			requiredLicensesNames?.indexOf(requiredLicense) === i
	);

	const CheckArray = (requiredLicenseName: string) => {
		!requiredLicensesArray.includes(requiredLicenseName)
			? setRecruitmentFormDetailInfo((recruitmentFormDetailInfo) => ({
					...recruitmentFormDetailInfo,
					required_licenses: [
						...requiredLicensesArray,
						requiredLicenseName,
					],
			  }))
			: setRecruitmentFormDetailInfo((recruitmentFormDetailInfo) => ({
					...recruitmentFormDetailInfo,
					required_licenses: requiredLicensesArray.filter(
						(requiredLicense) =>
							requiredLicense !== requiredLicenseName
					),
			  }));
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<_.Container>
			<_.TitleWrapper>
				<div>
					<_.Title>사용기술 선택</_.Title>
					<_.ContentsText>
						해당 직무에 필요한 기술을 선택하세요.
					</_.ContentsText>
				</div>
				<div>
					<_.SearchInput
						type="text"
						value={search}
						onChange={onChange}
					/>
					<_.SearchIcon icon="Search"></_.SearchIcon>
				</div>
			</_.TitleWrapper>
			<_.SmallCardWrapper>
				{requiredLicensesArray.map((res, i) => {
					return (
						<>
							<_.SmallCard key={i}>
								{res}
								<_.XCardText onClick={() => CheckArray(res)}>
									x
								</_.XCardText>
							</_.SmallCard>
						</>
					);
				})}
			</_.SmallCardWrapper>
			<_.BigCardWrapper>
				{requiredLicensesFilteringData
					?.filter((datas) => {
						return datas.includes(search);
					})
					.map((res, i) => {
						return (
							<>
								<_.BigCard
									key={i}
									colorBool={requiredLicensesArray.includes(
										res
									)}
									onClick={() => {
										CheckArray(res);
									}}
								>
									{res}
								</_.BigCard>
							</>
						);
					})}
			</_.BigCardWrapper>
			<_.Btn onClick={closeModal}>완료</_.Btn>
		</_.Container>
	);
}
