import React from 'react';
import { useModal } from '../../context/modal';
import { X } from 'lucide-react';

type ModalContentProps = {
	title: string;
	children: React.ReactNode;
	className?: string;
	width?: string;
};

const ModalContent = ({
	title,
	children,
	className,
	width,
}: ModalContentProps) => {
	const { isOpen, closeModal } = useModal();

	if (!isOpen) return null;

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm ${className}`}
			onClick={closeModal}>
			<div
				className={`relative rounded-lg bg-white shadow-md ${
					width ? width : 'w-[800px] max-w-sm'
				}`}
				onClick={e => e.stopPropagation()}>
				<div className='flex justify-between items-center p-4 border-b'>
					<h2 className='text-xl font-medium'>{title}</h2>
					<button onClick={closeModal} className='rounded-full'>
						<X size={16} />
					</button>
				</div>
				<div className='p-4'>{children}</div>
			</div>
		</div>
	);
};

export default ModalContent;
