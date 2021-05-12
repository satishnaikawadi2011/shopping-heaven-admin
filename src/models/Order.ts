import { Address } from './Address';

export interface Order {
	shippingAddress: Address;
	_id: string;
	orderItems: OrderItem[];
	isDelivered: boolean;
	isPaid: boolean;
	itemsPrice: number;
	paidAt?: string;
	deliveredAt?: string;
	paymentMethod: string;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
	user: string;
	createdAt: string;
	updatedAt: string;
	paymentResult?: PaymentResult;
}

export interface OrderItem {
	_id: string;
	price: number;
	productId: string;
	title: string;
	image: string;
	qty: number;
}

export interface PaymentResult {
	amount?: number;
	created?: number;
	currency?: string;
	id?: string;
	receipt_url?: string;
}
