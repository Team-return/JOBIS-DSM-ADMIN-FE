import Router from './router';
import { StyledProvider } from '@team-return/design-system';
import { RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './Styles/Global/gloablStyle.style';
import { Modal } from './Utils/Modal';

export function App() {
	return (
		<StyledProvider>
			<Modal />
			<RouterProvider router={Router} />
			<GlobalStyle />
		</StyledProvider>
	);
}
