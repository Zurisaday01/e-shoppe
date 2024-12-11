import ProductCard from './product-card';

interface ProductsListProps {
	products: Product[];
}

const ProductsList = ({ products }: ProductsListProps) => {
	return (
		<div
			className='mb-12 w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-4 mt-10'
			data-testid='products-list'>
			{products.map(product => (
				<ProductCard
					category={product.category}
					id={product.id}
					key={product.id}
					title={product.title}
					description={product.description}
					image={product.image}
					rating={product.rating}
					price={+product.price.toFixed(2)}
				/>
			))}
		</div>
	);
};
export default ProductsList;
