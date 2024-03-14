import { MutationOptions, useMutation } from 'react-query';
import fileSaver from 'file-saver';
import { DownloadDataPropsType } from './request';
import axios from 'axios';
import { useToastStore } from '@team-return/design-system';
import { instance } from '../axios';

const router = '/files';

/** S3에서 파일 가져와서 다운로드 */
export const useDownloadData = (propsData: DownloadDataPropsType) => {
	const { append } = useToastStore();
	return useMutation(
		() =>
			axios.get(
				`${process.env.REACT_APP_FILE_URL}${encodeURI(
					propsData.fileUrl
				)}`,
				{
					responseType: 'blob',
				}
			),
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

/** 선생님 모집의뢰 상태 변경 */
export const useFileUpload = (file: File, options: MutationOptions) => {
	const formData = new FormData();
	formData.append('file', file);
	return useMutation(
		async () => instance.post(`${router}?type=LOGO_IMAGE`, formData),
		{
			...options,
		}
	);
};


/** 선생님 모집의뢰 상태 변경 */
export const useUpload = (files: File[], options: MutationOptions) => {
	const formData = new FormData();
	files.forEach((file) => {
		formData.append('file', file);
	})
	return useMutation(
		async () => instance.post(`${router}?type=EXTENSION_FILE`, formData),
		{
			...options,
		}
	);
};