import { User } from './../models/User';
import create from 'zustand';

type UserStore = {
	users: User[] | null;
	setUsers: (users: User[]) => void;
    removeUser: (userId: string) => void;
    toggleAsAdmin: (userId: string, make: boolean) => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
	users: null,
	setUsers: (users) => set((state) => ({ ...state, users })),
	removeUser:
		(userId) => {
			const updatedUsers = get().users!.filter((user) => user._id !== userId);
			set((state) => ({ ...state, users: updatedUsers }));
        },
    toggleAsAdmin: (userId, make) => {
        const updatedUsers: any = get().users?.map(user => {
            if (user._id !== userId) {
                return user;
            }
            return {
                ...user,
                isAdmin:make
            }
        })
        set((state) => ({...state,users:updatedUsers}))
    }
}));
