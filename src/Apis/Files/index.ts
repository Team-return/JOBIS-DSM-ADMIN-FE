import { useMutation } from 'react-query';
// import { PresignedUrlRequest } from "./request"
import { PresignedUrlResponse } from './response';
import { instance } from '../axios';
import axios from 'axios';

// export const usePresignedUrl = () => {
//     return useMutation(
//         async (attachments: File[]) => {
//             const files = attachments.map((item) => ({
// 				type: 'EXTENSION_FILE',
// 				file_name: item.name,
//             }));

//             const data = await instance.post(`${process.env.REACT_APP_BASE_URL}/files/pre-signed`, {files});

//             return data;
//         }, {
//             onSuccess: ({data}) => {
//                 console.log(data);
//             }
//         }
//     )
// }
// propsData: PresignedUrlRequest/

export const usePresignedUrl = () => {
	return useMutation(
		async (attachments: File[]) => {
			const files = attachments.map((item) => ({
				type: 'EXTENSION_FILE',
				file_name: item.name,
			}));

			const { data: presignedUrls } =
				await instance.post<PresignedUrlResponse>(
					`${process.env.REACT_APP_BASE_URL}/files/pre-signed`,
					{ files }
				);
			return { presignedUrls, attachments };
		},
		{
			onSuccess: async ({ presignedUrls, attachments }) => {
				const uploadPromises = presignedUrls.urls.map(
					({ pre_signed_url }, idx) => {
						return (async () =>
							await axios.put(
								pre_signed_url,
								attachments[idx]
							))();
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
