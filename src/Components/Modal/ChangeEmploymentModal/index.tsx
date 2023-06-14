import { Dispatch, SetStateAction, useState } from 'react';
import { Button, CheckBox, Input, Table } from '@team-return/design-system';
import * as _ from '../style';
import { useForm } from '../../../Hooks/useForm';
import { Pagination } from '../../../Utils/Pagination';
import { useChangeEmployment } from '../../../Apis/Acceptances';
import { useGetCode } from '../../../Hooks/ApiHooks/Codes';

interface PropType {
	selectStudent: number[];
	setSelectStudent: Dispatch<SetStateAction<number[]>>;
	refetch: () => void;
}

export function ChangeEmploymentModal({
	selectStudent,
	setSelectStudent,
	refetch,
}: PropType) {
	const [pages, setPages] = useState({ page: 1 });
	const [selectCodeKeywords, setSelectCodeKeywords] = useState<string[]>([]);
	const offset = (pages.page - 1) * 8;
	const { form: searchInput, handleChange } = useForm({
		searchInputValue: '',
	});
	const {
		data: keywordList,
		isLoading,
		refetch: refetchKeywordList,
	} = useGetCode('TECH');
	const filteredList = keywordList?.codes.filter((keywords) =>
		keywords.keyword.includes(searchInput.searchInputValue)
	);
	const dataLength = (filteredList?.length || 0) / 2;

	const changeEmploymentAPI = useChangeEmployment(
		selectCodeKeywords,
		selectStudent,
		{
			onSuccess: () => {
				refetch();
				setSelectStudent([]);
				setSelectCodeKeywords([]);
				alert('성공적으로 변경되었습니다.');
			},
			onError: () => {
				alert("변경에 실패했습니다.")
			},
		}
	);

	const loadingTableDataArray = Array.from({ length: 4 }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
	]);
	const emptyTableDataArray = Array.from({ length: 4 - dataLength }, () => [
		<></>,
		<></>,
		<></>,
		<></>,
	]);

	const tableAllData = filteredList
		?.slice(offset, offset + 8)
		.flatMap((keywords, index) => {
			const clickCheckBox = (keywordName: string) => {
				if (selectCodeKeywords.includes(keywordName)) {
					setSelectCodeKeywords((keywords) =>
						keywords.filter((keyword) => keyword !== keywordName)
					);
				} else {
					setSelectCodeKeywords((keywords) => [
						...keywords,
						keywordName,
					]);
				}
			};

			if (index % 2 === 0) {
				if (index < filteredList.length - 1) {
					const nextValue = filteredList[index + 1];
					return [
						[
							<CheckBox
								onChange={() => clickCheckBox(keywords.keyword)}
								checked={selectCodeKeywords.includes(
									keywords.keyword
								)}
							/>,
							<_.ContentText>{keywords.keyword}</_.ContentText>,
							<CheckBox
								onChange={() =>
									clickCheckBox(nextValue.keyword)
								}
								checked={selectCodeKeywords.includes(
									nextValue.keyword
								)}
							/>,
							<_.ContentText>{nextValue.keyword}</_.ContentText>,
						],
					];
				} else {
					return [
						[
							<CheckBox
								onChange={() => clickCheckBox(keywords.keyword)}
								checked={selectCodeKeywords.includes(
									keywords.keyword
								)}
							/>,
							<_.ContentText>{keywords.keyword}</_.ContentText>,
							<></>,
							<></>,
						],
					];
				}
			}
			return [];
		})
		.concat(emptyTableDataArray);

	const tableTitle: JSX.Element[] = [
		<CheckBox disabled={true} />,
		<_.TitleText>이름</_.TitleText>,
		<CheckBox disabled={true} />,
		<_.TitleText>이름</_.TitleText>,
	];
	const tableWidth: number[] = [10, 40, 10, 40];

	return (
		<_.Container>
			<_.SearchWrapper>
				<_.InputWrapper>
					<_.CompanyText>학생 추가</_.CompanyText>
					<Input
						margin={[0, 0, 0, 20]}
						iconName="Search"
						width={65}
						placeHolder="학생 검색"
						name="searchInputValue"
						value={searchInput.searchInputValue}
						onChange={handleChange}
					/>
				</_.InputWrapper>
				<Button
					onClick={() => {
						changeEmploymentAPI.mutate();
						setTimeout(refetchKeywordList);
					}}
				>
					추가
				</Button>
			</_.SearchWrapper>
			<_.TableWrapper>
				<Table
					tableData={isLoading ? loadingTableDataArray : tableAllData}
					title={tableTitle}
					width={tableWidth}
				/>
			</_.TableWrapper>
			<Pagination
				page={Math.max(Math.floor((filteredList?.length || 0) / 8), 1)}
				data={pages}
				setData={setPages}
				refetch={() => {}}
			/>
		</_.Container>
	);
}
