import { Link } from 'react-router-dom';
import SelectTheme from '../select-theme';

const Header = () => {
	return (
		<header className='border-b border-blue-600 dark:border-blue-400'>
			<nav
				className='mx-auto flex max-w-7xl items-center justify-between py-6 px-3'
				aria-label='Global'>
				<div className='flex lg:flex-1'>
					<Link
						to='/'
						className='flex items-center  font-bold text-xl text-blue-600 dark:text-blue-400'>
						E-Shoppe
					</Link>
				</div>

				<SelectTheme />
			</nav>
		</header>
	);
};
export default Header;
