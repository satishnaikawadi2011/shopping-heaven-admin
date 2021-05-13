import { Product } from './../models/Product';
import create from 'zustand';

type ProductStore = {
	products: Product[];
	setProducts: (products: Product[]) => void;
};

export const useDrawerStore = create<ProductStore>((set, get) => ({
	products: [],
	setProducts: (products) => set((state) => ({ ...state, products }))
}));
