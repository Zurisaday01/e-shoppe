import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { formatStringCamelCase } from '../../lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectSelectedCategories,
	setSelected,
} from '../../services/categories/slice';

const FilterOptions = ({
	categories,
	role = 'sidebar',
}: {
	categories: string[];
	role?: 'sidebar' | 'modal';
}) => {
	const dispatch = useDispatch();

	const [openItem, setOpenItem] = useState<string | null>(null);

	const selectedCategories = useSelector(selectSelectedCategories);

	// handle category selection
	const handleCategorySelection = (category: string) => {
		if (selectedCategories.includes(category)) {
			dispatch(
				setSelected(selectedCategories.filter(item => item !== category))
			);
			return;
		} else {
			dispatch(setSelected([...selectedCategories, category]));
		}
	};

	return (
		<div
			className={`${
				role === 'sidebar'
					? 'w-[250px] hidden border'
					: 'w-full flex lg:hidden border-none'
			}  lg:flex h-max  border-gray-300 text-gray-900  rounded-lg  items-center justify-between p-2.5  dark:border-blue-400 dark:text-white`}>
			<ul className='space-y-2 w-full'>
				<li>
					<button
						onClick={() =>
							setOpenItem(prev => (prev === 'products' ? null : 'products'))
						}
						className='w-full p-1 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm px-1.5'>
						<span>Category</span>

						{openItem === 'products' ? (
							<ChevronDown
								size={16}
								className='ml-2 transition-all duration-300 transform -rotate-180'
							/>
						) : (
							<ChevronDown
								size={16}
								className='ml-2 transition-all duration-300'
							/>
						)}
					</button>
					<div className={`${openItem === 'products' ? 'block' : 'hidden'}`}>
						<ul className='space-y-2 mt-4 ml-6'>
							{categories.map((category, index) => (
								<li key={index}>
									<div className='flex items-center mb-4'>
										<input
											id={index.toString()}
											type='checkbox'
											checked={selectedCategories.includes(category)}
											onChange={() => handleCategorySelection(category)}
											className='outline-none w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
										/>
										<label
											htmlFor={index.toString()}
											className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
											{formatStringCamelCase(category)}
										</label>
									</div>
								</li>
							))}
						</ul>
					</div>
				</li>
			</ul>
		</div>
	);
};
export default FilterOptions;
