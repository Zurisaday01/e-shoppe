import { configureStore } from '@reduxjs/toolkit';
// import { counterSlice } from './services/counter/slice'
import productsReducer from './services/products/slice';
import categoriesReducer from './services/categories/slice';
import searchReducer from './services/search/slice';

export const store = configureStore({
	reducer: {
		products: productsReducer,
		categories: categoriesReducer,
		search: searchReducer,
	},
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];
