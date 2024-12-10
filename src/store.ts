import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
// import { counterSlice } from './services/counter/slice'
import productsReducer from './services/products/slice';
import categoriesReducer from './services/categories/slice';
import searchReducer from './services/search/slice';

const listenerMiddlewareInstance = createListenerMiddleware({
	onError: () => console.error,
});

const store = configureStore({
	reducer: {
		products: productsReducer,
		categories: categoriesReducer,
		search: searchReducer,
	},
	middleware: gDM => gDM().prepend(listenerMiddlewareInstance.middleware),
});

export { store };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;
