import { Filter } from 'lucide-react';
import Pagination from '../pagination';
import ProductCard from './product-card';
import FilterOptions from './filter-options';
import ModalContent from '../modal/modal-content';
import ModalTrigger from '../modal/modal-trigger';
import SortOptions from './sort-options';
import { memo } from 'react';

const ProductsList = memo(
	({
		products,
		categories,
		pagination,
		onSortChange,
	}: {
		products: Product[];
		categories: string[];
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

					<div className='flex items-center gap-2'>
						<SortOptions onSortChange={onSortChange} />

						<ModalTrigger className='flex lg:hidden items-center gap-2 border border-gray-300 text-gray-900  rounded-lg justify-between p-2.5  dark:border-blue-400 dark:text-white'>
							<Filter size={16} />
							<p className='text-sm'>Filter</p>
						</ModalTrigger>
						<ModalContent
							title='Filter By'
							className='lg:hidden'
							width='w-[700px] max-w-sm'>
							<FilterOptions role='modal' categories={categories} />
						</ModalContent>
					</div>
				</div>
				<div className='mb-12 w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-4 mt-10 '>
					{products.map(product => (
						<ProductCard
							category={product.category}
							id={product.id}
							key={product.id}
							title={product.title}
							description={product.description}
							image={product.image}
							rating={product.rating}
							price={product.price}
						/>
					))}
				</div>
				{products.length > 0 && <Pagination pagination={pagination} />}
			</div>
		);
	}
);

export default ProductsList;
