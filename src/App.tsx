import Router from './router';
import { StyledProvider } from '@team-return/design-system';
import { RouterProvider } from 'react-router-dom';

function App() {
	return (
		<>
			<StyledProvider>
				<RouterProvider router={Router} />
			</StyledProvider>
		</>
	);
}

export default App;
