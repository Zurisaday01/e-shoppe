import { ShoppingCartIcon } from 'lucide-react';
import Button from '../button';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import { formatStringCamelCase } from '../../lib/utils';

interface ProductCardProps {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
	rating: Rating;
	category: string;
}

const ProductCard = ({
	title,
	price,
	description,
	image,
	rating,
	category,
}: ProductCardProps) => {
	return (
		<div className='relative w-full flex flex-col overflow-hidden border border-gray-300 dark:border-blue-400 rounded-lg shadow-md'>
			<div className='flex items-center justify-center h-60 bg-white pt-3 relative'>
				<img
					className='h-full rounded-t-lg object-cover object-center'
					src={image}
					alt={title}
				/>
			</div>

			<div className='px-5 pb-5 mt-5 flex flex-col flex-1 '>
				<Link to='/catalog/#'>
					<h4 className='text-xl font-semibold tracking-tight'>{title}</h4>
				</Link>
				<p className='text-blue-600 text-sm dark:text-blue-200 mt-1'>
					{formatStringCamelCase(category)}
				</p>
				<p className='line-clamp-3 mt-2'>{description}</p>
				<div className='mt-2.5 mb-5 flex items-center'>
					<div>
						<ReactStars
							edit={false}
							value={rating.rate}
							size={20}
							color2='#ffd700'
						/>
					</div>

					<span className='mr-2 px-2.5 py-0.5 text-xs font-semibold'>
						{rating.rate}
					</span>
				</div>
				{/* footer */}
				<div className='flex flex-1 items-center justify-between gap-3 flex-row lg:flex-col lg:items-start'>
					<p className='text-2xl font-bold'>${price}</p>
					<Button className='flex items-center  w-fit lg:w-full text-center justify-center'>
						<ShoppingCartIcon size={16} className='mr-2' />
						<span>Add to Cart</span>
					</Button>
				</div>
			</div>
		</div>
	);
};
export default ProductCard;
