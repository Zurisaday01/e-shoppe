import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
	label: string;
	href: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
	return (
		<ol className='flex items-center whitespace-nowrap'>
			{items.map((item, index) => (
				<li className='inline-flex items-center' key={index}>
					<Link
						className='flex items-center text-sm text-gray-500 dark:text-gray-300 hover:text-blue-600 focus:outline-none focus:text-blue-600  dark:hover:text-blue-500 dark:focus:text-blue-500'
						to={item.href}>
						{item.label}
					</Link>

					{index < items.length - 1 && (
						<ChevronRight
							size={16}
							className='mx-2 text-gray-500 dark:text-gray-300'
						/>
					)}
				</li>
			))}
		</ol>
	);
};
export default Breadcrumb;
