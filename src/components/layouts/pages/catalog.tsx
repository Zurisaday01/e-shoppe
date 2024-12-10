import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../breadcrumb';
import ProductsList from '../../products/products-list';
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
} from '../../../lib/utils';
import SearchBar from '../../search-bar';
import {
	selectSearchTerm,
} from '../../../services/search/slice';

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
	const filteredSearchedProducts = useMemo(() => {
		return sortedProducts?.filter(product =>
			product.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [sortedProducts, searchTerm]);

	const paginatedProducts = useMemo(
		() => getPaginatedProducts(filteredSearchedProducts, pagination),
		[filteredSearchedProducts, pagination]
	);

	// Fetch categories and products on mount
	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchProducts());
	}, [dispatch]);

	// Reset pagination when categories change
	useEffect(() => {
		if (selectedCategories.length > 0) {
			dispatch(
				resetPagination({
					currentPage: 1,
					totalItems: filteredProducts?.length,
				})
			);
		} else {
			dispatch(
				resetPagination({
					currentPage: 1,
					totalItems: products?.length || 0,
				})
			);
		}
	}, [
		dispatch,
		selectedCategories,
		filteredProducts?.length,
		products?.length,
	]);

	useEffect(() => {
		if (searchTerm) {
			dispatch(
				resetPagination({
					currentPage: 1,
					totalItems: filteredSearchedProducts?.length,
				})
			);
		} else {
			dispatch(
				resetPagination({
					currentPage: 1,
					totalItems: products?.length || 0,
				})
			);
		}
	}, [
		dispatch,
		selectedCategories,
		filteredProducts.length,
		products?.length,
		searchTerm,
		filteredSearchedProducts?.length,
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
						<FilterOptions categories={categories} />
					</aside>
					<div className='w-full'>
						<SearchBar />
						<ProductsList
							pagination={pagination}
							products={paginatedProducts as Product[]}
							categories={categories}
							onSortChange={handleSortChange}
						/>
					</div>
				</div>
			</div>
		</ModalProvider>
	);
};
export default CatalogPage;
