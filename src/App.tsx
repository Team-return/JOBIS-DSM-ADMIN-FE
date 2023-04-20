import Router from './router';
import { StyledProvider } from '@team-return/design-system';
import { RouterProvider } from 'react-router-dom';

export function App() {
	return (
		<>
			<StyledProvider>
				<RouterProvider router={Router} />
			</StyledProvider>
		</>
	);
}
