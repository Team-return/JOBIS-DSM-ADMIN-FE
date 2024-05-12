import { useMutation } from "react-query";
import { PresignedUrlResponse } from "./response";
import { instance } from "../axios";
import axios from "axios";

export type PresignedUrlType =
    | "LOGO_IMAGE"
    | "EXTENSION_FILE";

export const usePresignedUrl = (type: PresignedUrlType) => {
    const res = useMutation(
        async (attachments: File[] ) => {
            const files = attachments.map((item) => ({
                type: "EXTENSION_FILE",
                file_name: item.name,
            }));

            const { data: presignedUrls } = await instance.post<PresignedUrlResponse>(`${process.env.REACT_APP_BASE_URL}/files/pre-signed`, { files });  
            return {presignedUrls, attachments};
        }, {
            onSuccess: async ({ presignedUrls, attachments }) => {
                
                const uploadPromises = await presignedUrls.urls.map(({pre_signed_url}, idx) => {
                    (async () => await axios.put(pre_signed_url, attachments[idx]))();
                });
                await Promise.all(uploadPromises);
                return;
            }
        }
    )
    return res
}