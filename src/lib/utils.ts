export const formatStringCamelCase = (str: string) => {
	return str.replace(/\b\w/g, char => char.toUpperCase());
};

export const getPaginatedProducts = (
	products: Product[],
	pagination: PaginationState
) => {
	const { currentPage, itemsPerPage } = pagination;
	// Calculate start and end index for pagination
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;

	// Return the products for the current page after filtering
	return products.slice(startIndex, endIndex);
};

export const applyFilter = (
	selectedCategories: string[],
	products: Product[]
): Product[] => {
	return selectedCategories.length
		? products?.filter(product => selectedCategories.includes(product.category))
		: products;
};

export const applySort = (products: Product[], sortOption: string) => {
	return [...products]?.sort((a, b) => {
		switch (sortOption) {
			case 'priceAsc':
				return a.price - b.price;
			case 'priceDesc':
				return b.price - a.price;
			case 'ratingAsc':
				return a.rating.rate - b.rating.rate;
			case 'ratingDesc':
				return b.rating.rate - a.rating.rate;
			default:
				return 0;
		}
	});
};

export const applySearchFilter = (products: Product[], searchTerm: string) => {
	return products?.filter(product =>
		product.title.toLowerCase().includes(searchTerm.toLowerCase())
	);
}
