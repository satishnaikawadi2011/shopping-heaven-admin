import create from 'zustand';
import { Order } from '../models/Order';

type OrderStore = {
	orders: Order[] | null;
	setOrders: (orders: Order[]) => void;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
	orders: null,
	setOrders: (orders) => set((state) => ({ ...state, orders }))
}));
