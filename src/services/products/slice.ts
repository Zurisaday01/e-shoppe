import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from './apiProducts';
import { RootState } from '../../store';
import { ITEMS_PER_PAGE } from '../../constants';

// <ReturnType, ArgumentType, Reject (optional)>
// thunks for async actions

interface fetchResponse {
	products: Product[];
	totalCount: number;
}

export const fetchProducts = createAsyncThunk<fetchResponse, void>(
	'products/fetchProducts',
	async () => {
		const data = await getProducts();
		return data;
	}
);

// state type
export interface ProductsState {
	products: Product[] | null;
	status: 'idle' | 'pending' | 'succeeded' | 'failed';
	error: string | null;
	pagination: PaginationState;
}

// Define the inital pagination state
const initialPaginationState: PaginationState = {
	currentPage: 1,
	totalPages: 1,
	itemsPerPage: ITEMS_PER_PAGE,
	totalItems: 0,
};

// Define the initial state using that type
const initialState: ProductsState = {
	products: null,
	status: 'idle',
	error: null,
	pagination: initialPaginationState,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setCurrentPage: (state, action) => {
			state.pagination.currentPage = action.payload;
		},
		resetPagination: (state, action) => {
			state.pagination.currentPage = action.payload.currentPage;
			state.pagination.totalItems = action.payload.totalItems;
			state.pagination.totalPages = Math.ceil(
				action.payload.totalItems / ITEMS_PER_PAGE
			);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.status = 'pending';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				// Add any fetched products to the array
				state.products = action.payload.products;
				// Update the pagination state
				state.pagination.totalItems = action.payload.totalCount;
				state.pagination.totalPages = Math.ceil(
					action.payload.totalCount / ITEMS_PER_PAGE
				);
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Unknown Error';
			});
	},
});

// action creators
export const { setCurrentPage, resetPagination } = productsSlice.actions;

// export the reducer (to be used in the store)
export default productsSlice.reducer;

// selectors
export const selectAllProducts = (state: RootState) => state.products.products;

export const selectPagination = (state: RootState) => state.products.pagination;
