import { CreateBanner } from '../../Components/CreateBanner';
import { Header } from '../../Components/Header';
import * as _ from './styled';
export function CreateBannerPage() {
	return (
		<_.Container>
			<Header />
			<CreateBanner />
		</_.Container>
	);
}
