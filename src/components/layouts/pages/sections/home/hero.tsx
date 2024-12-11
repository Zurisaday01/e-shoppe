import Button from '../../../../button';

const HeroSection = () => {
	return (
		<div className='relative h-full w-full flex justify-center items-center isolate px-6 lg:px-8 '>
			<div className='mx-auto max-w-2xl'>
				<div className='text-center'>
					<h1 className='text-balance  tracking-tight text-5xl font-extrabold bg-gradient-to-bl from-blue-500 dark:from-blue-400  to-blue-800 dark:to-blue-700 bg-clip-text text-transparent leading-normal sm:text-7xl'>
						E-commerce Product Catalog
					</h1>
					<p className='mt-8 text-pretty text-lg  sm:text-xl/8'>
						This website features a dynamic product catalog for an e-commerce
						site, built with Vite. It allows users to browse through a variety
						of products fetched from an external API. The catalog offers a
						responsive design, ensuring a seamless experience across all
						devices, and includes a live search functionality for real-time
						product filtering. The platform provides an intuitive and efficient
						way for users to explore products, making it easy to find exactly
						what they're looking for.
					</p>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Button type='link' to='/catalog'>
							View catalog
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default HeroSection;
