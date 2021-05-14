import client from './client';

const endpoint = '/order';

const getOrders = (token: string | null) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.get(`${endpoint}`);
};

const getOrder = (token: string | null, orderId: string) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.get(`${endpoint}/${orderId}`);
};

const markAsDelivered = (token: string | null, orderId: string) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.post(`${endpoint}/${orderId}/markAsDelivered`);
};

const markOrderAsPaid = (token: string | null, orderId: string, currency: string, amount: number) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.post(`${endpoint}/${orderId}/pay/admin`, { currency, amount });
};

const apiMethods = {
	getOrders,
	getOrder,
	markAsDelivered,
	markOrderAsPaid
};

export default apiMethods;
