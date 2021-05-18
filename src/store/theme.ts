import create from 'zustand';
import storage from '../utils/storage';

type ThemeStore = {
	isDark: boolean;
	setIsDark: (isDark: boolean) => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
	isDark: true,
	setIsDark:
		(isDark) => {
			set((state) => ({ ...state, isDark }));
			storage.store('themeData', { isDark });
		}
}));
