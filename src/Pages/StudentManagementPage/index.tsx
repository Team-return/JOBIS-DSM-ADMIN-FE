import { useState } from 'react';
import { Header } from '../../Components/Header';
import { CompanyTable } from '../../Components/StudentManagement/Table/CompanyTable';
import { StudentManagementSearch } from '../../Components/StudentManagement/Search';
import { useGetCombinedStudentList } from '../../Hooks/ApiHooks/useGetCombinedStudentList';
import { useGetEmployableCompanies } from '../../Hooks/ApiHooks/useGetEmployableCompanies';
import { useForm } from '../../Hooks/useForm';
import * as _ from './style';
import { InternshipStudentTable } from '../../Components/StudentManagement/Table/InternshipStudentTable';
import { EmploymentContractStudentTable } from '../../Components/StudentManagement/Table/EmploymentContractStudentTable';
import { Button } from '@team-return/design-system';
import ChevronDown from '../../Assets/SVG/ChevronDown.svg';
import { ChangeEmploymentContractStudentStatus } from '../../Components/StudentManagement/ChangeStudentStatus/EmploymentContract';
import { ChangeInternshipStudentStatus } from '../../Components/StudentManagement/ChangeStudentStatus/Internship';
import { useModalContext } from '../../Utils/Modal';
import { ChangeEmploymentModal } from '../../Components/Modal/ChangeEmploymentModal';

export function StudentManagementPage() {
	const date = new Date();
	const { openModal } = useModalContext();

	const { form: searchQueryString, setForm: setSearchQueryString } = useForm({
		company_name: '',
		company_type: '',
		year: String(date.getFullYear()),
	});

	const [selectCompany, setSelectCompany] = useState(0);
	const [selectInternshipStudent, setSelectInternshipStudent] = useState<number[]>([]);
	const [selectEmploymentContractStudent, setSelectEmploymentContractStudent] = useState<number[]>([]);

	const { data: employableCompanies, refetch: refetchEmployableCompanies, isLoading: employableCompaniesIsLoading } = useGetEmployableCompanies(searchQueryString);
	const { data: combinedStudentList, refetch: refetchCombinedStudentList, isLoading: combinedStudentListIsLoading } = useGetCombinedStudentList(selectCompany);

	const openAddInternshipStudentModal = () => {
		openModal({
			children: <ChangeEmploymentModal setSelectStudent={setSelectInternshipStudent} refetch={refetchCombinedStudentList} selectStudent={selectInternshipStudent} />,
		});
	};

	return (
		<>
			<Header />
			<_.TableContainer>
				<StudentManagementSearch setSearchQueryString={setSearchQueryString} refetchEmployableCompanies={refetchEmployableCompanies} />
				<_.TableWrapper>
					<_.CompanyTableWrapper>
						<CompanyTable
							employableCompanies={employableCompanies!}
							isLoading={employableCompaniesIsLoading}
							setSelectCompany={setSelectCompany}
							refetchCombinedStudentList={refetchCombinedStudentList}
						/>
					</_.CompanyTableWrapper>
					<_.StudentTableWrapper>
						<InternshipStudentTable
							combinedStudentList={combinedStudentList!}
							isLoading={combinedStudentListIsLoading}
							setSelectStudent={setSelectInternshipStudent}
							selectStudent={selectInternshipStudent}
						/>
						<Button size="S" margin={[3.3]} kind="Ghost" disabled={selectInternshipStudent.length === 0} onClick={openAddInternshipStudentModal}>
							<img src={ChevronDown} alt="화살표 사진" />
							근로계약 전환
						</Button>
						<EmploymentContractStudentTable
							combinedStudentList={combinedStudentList!}
							isLoading={combinedStudentListIsLoading}
							setSelectStudent={setSelectEmploymentContractStudent}
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
							setSelectStudent={setSelectEmploymentContractStudent}
							refetch={refetchCombinedStudentList}
						/>
					</_.StudentManagementBoxWrapper>
				</_.TableWrapper>
			</_.TableContainer>
		</>
	);
}
