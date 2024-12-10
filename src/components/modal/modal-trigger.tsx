import { useModal } from '../../context/modal';

interface ModalTriggerProps {
	className?: string;
	children: React.ReactNode;
}

const ModalTrigger = ({ className, children }: ModalTriggerProps) => {
	const { openModal } = useModal();

	return (
		<button className={className} onClick={openModal}>
			{children}
		</button>
	);
};
export default ModalTrigger;
