import { Button, Table } from '@team-return/design-system';
import FileDown from '../../../../Assets/SVG/FileDown.svg';
import * as _ from './style';
import { useDownloadData } from '../../../../Apis/FileDownload';
import { useState } from 'react';
import { DownloadDataPropsType } from '../../../../Apis/FileDownload/request';

interface PropsType {
	applicationAttachmentUrl: string[];
}

export function DownloadTable({ applicationAttachmentUrl }: PropsType) {
	const [downloadUrl, setDownloadUrl] = useState<DownloadDataPropsType>({
		fileUrl: '',
		fileName: '',
	});

	const { mutate: downloadStudentForm } = useDownloadData(downloadUrl);

	const fileDownloadAPI = (url: string, name: string) => {
		setDownloadUrl({
			fileUrl: url,
			fileName: name,
		});
		setTimeout(downloadStudentForm);
	};

	const emptyTableDataArray = Array.from({ length: 5 - (applicationAttachmentUrl?.length || 0) }, () => [<></>, <></>]);
	const tableAllDatas: JSX.Element[][] = applicationAttachmentUrl
		?.map((url, i) => {
			const nameArray = decodeURI(url).split('/');
			return [
				<_.ContentText>{i + 1}</_.ContentText>,
				<_.TextWrapper>
					<_.ContentText style={{ marginTop: 3, marginLeft: 5 }}>{nameArray[nameArray.length - 1]}</_.ContentText>
					<Button size="S" onClick={() => fileDownloadAPI(url, nameArray[nameArray.length - 1])}>
						<img width={16} src={FileDown} alt="파일 다운로드" />
						다운
					</Button>
				</_.TextWrapper>,
			];
		})
		.concat(emptyTableDataArray);

	const tableTitle: JSX.Element[] = [<_.TitleText>순번</_.TitleText>, <_.TitleText>첨부파일</_.TitleText>];
	const tableWidth: number[] = [10, 90];

	return (
		<_.Container>
			<_.TitleWrapper>
				<_.TitleText>첨부파일</_.TitleText>
			</_.TitleWrapper>
			<_.TableWrapper>
				<Table tableData={tableAllDatas} title={tableTitle} width={tableWidth} />
			</_.TableWrapper>
		</_.Container>
	);
}
