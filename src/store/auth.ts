import { User } from './../models/User';
import create from 'zustand';
import storage from '../utils/storage';

type AuthStore = {
	token: string | null;
	user: User | null;
	setToken: (token: string) => void;
	setUser: (user: User) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
	token: null,
	user: null,
	setToken: (token) => set((state) => ({ ...state, token })),
	setUser: (user) => set((state) => ({ ...state, user })),
	logout:
		() => {
			set((state) => ({ ...state, user: null, token: null }));
			storage.remove('authData');
		}
}));
