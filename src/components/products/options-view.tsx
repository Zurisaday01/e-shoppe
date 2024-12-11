import FilterOptions from './filter-options';
import ModalContent from '../modal/modal-content';
import ModalTrigger from '../modal/modal-trigger';
import { Filter } from 'lucide-react';
import SortOptions from './sort-options';

interface OptionsViewProps {
	onSortChange: (value: string) => void;
}

const OptionsView = ({ onSortChange }: OptionsViewProps) => {
	return (
		<div className='flex items-center gap-2' data-testid='options-view'>
			<SortOptions onSortChange={onSortChange} />

			<ModalTrigger className='flex lg:hidden items-center gap-2 border border-gray-300 text-gray-900  rounded-lg justify-between p-2.5  dark:border-blue-400 dark:text-white'>
				<Filter size={16} />
				<p className='text-sm'>Filter</p>
			</ModalTrigger>
			<ModalContent
				title='Filter By'
				className='lg:hidden'
				width='w-[700px] max-w-sm'>
				<FilterOptions role='modal' />
			</ModalContent>
		</div>
	);
};
export default OptionsView;
