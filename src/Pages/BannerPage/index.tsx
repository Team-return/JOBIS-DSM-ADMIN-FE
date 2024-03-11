import { Banner } from '../../Components/Banner';
import { Header } from '../../Components/Header';
import * as _ from './styled';

export function BannerPage() {
	return (
		<_.Container>
			<Header />
			<Banner />
		</_.Container>
	);
}
