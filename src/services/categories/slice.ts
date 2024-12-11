import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategories } from './apiCategories';
import { RootState } from '../../store';

export const fetchCategories = createAsyncThunk<string[], void>(
	'products/fetchCategories',
	async () => {
		const data = await getCategories();
		return data;
	}
);

// state type
export interface CategoriesState {
	categories: string[] | null;
	selectedCategories: string[];
	status: 'idle' | 'pending' | 'succeeded' | 'failed';
	error: string | null;
}

// Define the initial state using that type
const initialState: CategoriesState = {
	categories: null,
	selectedCategories: [],
	status: 'idle',
	error: null,
};

const categoriesSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setSelected: (state, action: PayloadAction<string[]>) => {
			state.selectedCategories = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchCategories.pending, state => {
				state.status = 'pending';
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.status = 'succeeded';
				// Add any fetched products to the array
				state.categories = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Unknown Error';
			});
	},
});

// actions
export const { setSelected } = categoriesSlice.actions;

// export the reducer (to be used in the store)
export default categoriesSlice.reducer;

// selectors
export const selectAllCategories = (state: RootState) =>
	state.categories.categories;

export const selectSelectedCategories = (state: RootState) =>
	state.categories.selectedCategories;
