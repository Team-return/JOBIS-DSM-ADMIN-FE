import { useState } from 'react';
import { Header } from '../../Components/Header';
import { CompanyTable } from '../../Components/StudentManagement/Table/CompanyTable';
import { StudentManagementSearch } from '../../Components/StudentManagement/Search';
import { useGetCombinedStudentList } from '../../Hooks/ApiHooks/Acceptances';
import { useForm } from '../../Hooks/useForm';
import * as _ from './style';
import { InternshipStudentTable } from '../../Components/StudentManagement/Table/InternshipStudentTable';
import { EmploymentContractStudentTable } from '../../Components/StudentManagement/Table/EmploymentContractStudentTable';
import { Button, Icon } from '@team-return/design-system';
import { ChangeEmploymentContractStudentStatus } from '../../Components/StudentManagement/ChangeStudentStatus/EmploymentContract';
import { ChangeInternshipStudentStatus } from '../../Components/StudentManagement/ChangeStudentStatus/Internship';
import { useModalContext } from '../../Utils/Modal';
import { ChangeEmploymentModal } from '../../Components/Modal/ChangeEmploymentModal';
import { useGetEmployableCompanies } from '../../Hooks/ApiHooks/Companies';

export function StudentManagementPage() {
	const date = new Date();
	const { openModal } = useModalContext();
	const [page, setPage] = useState({ page: 1 });

	const { form: searchQueryString, setForm: setSearchQueryString } = useForm({
		company_name: '',
		company_type: '',
		year: String(date.getFullYear()),
	});

	const [selectCompany, setSelectCompany] = useState(0);
	const [selectInternshipStudent, setSelectInternshipStudent] = useState<
		number[]
	>([]);
	const [
		selectEmploymentContractStudent,
		setSelectEmploymentContractStudent,
	] = useState<number[]>([]);

	const {
		data: employableCompanies,
		refetch: refetchEmployableCompanies,
		isLoading: employableCompaniesIsLoading,
	} = useGetEmployableCompanies(searchQueryString, page.page);
	const {
		data: combinedStudentList,
		refetch: refetchCombinedStudentList,
		isLoading: combinedStudentListIsLoading,
	} = useGetCombinedStudentList(selectCompany);

	/* 현장실습 모달을 여는 함수입니다. **/
	const openAddInternshipStudentModal = () => {
		openModal({
			children: (
				<ChangeEmploymentModal
					setSelectStudent={setSelectInternshipStudent}
					refetch={refetchCombinedStudentList}
					selectStudent={selectInternshipStudent}
				/>
			),
		});
	};

	return (
		<>
			<Header />
			<_.TableContainer>
				<StudentManagementSearch
					setSearchQueryString={setSearchQueryString}
					refetchEmployableCompanies={refetchEmployableCompanies}
				/>
				<_.TableWrapper>
					<_.CompanyTableWrapper>
						<CompanyTable
							page={page}
							setPage={setPage}
							employableCompanies={employableCompanies!}
							isLoading={employableCompaniesIsLoading}
							setSelectCompany={setSelectCompany}
							refetchCombinedStudentList={
								refetchCombinedStudentList
							}
							refetchEmployableCompanies={
								refetchEmployableCompanies
							}
						/>
					</_.CompanyTableWrapper>
					<_.StudentTableWrapper>
						<InternshipStudentTable
							combinedStudentList={combinedStudentList!}
							isLoading={combinedStudentListIsLoading}
							setSelectStudent={setSelectInternshipStudent}
							selectStudent={selectInternshipStudent}
						/>
						<Button
							size="S"
							margin={[3.3]}
							kind="Ghost"
							disabled={selectInternshipStudent.length === 0}
							onClick={openAddInternshipStudentModal}
						>
							<Icon
								icon="Chevron"
								direction="bottom"
								color={
									selectInternshipStudent.length === 0
										? 'gray50'
										: 'blue'
								}
							></Icon>
							근로계약 전환
						</Button>
						<EmploymentContractStudentTable
							combinedStudentList={combinedStudentList!}
							isLoading={combinedStudentListIsLoading}
							setSelectStudent={
								setSelectEmploymentContractStudent
							}
							selectStudent={selectEmploymentContractStudent}
						/>
					</_.StudentTableWrapper>
					<_.StudentManagementBoxWrapper>
						<ChangeInternshipStudentStatus
							selectStudent={selectInternshipStudent}
							selectCompany={selectCompany}
							setSelectStudent={setSelectInternshipStudent}
							refetch={refetchCombinedStudentList}
						/>
						<ChangeEmploymentContractStudentStatus
							selectStudent={selectEmploymentContractStudent}
							setSelectStudent={
								setSelectEmploymentContractStudent
							}
							refetch={refetchCombinedStudentList}
						/>
					</_.StudentManagementBoxWrapper>
				</_.TableWrapper>
			</_.TableContainer>
		</>
	);
}
