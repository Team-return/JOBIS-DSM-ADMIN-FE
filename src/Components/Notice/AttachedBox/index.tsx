import { Icon, useToastStore } from '@team-return/design-system';
import { AttachmentResponse } from '../../../Apis/Notices/response';
import * as _ from './style';
import axios from 'axios';

interface PropsType {
	props: AttachmentResponse[];
}

export function AttachedBox({ props }: PropsType) {
	const file_name_regex = (url: string) => {
		return url.replace(/(?:.*?-){5}(.*)/, '$1').replaceAll('+', ' ');
	};
	const { append } = useToastStore();

	const downLoadFile = async (attachment: AttachmentResponse) => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_FILE_URL}${attachment.url}`,
				{
					responseType: 'blob',
				}
			);
			const url = window.URL.createObjectURL(new Blob([data]));
			const a = document.createElement('a');
			a.href = url;
			a.download = file_name_regex(attachment.url);
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch {
			append({
				title: '파일 다운로드에 실패했습니다.',
				message: '',
				type: 'RED',
			});
		}
	};

	return (
		<>
			<_.AttachedWrapper>
				<_.AttachmentTitle>첨부자료</_.AttachmentTitle>
				<_.Attachments>
					{props.map((attachment, index) => (
						<_.Attachment key={index}>
							<div>{file_name_regex(attachment.url)}</div>
							<Icon
								icon="Download"
								size={15}
								color="liteBlue"
								cursor="pointer"
								onClick={() => downLoadFile(attachment)}
							/>
						</_.Attachment>
					))}
				</_.Attachments>
			</_.AttachedWrapper>
		</>
	);
}
