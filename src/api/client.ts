import { create } from 'apisauce';

import { BACKEND_URL } from './../constants/index';

const apiClient = create({
	baseURL: BACKEND_URL
});

export default apiClient;
