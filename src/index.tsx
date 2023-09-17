import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { baseTheme } from './Styles/Global/gloablTheme.style';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { App } from './App';
import { ModalContextProvider } from './Utils/Modal';
import { ToastContainer } from '@team-return/design-system';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			keepPreviousData: true,
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			staleTime: 5000,
		},
	},
});

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	// <React.StrictMode>
			<ThemeProvider theme={baseTheme}>
				<ModalContextProvider>
					<QueryClientProvider client={queryClient}>
						<ToastContainer />
						<App />
						<ReactQueryDevtools />
					</QueryClientProvider>
				</ModalContextProvider>
			</ThemeProvider>
	// </React.StrictMode>
);
