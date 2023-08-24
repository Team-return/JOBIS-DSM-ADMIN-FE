import { useMutation } from 'react-query';
import fileSaver from 'file-saver';
import { DownloadDataPropsType } from './request';
import axios from 'axios';
import { useToastStore } from '@team-return/design-system';

/** S3에서 파일 가져와서 다운로드 */
export const useDownloadData = (propsData: DownloadDataPropsType) => {
	const { append } = useToastStore();
	return useMutation(
		() => axios.get(propsData.fileUrl, { responseType: 'blob' }),
		{
			onSuccess: (res) => {
				const data = new Blob([res.data], {
					type: res.headers['content-type'],
				});
				fileSaver.saveAs(data, propsData.fileName);
				append({
					title: '성공적으로 다운로드 되었습니다.',
					message: '',
					type: 'GREEN',
				});
			},
			onError: () => {
				append({
					title: '다운로드에 실패했습니다.',
					message: '',
					type: 'RED',
				});
			},
		}
	);
};
