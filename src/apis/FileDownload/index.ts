import { useMutation } from 'react-query';
import { instance } from '../axios';
import fileSaver from 'file-saver';
import { DownloadDataPropsType } from './request';

export const useDownloadData = (propsData : DownloadDataPropsType) =>
	useMutation(() => instance.get(propsData.fileUrl, { responseType: 'blob' }), {
		onSuccess: (res) => {
			const data = new Blob([res.data], { type: res.headers['content-type'] });
			fileSaver.saveAs(data, propsData.fileName);
		},
	});
