import { Button, Icon, Table } from '@team-return/design-system';
import * as _ from './style';
import { useDownloadData } from '../../../../Apis/File';
import { useState } from 'react';
import { DownloadDataPropsType } from '../../../../Apis/File/request';
import { AttachmentUrlType } from '../../../../Apis/Applications/response';

interface PropsType {
	applicationAttachmentUrl: AttachmentUrlType[];
}

export function DownloadTable({ applicationAttachmentUrl }: PropsType) {
	const [downloadUrl, setDownloadUrl] = useState<DownloadDataPropsType>({
		fileUrl: '',
		fileName: '',
	});

	const { mutate: downloadStudentForm } = useDownloadData(downloadUrl);

	/** 파일 다운로드 api를 호출합니다. */
	const fileDownloadAPI = (url: string, name: string) => {
		setDownloadUrl({
			fileUrl: url,
			fileName: name,
		});
		setTimeout(downloadStudentForm);
	};

	/** 데이터 테이블 아래 보여줄 빈 테이블입니다. */
	const emptyTableDataArray = Array.from(
		{ length: 5 - (applicationAttachmentUrl?.length || 0) },
		() => [<></>]
	);

	/** FILE 데이터 테이블입니다. */
	const tableFileDatas: JSX.Element[][] = applicationAttachmentUrl
		?.filter((urls) => urls.type === 'FILE')
		.map((urls) => {
			const nameArray = decodeURI(urls.url).split('/');
			return [
				<_.TextWrapper>
					<_.ContentText style={{ marginTop: 3, marginLeft: 5 }}>
						{nameArray[nameArray.length - 1].substring(37)}
					</_.ContentText>
					<Button
						size="S"
						onClick={() =>
							fileDownloadAPI(
								urls.url,
								nameArray[nameArray.length - 1]
							)
						}
					>
						<Icon
							icon="FileEarmarkArrowDown"
							size={16}
							color="gray10"
						/>
						다운
					</Button>
				</_.TextWrapper>,
			];
		});

	/** URL 데이터 테이블입니다. */
	const tableUrlDatas: JSX.Element[][] = applicationAttachmentUrl
		?.filter((urls) => urls.type === 'URL')
		.map((urls) => {
			return [
				<_.TextWrapper>
					<_.ContentText style={{ marginTop: 3, marginLeft: 5 }}>
						{urls.url}
					</_.ContentText>
					<Button
						size="S"
						onClick={() =>
							window.open(
								urls.url,
								'_blank',
								'noopener, noreferrer'
							)
						}
					>
						링크 이동
					</Button>
				</_.TextWrapper>,
			];
		});

	/** 전체 데이터 테이블입니다. */
	const tableAllDatas: JSX.Element[][] = tableUrlDatas.concat(
		tableFileDatas,
		emptyTableDataArray
	);

	/** 테이블의 title입니다. */
	const tableTitle: JSX.Element[] = [<_.TitleText>첨부파일</_.TitleText>];

	/** 테이블의 width입니다. */
	const tableWidth: number[] = [100];

	return (
		<_.Container>
			<_.TitleWrapper>
				<_.TitleText>첨부파일</_.TitleText>
			</_.TitleWrapper>
			<_.TableWrapper>
				<Table
					tableData={tableAllDatas}
					title={tableTitle}
					width={tableWidth}
				/>
			</_.TableWrapper>
		</_.Container>
	);
}
