import create from 'zustand';
import { Order } from '../models/Order';

type OrderStore = {
	orders: Order[] | null;
	setOrders: (orders: Order[]) => void;
	markOrderAsDelivered: (orderId: string) => void;
	markOrderAsPaid: (orderId: string) => void;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
	orders: null,
	setOrders: (orders) => set((state) => ({ ...state, orders })),
	markOrderAsDelivered: (orderId: string) => {
		const updatedOrders:any = get().orders?.map((order) => {
			if (order._id !== orderId) {
				return order;
			}
			return {
				...order,
				isDelivered:true
			}
		})
		set((state) => ({...state,orders:updatedOrders}))
	},
	markOrderAsPaid: (orderId: string) => {
		const updatedOrders:any = get().orders?.map((order) => {
			if (order._id !== orderId) {
				return order;
			}
			return {
				...order,
				isPaid:true
			}
		})
		set((state) => ({...state,orders:updatedOrders}))
	}
}));
