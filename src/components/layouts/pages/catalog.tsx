import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../breadcrumb';
import FilterOptions from '../../products/filter-options';
import {
	fetchProducts,
	resetPagination,
	selectAllProducts,
	selectPagination,
} from '../../../services/products/slice';
import { AppDispatch } from '../../../store';
import { useEffect, useMemo, useState } from 'react';
import { ModalProvider } from '../../../context/modal';
import {
	fetchCategories,
	selectAllCategories,
	selectSelectedCategories,
} from '../../../services/categories/slice';
import {
	applySort,
	applyFilter,
	getPaginatedProducts,
	applySearchFilter,
} from '../../../lib/utils';
import SearchBar from '../../search-bar';
import { selectSearchTerm } from '../../../services/search/slice';
import CatalogView from '../../products/catalog-view';

const CatalogPage = () => {
	const dispatch: AppDispatch = useDispatch();

	// Redux state selectors
	const products = useSelector(selectAllProducts);
	const pagination = useSelector(selectPagination);
	const categories = useSelector(selectAllCategories);
	const selectedCategories = useSelector(selectSelectedCategories);
	const searchTerm = useSelector(selectSearchTerm);

	// Local state for sorting
	const [sortOption, setSortOption] = useState('featured');

	// Filter and sort products
	const filteredProducts = useMemo(
		() => applyFilter(selectedCategories, products || []),
		[selectedCategories, products]
	);

	const sortedProducts = useMemo(
		() => applySort(filteredProducts || [], sortOption),
		[filteredProducts, sortOption]
	);

	// Filter the products based on the search term directly in the component
	const filteredSearchedProducts = useMemo(
		() => applySearchFilter(sortedProducts || [], searchTerm),
		[sortedProducts, searchTerm]
	);

	const paginatedProducts = useMemo(
		() => getPaginatedProducts(filteredSearchedProducts, pagination),
		[filteredSearchedProducts, pagination]
	);

	// Fetch categories and products on mount
	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchProducts());
	}, [dispatch]);

	useEffect(() => {
		// Determine total items based on selected categories or search term
		let totalItems = products?.length || 0;

		if (selectedCategories.length > 0) {
			totalItems = filteredProducts?.length || 0;
		}

		if (searchTerm) {
			totalItems = filteredSearchedProducts?.length || 0;
		}

		// Reset pagination only once when categories or search term change
		dispatch(
			resetPagination({
				currentPage: 1,
				totalItems,
			})
		);
	}, [
		dispatch,
		selectedCategories,
		filteredProducts,
		searchTerm,
		filteredSearchedProducts,
		products,
	]);

	// Handlers
	const handleSortChange = (value: string) => setSortOption(value);

	// Return early if data is missing
	if (!products || !categories) return null;

	return (
		<ModalProvider>
			<div className='mt-7'>
				<Breadcrumb
					items={[
						{ label: 'Home', href: '/' },
						{ label: 'Catalog', href: '/catalog' },
					]}
				/>
				<div className='flex gap-0 lg:gap-4 mt-4'>
					<aside>
						<FilterOptions />
					</aside>
					<div className='w-full'>
						<SearchBar />
						<CatalogView
							pagination={pagination}
							products={paginatedProducts as Product[]}
							onSortChange={handleSortChange}
						/>
					</div>
				</div>
			</div>
		</ModalProvider>
	);
};
export default CatalogPage;
