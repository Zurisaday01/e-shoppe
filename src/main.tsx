import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from './context/theme.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeContextProvider>
		</Provider>
	</StrictMode>
);
