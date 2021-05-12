export interface LoginOrRegisterResponse {
	user: User;
	token: string;
}
export interface User {
	isAdmin: boolean;
	_id: string;
	email: string;
	password: string;
	username: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
