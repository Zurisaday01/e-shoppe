import  { createContext, useContext, useState, ReactNode } from 'react';

type ModalContextType = {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return (
		<ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider');
	}
	return context;
};
