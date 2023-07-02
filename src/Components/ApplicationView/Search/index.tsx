import { Button, DropDown, Input } from '@team-return/design-system';
import * as _ from './style';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from '../../../Hooks/useForm';
import { ApplicantInfoQueryStringType } from '../../../Apis/Applications/request';
import { getValueByKey } from '../../../Hooks/useGetPropertyKey';
import { applicationStatus } from '../../../Utils/Translation';
import { useDropDown } from '../../../Hooks/useDropDown';

interface PropsType {
	setSearchQueryString: Dispatch<
		SetStateAction<ApplicantInfoQueryStringType>
	>;
	refetchCompanyRecruitment: () => void;
}

export function ApplicationViewSearch({
	setSearchQueryString,
	refetchCompanyRecruitment,
}: PropsType) {
	const {
		form: data,
		setForm: setData,
		handleChange,
	} = useForm({
		student_name: '',
		company_id: '',
	});

	const { selectedItem, setSelectedItem, handleSelectedItem } = useDropDown({
		application_status: '',
	});

	const defaultData = () => {
		setData({
			student_name: '',
			company_id: '',
		});
		setSelectedItem({ application_status: '' });
	};

	const searching = () => {
		setSearchQueryString({
			...data,
			application_status: getValueByKey(
				applicationStatus,
				selectedItem.application_status
			),
		});
		setTimeout(refetchCompanyRecruitment);
	};

	return (
		<_.Container>
			<_.Wrapper>
				<_.TitleText>상태</_.TitleText>
				<_.ContentWrapper width={8.5}>
					<DropDown
						onChange={(type) =>
							handleSelectedItem('application_status', type)
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
						value={selectedItem.application_status}
					/>
				</_.ContentWrapper>
				<_.TitleText>이름</_.TitleText>
				<_.ContentWrapper>
					<Input
						width={96}
						name="student_name"
						value={data.student_name}
						onChange={handleChange}
						placeHolder="검색어 입력"
						iconName="Search"
					/>
				</_.ContentWrapper>
				<_.Btn>
					<Button onClick={searching}>조회</Button>
					<Button kind="Gray" onClick={defaultData}>
						초기화
					</Button>
				</_.Btn>
			</_.Wrapper>
		</_.Container>
	);
}
