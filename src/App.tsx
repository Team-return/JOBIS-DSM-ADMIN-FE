import Router from './router';
import { StyledProvider } from '@team-return/design-system';
import { RouterProvider } from 'react-router-dom';
import { GlobalStyle } from './Styles/Global/gloablStyle.style';

export function App() {
	return (
		<StyledProvider>
			<RouterProvider router={Router} />
			<GlobalStyle />
		</StyledProvider>
	);
}
