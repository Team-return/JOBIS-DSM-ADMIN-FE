import { useMutation } from 'react-query';
import fileSaver from 'file-saver';
import { DownloadDataPropsType } from './request';
import axios from 'axios';

export const useDownloadData = (propsData: DownloadDataPropsType) =>
	useMutation(() => axios.get(propsData.fileUrl, { responseType: 'blob' }), {
		onSuccess: (res) => {
			const data = new Blob([res.data], { type: res.headers['content-type'] });
			fileSaver.saveAs(data, propsData.fileName);
		},
	});
