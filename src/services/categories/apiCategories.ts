import { API_URL } from '../../constants';

export const getCategories = async () => {
	try {
		const res = await fetch(`${API_URL}/categories`);

		if (!res.ok) throw Error('Failed getting categories');

		// the api doesn't return a total count, so we need to get all products and count them
		const categories = await res.json();

		return categories;
	} catch (error: unknown) {
		throw Error((error as Error).message);
	}
};
