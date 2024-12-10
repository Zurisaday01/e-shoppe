import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../services/search/slice';

const SearchBar = () => {
	const dispatch = useDispatch();
	const [query, setQuery] = useState('');

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		dispatch(setSearchTerm(value));
	};

	return (
		<input
			type='text'
			value={query}
			onChange={handleSearchChange}
			placeholder='Search products...'
			className='mb-4 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 bg-white dark:bg-gray-900 focus:ring-blue-500 focus:border-blue-500  dark:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
		/>
	);
};

export default SearchBar;
