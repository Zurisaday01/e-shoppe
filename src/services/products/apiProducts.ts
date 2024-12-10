import { API_URL } from '../../constants';

export const getProducts = async () => {
	try {
		const res = await fetch(`${API_URL}`);

		if (!res.ok) throw Error('Failed getting products');

		// the api doesn't return a total count, so we need to get all products and count them
		const products = await res.json();

		return { products, totalCount: products.length };
	} catch (error: unknown) {
		throw Error((error as Error).message);
	}
};
