import { instance } from '../axios';
import { MutationOptions, useMutation } from 'react-query';
import { Dispatch, SetStateAction } from 'react';

const router = '/files';

/** 선생님 모집의뢰 상태 변경 */
export const useFileUpload = <T>(
	file: File,
	setCompanyDetailEditInfo: Dispatch<SetStateAction<T>>,
	options: MutationOptions
) => {
	const formData = new FormData();
	formData.append('file', file);
	return useMutation(
		async () => instance.post(`${router}?type=LOGO_IMAGE`, formData),
		{
			...options,
		}
	);
};
