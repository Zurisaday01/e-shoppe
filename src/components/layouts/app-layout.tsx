import { Outlet } from 'react-router';
import Header from './header';
import Loader from '../loader';
import { Suspense } from 'react';

const AppLayout = () => {
	return (
		<div className='flex flex-col h-[100vh]'>
			<Header />
			<main className='flex-1 flex overflow-y-scroll'>
				<div className='w-full mx-auto max-w-7xl px-3'>
					<Suspense fallback={<Loader />}>
						<Outlet />
					</Suspense>
				</div>
			</main>
		</div>
	);
};
export default AppLayout;
