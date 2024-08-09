import { useMutation } from 'react-query';
import { PresignedUrlResponse } from './response';
import { instance } from '../axios';
import axios from 'axios';

const EXTENSION_FILE = 'EXTENSION_FILE';

export const usePresignedUrl = () => {
	return useMutation(
		async (files: File[]) => {
			const body = files.map((item) => ({
				type: EXTENSION_FILE,
				file_name: item.name,
			}));

			const { data: presignedUrls } =
				await instance.post<PresignedUrlResponse>(`/files/pre-signed`, {
					files: body,
				});
			return { presignedUrls, files };
		},
		{
			onSuccess: async ({
				presignedUrls,
				files,
			}: {
				presignedUrls: PresignedUrlResponse;
				files: File[];
			}) => {
				const uploadPromises = presignedUrls.urls.map(
					// eslint-disable-next-line
					({ pre_signed_url }, idx) => {
						(async () =>
							await axios.put(pre_signed_url, files[idx]))();
						console.log(pre_signed_url);
					}
				);
				await Promise.all(uploadPromises);
			},
		}
	);
};

// const readFileAsBinaryString = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//             const result = reader.result as string;
//             resolve(result);
//         };
//         reader.onerror = reject;
//         reader.readAsBinaryString(file);
//     });
// }
