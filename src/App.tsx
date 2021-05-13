import React from 'react';
import './App.css';
import AppErrorMessage from './components/form/AppErrorMessage';
import LayoutWrapper from './components/layout/LayoutWrapper';
// import OrderTable from './components/UI/OrderTable';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import LocalShippingIcon from '@material-ui/icons/LocalShipping';
// import PeopleIcon from '@material-ui/icons/People';
// import CategoryIcon from '@material-ui/icons/Category';
// import ShopIcon from '@material-ui/icons/Shop';

function App() {
	return (
		<LayoutWrapper>
			<AppErrorMessage visible errorMessage="this is error message" />
		</LayoutWrapper>
	);
}

export default App;

{
	/* <OrderTable
				orders={[
					{
						_id: 'dkkdkd',
						isPaid: false,
						isDelivered: true,
						orderItems: [],
						paymentMethod: 'djdj',
						itemsPrice: 3848,
						shippingAddress: {},
						createdAt: new Date('10-02-2020').toISOString(),
						shippingPrice: 323,
						taxPrice: 0,
						totalPrice: 384884,
						updatedAt: 'djdjd',
						user: 'sjsjs'
					},
					{
						_id: 'dkkddkdkkffkd',
						isPaid: true,
						isDelivered: false,
						orderItems: [],
						paymentMethod: 'djdj',
						itemsPrice: 3848,
						shippingAddress: {},
						createdAt: new Date('04-10-2021').toISOString(),
						shippingPrice: 323,
						taxPrice: 0,
						totalPrice: 384884,
						updatedAt: 'djdjd',
						user: 'sjsjs'
					}
				]}
			/> */
}
