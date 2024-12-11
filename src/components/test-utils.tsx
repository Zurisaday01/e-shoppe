import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from '../context/modal';
import { store } from '../store';

interface CustomRenderOptions {
	useModalProvider?: boolean;
}

// needed for all the tests since the providers are necessary
export const customRender = (
	ui: React.ReactElement,
	{ useModalProvider = true }: CustomRenderOptions = {}
) => {
	return render(
		<Provider store={store}>
			<BrowserRouter>
				{useModalProvider ? <ModalProvider>{ui}</ModalProvider> : ui}
			</BrowserRouter>
		</Provider>
	);
};
