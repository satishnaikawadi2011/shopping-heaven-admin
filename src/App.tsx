import React from 'react';
import ErrorPage from './animations/components/ErrorPage';
// import * as Yup from 'yup';
// import AppLoader from './animations/components/AppLoader';

import './App.css';
// import AppForm from './components/form/AppForm';
// import AppFormField from './components/form/AppFormField';
// import SubmitButton from './components/form/SubmitButton';
import LayoutWrapper from './components/layout/LayoutWrapper';
import ProductHome from './pages/products';
// import OrderTable from './components/UI/OrderTable';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import LocalShippingIcon from '@material-ui/icons/LocalShipping';
// import PeopleIcon from '@material-ui/icons/People';
// import CategoryIcon from '@material-ui/icons/Category';
// import ShopIcon from '@material-ui/icons/Shop';

// const schema = Yup.object({
// 	name: Yup.string().required(),
// 	password: Yup.string().required()
// });

function App() {
	return (
		<LayoutWrapper>
			{/* <ErrorPage /> */}
			<ProductHome />
		</LayoutWrapper>
	);
}

export default App;

// <AppForm
// 	initialValues={{ name: 'Satish', password: '' }}
// 	validationSchema={schema}
// 	onSubmit={(values: any) => console.log(values)}
// >
// 	<AppFormField
// 		label="Name"
// 		style={{ width: '100vw' }}
// 		placeholder="your name"
// 		variant="outlined"
// 		fieldName="name"
// 		defaultValue="Satish"
// 	/>
// 	<AppFormField fieldName="password" />
// 	<SubmitButton variant="contained" style={{ backgroundColor: 'green', color: 'white' }} title="Submit" />
// </AppForm>

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
