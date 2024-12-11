import { Link } from 'react-router-dom';

const Button = ({
	children,
	className,
	type,
	to,
}: {
	children: React.ReactNode;
	className?: string;
	type?: 'button' | 'link';
	to?: string;
}) => {
	const styles = `rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`;

	if (type === 'link' && to) {
		return (
			<Link to={to} className={styles}>
				{children}
			</Link>
		);
	}

	return <button className={styles}>{children}</button>;
};
export default Button;
