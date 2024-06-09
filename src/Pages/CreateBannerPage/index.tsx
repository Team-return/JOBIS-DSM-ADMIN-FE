import { useState } from 'react';
import { Header } from '../../Components/Header';
import * as _ from './styled';
import { CreateBanner } from '../../Components/CreateBanner';

export function CreateBannerPage() {
	const [data, setData] = useState({
		banner_url: '',
		start_date: '',
		end_date: '',
		banner_type: '',
	});
	return (
		<_.Container>
			<Header />
			<CreateBanner date={data} setDate={setData} />
		</_.Container>
	);
}
