import client from './client';

const endpoint = '/user';

const getUsers = (token: string | null) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.get(`${endpoint}`);
};

const deleteUser = (token: string | null, userId: string) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	return client.delete(`${endpoint}/${userId}`);
};

const toggleAdminPrevillages = (token: string | null, username: string, make: boolean) => {
	client.setHeader('Authorization', `Bearer ${token}`);
	if (make) {
		return client.post(`${endpoint}/admin/${username}`);
	}
	return client.delete(`${endpoint}/admin/${username}`);
};

const apiMethods = {
	getUsers,
	deleteUser,
	toggleAdminPrevillages
};

export default apiMethods;
