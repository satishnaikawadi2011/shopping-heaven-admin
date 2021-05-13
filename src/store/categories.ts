import { Category } from './../models/Category';
import create from 'zustand';

type CategoryStore = {
	categories: Category[] | null;
	setCategories: (categories: Category[]) => void;
	removeCategory: (categoryId: string) => void;
	addCategory: (category: Category) => void;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
	categories: null,
	setCategories: (categories) => set((state) => ({ ...state, categories })),
	removeCategory:
		(id) => {
			const updatedCategories = get().categories!.filter((cat) => cat._id !== id);
			set((state) => ({ ...state, categories: updatedCategories }));
		},
	addCategory:
		(category) => {
			set((state) => ({
				...state,
				categories:

						state.categories ? [
							category,
							...state.categories
						] :
						[
							category
						]
			}));
		}
}));
