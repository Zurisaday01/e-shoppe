declare global {
	interface Rating {
		rate: number;
		count: number;
	}

	interface Product {
		id: number;
		title: string;
		price: number;
		description: string;
		category: string;
		image: string;
		rating: Rating;
	}

	// pagination state
	interface PaginationState {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		itemsPerPage: number;
	}
	// select option
	interface Option {
		selected?: boolean;
		value: string;
		label: string;
		icon?: React.ReactNode;
	}
}

export {};
