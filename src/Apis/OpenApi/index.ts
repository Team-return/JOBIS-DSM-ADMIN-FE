import axios from 'axios';
import { RequiredLicensesListResponse } from './response';

/** 국가자격 목록 조회 */
export const getRequiredLicensesList = async (
	page: number,
	perPage: number
) => {
	const { data } = await axios.get<RequiredLicensesListResponse>(
		`https://api.odcloud.kr/api/15037516/v1/uddi:a4572d6a-2f56-440d-b79b-d4259f202049?page=${page}&perPage=${perPage}&serviceKey=${process.env.REACT_APP_REQUIRED_LICENSES_ENCODING_KEY}`
	);
	return data;
};
