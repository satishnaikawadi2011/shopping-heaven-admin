import { Product } from './../models/Product';
import create from 'zustand';

type ProductStore = {
	products: Product[] | null;
	setProducts: (products: Product[]) => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
	products: null,
	setProducts: (products) => set((state) => ({ ...state, products }))
}));
