import AppLayout from './components/layouts/app-layout';
import CatalogPage from './components/layouts/pages/catalog';
import HomePage from './components/layouts/pages/home';

import { Routes, Route } from 'react-router';

function App() {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path='catalog' element={<CatalogPage />} />
			</Route>
		</Routes>
	);
}

export default App;
