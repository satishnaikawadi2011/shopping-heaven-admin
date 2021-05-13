import { Product } from './../models/Product';
import client from './client';

const endpoint = '/product';

const getProducts = (token: string | null) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.get(`${endpoint}`);
};

const deleteProduct = (token: string | null, productId: string) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.delete(`${endpoint}/${productId}`);
};

const createProduct = (token: string | null) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.post(`${endpoint}/create`, {});
};

const getProduct = (token: string | null, productId: string) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.get(`${endpoint}/${productId}`);
};

const updateProduct = (token: string | null, product: Product) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.patch(`${endpoint}/${product._id}`, product);
};

const apiMethods = {
	getProducts,
	deleteProduct,
	createProduct,
	getProduct,
	updateProduct
};

export default apiMethods;