import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../services/products/slice';

interface PaginationProps {
	pagination: PaginationState;
}

const Pagination = ({ pagination }: PaginationProps) => {
	const dispatch = useDispatch();

	// handlers
	const handlePrevPage = () => {
		if (pagination.currentPage > 1) {
			dispatch(setCurrentPage(pagination.currentPage - 1));
		}
	};

	const handleNextPage = () => {
		if (pagination.currentPage < pagination.totalPages) {
			dispatch(setCurrentPage(pagination.currentPage + 1));
		}
	};

	const handleSelectPage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	return (
		<nav
			aria-label='Page navigation'
			className='flex items-center justify-center'>
			<ul className='inline-flex -space-x-px text-base h-10'>
				<li>
					<button
						disabled={pagination.currentPage === 1}
						onClick={handlePrevPage}
						className='flex items-center justify-center px-4 h-10 ms-0 leading-tight  cursor-pointer  border border-e-0 border-gray-300 dark:border-blue-500 rounded-s-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
						Previous
					</button>
				</li>
				{Array.from({ length: pagination.totalPages }, (_, i) => (
					<li key={i}>
						<button
							onClick={() => handleSelectPage(i + 1)}
							className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight  cursor-pointer  border border-e-0 border-gray-300 dark:border-blue-500 dark:hover:bg-gray-700  ${
								pagination.currentPage === i + 1
									? 'bg-blue-600 hover:bg-blue-500 text-blue-50 border-blue-300'
									: 'hover:bg-gray-100'
							}`}>
							{i + 1}
						</button>
					</li>
				))}

				<li>
					<button
						onClick={handleNextPage}
						disabled={pagination.currentPage === pagination.totalPages}
						className='flex items-center justify-center px-4 h-10 ms-0 leading-tight  cursor-pointer  border  border-gray-300 dark:border-blue-500 rounded-e-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};
export default Pagination;
