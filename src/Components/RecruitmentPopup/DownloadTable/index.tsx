import { Button, Table } from '@team-return/design-system';
import FileDown from '../../../Assets/SVG/FileDown.svg';
import * as _ from './style';
import { useDownloadData } from '../../../apis/FileDownload';
import { useState } from 'react';
import { DownloadDataPropsType } from '../../../apis/FileDownload/request';

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

	let tableAllDatas: JSX.Element[][] | undefined = applicationAttachmentUrl?.map((res, i) => {
		const nameArray = decodeURI(res).split('/');
		return [
			<_.ContentText>{i + 1}</_.ContentText>, // 상태
			<_.TextWrapper>
				<_.ContentText style={{ marginTop: 3, marginLeft: 5 }}>{nameArray[nameArray.length - 1]}</_.ContentText>
				<Button size="S" onClick={() => fileDownloadAPI(res, nameArray[nameArray.length - 1])}>
					<img width={16} src={FileDown} alt="파일 다운로드" />
					다운
				</Button>
			</_.TextWrapper>, // 채용 직군
		];
	});

	for (let i = 0; i < 5 - applicationAttachmentUrl?.length; i++) {
		tableAllDatas?.push([<></>, <></>]);
	}

	return (
		<_.Container>
			<_.TitleWrapper>
				<_.TitleText>첨부파일</_.TitleText>
			</_.TitleWrapper>
			<_.TableWrapper>
				<Table tableData={tableAllDatas} title={[<_.TitleText>순번</_.TitleText>, <_.TitleText>첨부파일</_.TitleText>]} width={[10, 90]} />
			</_.TableWrapper>
		</_.Container>
	);
}
