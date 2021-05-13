import client from './client';

const endpoint = '/category';

const getCategories = (token: string | null) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.get(`${endpoint}`);
};

const deleteCategory = (token: string | null, categoryId: string) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.delete(`${endpoint}/${categoryId}`);
};

const createCategory = (token: string | null, name: string) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.post(`${endpoint}/add`, { name });
};

const apiMethods = {
	getCategories,
	deleteCategory,
	createCategory
};

export default apiMethods;
