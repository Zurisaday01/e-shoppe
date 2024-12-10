import { useState } from 'react';
import Select from '../select';

const SortOptions = ({
	onSortChange,
}: {
	onSortChange: (value: string) => void;
}) => {
	const [sort, setSort] = useState<Option>({
		value: 'featured',
		label: 'Featured',
	});

	const handleSortChange = (value: Option) => {
		setSort(value);
		onSortChange(value.value); // Notify parent of the new sort option
	};

	return (
		<div className='flex items-center gap-2'>
			<p className='text-sm'>Sort By</p>
			<Select
				className='w-[180px]'
				onChange={value => handleSortChange(value as Option)}
				value={sort}
				options={[
					{ value: 'featured', label: 'Featured' },
					{ value: 'priceAsc', label: 'Price: Low to High' },
					{ value: 'priceDesc', label: 'Price: High to Low' },
					{ value: 'ratingDesc', label: 'Rating: Best to Worst' },
					{ value: 'ratingAsc', label: 'Rating: Worst to Best' },
				]}
			/>
		</div>
	);
};
export default SortOptions;
