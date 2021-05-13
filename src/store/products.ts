import { Product } from './../models/Product';
import create from 'zustand';

type ProductStore = {
	products: Product[] | null;
	setProducts: (products: Product[]) => void;
	removeProduct: (productId: string) => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
	products: null,
	setProducts: (products) => set((state) => ({ ...state, products })),
	removeProduct:
		(productId) => {
			const updatedProducts = get().products!.filter((product) => product._id !== productId);
			set((state) => ({ ...state, products: updatedProducts }));
		}
}));
