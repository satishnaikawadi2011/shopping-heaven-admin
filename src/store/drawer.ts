import create from 'zustand';

type DrawerStore = {
	isDrawerOpen: boolean;
	setIsDrawerOpen: (a: boolean) => void;
};

export const useDrawerStore = create<DrawerStore>((set, get) => ({
	isDrawerOpen: false,
	setIsDrawerOpen: (a) => set((state) => ({ ...state, isDrawerOpen: a }))
}));
