import { User } from './../models/User';
import create from 'zustand';

type AuthStore = {
	token: string | null;
	user: User | null;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
	token: null,
	user: null
}));
