import Pagination from '../pagination';
import { memo } from 'react';
import ProductsList from './products-list';
import OptionsView from './options-view';

const CatalogView = memo(
	({
		products,
		pagination,
		onSortChange,
	}: {
		products: Product[];
		pagination: PaginationState;
		onSortChange: (value: string) => void;
	}) => {
		return (
			<div className='flex-1 mb-8'>
				<div className='flex gap-3 flex-col-reverse md:flex-row items-start md:items-center justify-between'>
					<p>
						Showing <span className='font-bold'>{products.length}</span> results
						from total{' '}
						<span className='font-bold'>{pagination.totalItems}</span>.
					</p>

					<OptionsView onSortChange={onSortChange} />
				</div>

				<ProductsList products={products} />

				{products.length > 0 && pagination.totalPages > 1 && (
					<Pagination pagination={pagination} />
				)}
			</div>
		);
	}
);

export default CatalogView;
