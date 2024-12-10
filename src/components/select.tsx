import { Check, ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

interface SelectProps {
	options: Option[];
	onChange: (value: string | Option) => void;
	className?: string;
	value: Option;
}

const Select = ({ options, onChange, className, value }: SelectProps) => {
	const [selectedOption, setSelectedOption] = useState<Option | null>(value);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const handleSelect = (option: Option) => {
		setSelectedOption(option);
		if (typeof value === 'string') {
			onChange(option.value);
		} else {
			onChange(option);
		}

		setIsOpen(false);
	};

	const handleToggle = () => {
		setIsOpen(prev => !prev);
	};

	const handleBlur = (e: React.FocusEvent) => {
		// Close the dropdown when the click happens outside of it
		if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
			setIsOpen(false);
		}
	};

	return (
		<div
			className={`relative text-sm ${className}`}
			ref={dropdownRef}
			onBlur={handleBlur}
			tabIndex={0}>
			{/* Trigger Button */}
			<button
				onClick={handleToggle}
				className='w-full border border-gray-300 text-gray-900  rounded-lg flex items-center justify-between p-2.5  dark:border-blue-400 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
				{selectedOption?.icon}
				<span className='ml-2'>
					{selectedOption?.label || 'Select an option'}
				</span>
				<ChevronDown size={16} className='ml-auto w-[12px]' />
			</button>

			{/* Dropdown List */}
			{isOpen && (
				<ul className='absolute z-10 w-full overflow-hidden mt-2 bg-gray-50 border border-gray-300 rounded-lg shadow-lg dark:text-white dark:bg-gray-900 dark:border-blue-400'>
					{options.map((option, index) => (
						<li
							key={index}
							onClick={() => handleSelect(option)}
							className='flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'>
							{option.icon}
							<span>{option.label}</span>

							{option.label === value.label && (
								<Check size={16} className='ml-auto w-[12px]' />
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Select;
