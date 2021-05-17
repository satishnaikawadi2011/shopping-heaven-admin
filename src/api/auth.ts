import client from './client';

const endpoint = '/user';

const loginUser = (username: string, password: string) => {
	return client.post(`${endpoint}/admin/login`, { username, password });
};

const apiMethods = {
	loginUser
};

export default apiMethods;
